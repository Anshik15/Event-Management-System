from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import timedelta


class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('vendor', 'Vendor'),
        ('user', 'User'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    contact_info = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.role})"


class Membership(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('expired', 'Expired'),
        ('cancelled', 'Cancelled'),
    ]
    vendor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='memberships')
    membership_number = models.CharField(max_length=50, unique=True)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Membership {self.membership_number} - {self.vendor.username}"


class Item(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('out_of_stock', 'Out of Stock'),
        ('discontinued', 'Discontinued'),
    ]
    vendor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='item_images/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} by {self.vendor.username}"


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.item.name} x {self.quantity}"


class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart_items')
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'item')

    def __str__(self):
        return f"{self.user.username} - {self.item.name} x {self.quantity}"


class UserRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_requests')
    vendor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_requests')
    item_name = models.CharField(max_length=200)
    details = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Request from {self.user.username} to {self.vendor.username} for {self.item_name}"


class Guest(models.Model):
    STATUS_CHOICES = [
        ('invited', 'Invited'),
        ('confirmed', 'Confirmed'),
        ('declined', 'Declined'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='guests')
    name = models.CharField(max_length=200)
    email = models.EmailField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='invited')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.status}) - Invited by {self.user.username}"
