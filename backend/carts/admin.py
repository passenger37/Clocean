from django.contrib import admin
from .models import CartItem , Cart

@admin.register(CartItem)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('product','quantity')

@admin.register(Cart)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('user','created_at')
