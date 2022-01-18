from django.contrib import admin
from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display=('uuid',)

# @admin.register(OrderItem)
# class OrderItemAdmin(admin.ModelAdmin):
#     list_display=('uuid','cart')

# admin.site.register(Order)
# admin.site.register(OrderItem)