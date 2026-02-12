from rest_framework import serializers
from .models import User, Membership, Item, Order, OrderItem, CartItem, UserRequest, Guest
from datetime import timedelta


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role', 'contact_info', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class MembershipSerializer(serializers.ModelSerializer):
    vendor_name = serializers.CharField(source='vendor.username', read_only=True)
    duration = serializers.ChoiceField(
        choices=[('6', '6 months'), ('12', '1 year'), ('24', '2 years')],
        write_only=True,
        required=False
    )

    class Meta:
        model = Membership
        fields = ['id', 'vendor', 'vendor_name', 'membership_number', 'start_date', 
                  'end_date', 'status', 'duration', 'created_at']
        read_only_fields = ['end_date', 'created_at']

    def create(self, validated_data):
        duration = validated_data.pop('duration', '6')
        months = int(duration)
        start_date = validated_data['start_date']
        validated_data['end_date'] = start_date + timedelta(days=months * 30)
        return super().create(validated_data)


class ItemSerializer(serializers.ModelSerializer):
    vendor_name = serializers.CharField(source='vendor.username', read_only=True)

    class Meta:
        model = Item
        fields = ['id', 'vendor', 'vendor_name', 'name', 'description', 'price', 'status', 'image', 'created_at']
        read_only_fields = ['vendor', 'created_at']


class OrderItemSerializer(serializers.ModelSerializer):
    item_name = serializers.CharField(source='item.name', read_only=True)
    item_image = serializers.ImageField(source='item.image', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'item', 'item_name', 'item_image', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'user_name', 'total_amount', 'status', 'order_date', 'order_items']
        read_only_fields = ['user', 'order_date']


class CartItemSerializer(serializers.ModelSerializer):
    item_name = serializers.CharField(source='item.name', read_only=True)
    item_price = serializers.DecimalField(source='item.price', max_digits=10, decimal_places=2, read_only=True)
    item_image = serializers.ImageField(source='item.image', read_only=True)
    vendor_name = serializers.CharField(source='item.vendor.username', read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'user', 'item', 'item_name', 'item_price', 'item_image', 'vendor_name', 'quantity', 'added_at']
        read_only_fields = ['user', 'added_at']


class UserRequestSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    vendor_name = serializers.CharField(source='vendor.username', read_only=True)

    class Meta:
        model = UserRequest
        fields = ['id', 'user', 'user_name', 'vendor', 'vendor_name', 'item_name', 'details', 'status', 'created_at']
        read_only_fields = ['user', 'created_at']


class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = ['id', 'user', 'name', 'email', 'status', 'created_at']
        read_only_fields = ['user', 'created_at']
