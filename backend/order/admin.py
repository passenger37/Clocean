from django.contrib import admin
from .models import Order, OrderItem


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display=('uuid',)

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display=('product','total')

# admin.site.register(Order)
# admin.site.register(OrderItem)