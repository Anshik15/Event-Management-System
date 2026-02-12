from django.contrib import admin
from .models import User, Membership, Item, Order, CartItem

admin.site.register(User)
admin.site.register(Membership)
admin.site.register(Item)
admin.site.register(Order)
admin.site.register(CartItem)
