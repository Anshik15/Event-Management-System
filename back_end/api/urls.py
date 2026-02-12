from django.urls import path
from . import views

urlpatterns = [
    # Authentication
    path('auth/login/', views.login_view, name='login'),
    path('auth/signup/', views.signup_view, name='signup'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('auth/user/', views.current_user_view, name='current_user'),
    
    # Admin - User Management
    path('admin/users/', views.manage_users, name='manage_users'),
    
    # Admin - Vendor Management
    path('admin/vendors/', views.manage_vendors, name='manage_vendors'),
    
    # Admin - Membership Management
    path('admin/membership/add/', views.add_membership, name='add_membership'),
    path('admin/membership/update/', views.update_membership, name='update_membership'),
    path('admin/membership/list/', views.list_memberships, name='list_memberships'),
    
    # Admin - Reports
    path('admin/reports/membership/', views.membership_report, name='membership_report'),
    path('admin/reports/order/', views.order_report, name='order_report'),
    path('admin/reports/vendor/', views.vendor_report, name='vendor_report'),
    
    # Vendor - Item Management
    path('vendor/items/', views.manage_items, name='manage_items'),
    path('vendor/product-status/', views.product_status, name='product_status'),
    
    # User - Shopping
    path('user/vendors/', views.vendor_list, name='vendor_list'),
    path('user/items/', views.manage_items, name='browse_items'),
    path('user/cart/', views.manage_cart, name='manage_cart'),
    path('user/checkout/', views.checkout, name='checkout'),
    path('user/orders/', views.order_status, name='order_status'),
    
    # Transactions (Admin & Vendor)
    path('transactions/', views.transactions, name='transactions'),
    
    # User Requests (User to Vendor)
    path('user-requests/', views.user_requests, name='user_requests'),
    
    # Guest List (User)
    path('user/guests/', views.guest_list, name='guest_list'),
]
