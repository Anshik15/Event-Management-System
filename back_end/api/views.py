from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.db.models import Sum, Count
from .models import User, Membership, Item, Order, OrderItem, CartItem, UserRequest, Guest
from .serializers import (
    UserSerializer, MembershipSerializer, ItemSerializer,
    OrderSerializer, CartItemSerializer, OrderItemSerializer, UserRequestSerializer, GuestSerializer
)
from .permissions import IsAdmin, IsVendor, IsUser
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, timedelta


from rest_framework.decorators import api_view, permission_classes, authentication_classes

# Authentication Views
@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        login(request, user)
        serializer = UserSerializer(user)
        return Response({
            'message': 'Login successful',
            'user': serializer.data
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def signup_view(request):
    role = request.data.get('role', 'user')
    
    if role not in ['user', 'vendor']:
        return Response({'error': 'Invalid role. Only user and vendor can signup.'}, 
                        status=status.HTTP_400_BAD_REQUEST)
    
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Signup successful',
            'user': serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user_view(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


# User Management (Admin only)
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAdmin])
def manage_users(request):
    if request.method == 'GET':
        user_id = request.query_params.get('id')
        if user_id:
            try:
                user = User.objects.get(id=user_id)
                serializer = UserSerializer(user)
                return Response(serializer.data)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            users = User.objects.filter(role='user')
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PUT':
        user_id = request.data.get('id')
        try:
            user = User.objects.get(id=user_id)
            serializer = UserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'DELETE':
        user_id = request.data.get('id')
        try:
            user = User.objects.get(id=user_id)
            user.delete()
            return Response({'message': 'User deleted successfully'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


# Vendor Management (Admin only)
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAdmin])
def manage_vendors(request):
    if request.method == 'GET':
        vendor_id = request.query_params.get('id')
        if vendor_id:
            try:
                vendor = User.objects.get(id=vendor_id, role='vendor')
                serializer = UserSerializer(vendor)
                return Response(serializer.data)
            except User.DoesNotExist:
                return Response({'error': 'Vendor not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            vendors = User.objects.filter(role='vendor')
            serializer = UserSerializer(vendors, many=True)
            return Response(serializer.data)
    
    elif request.method == 'POST':
        data = request.data.copy()
        data['role'] = 'vendor'
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PUT':
        vendor_id = request.data.get('id')
        try:
            vendor = User.objects.get(id=vendor_id, role='vendor')
            serializer = UserSerializer(vendor, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'Vendor not found'}, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'DELETE':
        vendor_id = request.data.get('id')
        try:
            vendor = User.objects.get(id=vendor_id, role='vendor')
            vendor.delete()
            return Response({'message': 'Vendor deleted successfully'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Vendor not found'}, status=status.HTTP_404_NOT_FOUND)


# Membership Management
@api_view(['POST'])
@permission_classes([IsAdmin])
def add_membership(request):
    serializer = MembershipSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT'])
@permission_classes([IsAdmin])
def update_membership(request):
    if request.method == 'GET':
        membership_number = request.query_params.get('membership_number')
        if not membership_number:
            return Response({'error': 'Membership number required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            membership = Membership.objects.get(membership_number=membership_number)
            serializer = MembershipSerializer(membership)
            return Response(serializer.data)
        except Membership.DoesNotExist:
            return Response({'error': 'Membership not found'}, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'PUT':
        membership_number = request.data.get('membership_number')
        action_type = request.data.get('action')  # 'extend' or 'cancel'
        
        try:
            membership = Membership.objects.get(membership_number=membership_number)
            
            if action_type == 'cancel':
                membership.status = 'cancelled'
                membership.save()
                return Response({'message': 'Membership cancelled successfully'})
            
            elif action_type == 'extend':
                extension = request.data.get('extension', '6')  # Default 6 months
                months = int(extension)
                membership.end_date = membership.end_date + timedelta(days=months * 30)
                membership.status = 'active'
                membership.save()
                serializer = MembershipSerializer(membership)
                return Response(serializer.data)
            
            else:
                return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)
                
        except Membership.DoesNotExist:
            return Response({'error': 'Membership not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAdmin])
def list_memberships(request):
    memberships = Membership.objects.all()
    serializer = MembershipSerializer(memberships, many=True)
    return Response(serializer.data)


# Item Management (Vendor)
@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def manage_items(request):
    if request.method == 'GET':
        # Allow all authenticated users to view items
        items = Item.objects.filter(status='available')
        vendor_id = request.query_params.get('vendor_id')
        if vendor_id:
            items = items.filter(vendor_id=vendor_id)
        elif request.user.role == 'vendor':
            items = Item.objects.filter(vendor=request.user)
        
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        if request.user.role != 'vendor':
            return Response({'error': 'Only vendors can add items'}, status=status.HTTP_403_FORBIDDEN)
        
        data = request.data.copy()
        data['vendor'] = request.user.id
        serializer = ItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save(vendor=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        if request.user.role != 'vendor':
            return Response({'error': 'Only vendors can delete items'}, status=status.HTTP_403_FORBIDDEN)
        
        item_id = request.data.get('id')
        try:
            item = Item.objects.get(id=item_id, vendor=request.user)
            item.delete()
            return Response({'message': 'Item deleted successfully'}, status=status.HTTP_200_OK)
        except Item.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsVendor])
def product_status(request):
    items = Item.objects.filter(vendor=request.user)
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)


# Cart Management (User)
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsUser])
def manage_cart(request):
    if request.method == 'GET':
        cart_items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        item_id = request.data.get('item')
        quantity = request.data.get('quantity', 1)
        
        try:
            item = Item.objects.get(id=item_id, status='available')
            cart_item, created = CartItem.objects.get_or_create(
                user=request.user,
                item=item,
                defaults={'quantity': quantity}
            )
            if not created:
                cart_item.quantity += int(quantity)
                cart_item.save()
            
            serializer = CartItemSerializer(cart_item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Item.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'PUT':
        cart_item_id = request.data.get('id')
        quantity = request.data.get('quantity')
        
        try:
            cart_item = CartItem.objects.get(id=cart_item_id, user=request.user)
            cart_item.quantity = quantity
            cart_item.save()
            serializer = CartItemSerializer(cart_item)
            return Response(serializer.data)
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'DELETE':
        cart_item_id = request.data.get('id')
        try:
            cart_item = CartItem.objects.get(id=cart_item_id, user=request.user)
            cart_item.delete()
            return Response({'message': 'Item removed from cart'}, status=status.HTTP_200_OK)
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)


# Checkout (User)
@api_view(['POST'])
@permission_classes([IsUser])
def checkout(request):
    cart_items = CartItem.objects.filter(user=request.user).select_related('item')
    
    if not cart_items.exists():
        return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)
    
    total_amount = sum(item.item.price * item.quantity for item in cart_items)
    
    # Create order
    order = Order.objects.create(
        user=request.user,
        total_amount=total_amount,
        status='confirmed' # Flowchart suggests direct confirmation after payment
    )
    
    # Create order items
    order_items = [
        OrderItem(
            order=order,
            item=cart_item.item,
            quantity=cart_item.quantity,
            price=cart_item.item.price
        )
        for cart_item in cart_items
    ]
    OrderItem.objects.bulk_create(order_items)
    
    # Clear cart
    cart_items.delete()
    
    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


# Order Status (User)
@api_view(['GET'])
@permission_classes([IsUser])
def order_status(request):
    orders = Order.objects.filter(user=request.user).order_by('-order_date')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


# Reports (Admin)
@api_view(['GET'])
@permission_classes([IsAdmin])
def membership_report(request):
    memberships = Membership.objects.all()
    serializer = MembershipSerializer(memberships, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdmin])
def order_report(request):
    orders = Order.objects.all().order_by('-order_date')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdmin])
def vendor_report(request):
    vendors = User.objects.filter(role='vendor')
    serializer = UserSerializer(vendors, many=True)
    return Response(serializer.data)


# Transactions (Admin and Vendor)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def transactions(request):
    if request.user.role == 'admin':
        orders = Order.objects.all().order_by('-order_date')
    elif request.user.role == 'vendor':
        # Get orders containing vendor's items
        orders = Order.objects.filter(
            order_items__item__vendor=request.user
        ).distinct().order_by('-order_date')
    else:
        return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


# Vendor list for users
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def vendor_list(request):
    vendors = User.objects.filter(role='vendor')
    serializer = UserSerializer(vendors, many=True)
    return Response(serializer.data)


# User Requests (User creates, Vendor manages)
@api_view(['GET', 'POST', 'PUT'])
@permission_classes([IsAuthenticated])
def user_requests(request):
    if request.method == 'GET':
        if request.user.role == 'vendor':
            requests = UserRequest.objects.filter(vendor=request.user).order_by('-created_at')
        elif request.user.role == 'user':
            requests = UserRequest.objects.filter(user=request.user).order_by('-created_at')
        else:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = UserRequestSerializer(requests, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        if request.user.role != 'user':
            return Response({'error': 'Only users can create requests'}, status=status.HTTP_403_FORBIDDEN)
            
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = UserRequestSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        if request.user.role != 'vendor':
            return Response({'error': 'Only vendors can update request status'}, status=status.HTTP_403_FORBIDDEN)
            
        request_id = request.data.get('id')
        status_val = request.data.get('status')
        
        try:
            user_request = UserRequest.objects.get(id=request_id, vendor=request.user)
            user_request.status = status_val
            user_request.save()
            serializer = UserRequestSerializer(user_request)
            return Response(serializer.data)
        except UserRequest.DoesNotExist:
            return Response({'error': 'Request not found'}, status=status.HTTP_404_NOT_FOUND)


# Guest List (User manages)
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def guest_list(request):
    if request.user.role != 'user':
        return Response({'error': 'Only users can manage guest lists'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'GET':
        guests = Guest.objects.filter(user=request.user).order_by('-created_at')
        serializer = GuestSerializer(guests, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = GuestSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        guest_id = request.data.get('id')
        try:
            guest = Guest.objects.get(id=guest_id, user=request.user)
            serializer = GuestSerializer(guest, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Guest.DoesNotExist:
            return Response({'error': 'Guest not found'}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'DELETE':
        guest_id = request.data.get('id')
        try:
            guest = Guest.objects.get(id=guest_id, user=request.user)
            guest.delete()
            return Response({'message': 'Guest removed'}, status=status.HTTP_200_OK)
        except Guest.DoesNotExist:
            return Response({'error': 'Guest not found'}, status=status.HTTP_404_NOT_FOUND)
