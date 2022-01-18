from rest_framework import serializers
from order.models import Order
from account.serializers import AddressSerializer
from products.serializers import ProductSerializer


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        # exclude = "modified"


class OrderMiniSerializer(serializers.ModelSerializer):
    address = AddressSerializer(required=False)

    class Meta:
        model = Order
        exclude = "modified"


# class OrderItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OrderItem
#         exclude = "modified"


# class OrderItemMiniSerializer(serializers.ModelSerializer):
#     order = OrderMiniSerializer(required=False, read_only=True)
#     product = ProductSerializer(required=False, read_only=True)

#     class Meta:
#         model = OrderItem
#         exclude = "modified"