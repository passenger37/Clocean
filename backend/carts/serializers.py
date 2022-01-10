from .models import CartItem,Cart
from products.models import Product
from rest_framework import serializers

from products.serializers import ProductSerializer

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = CartItem
        fields = ['id', 'cart',"product", "quantity"]


class CartItemMiniSerializer(serializers.ModelSerializer):
    product = ProductSerializer(required=False)
    class Meta:
        model = CartItem
        fields = ["product", "quantity"]


class CartItemUpdateSerializer(serializers.ModelSerializer):
    # product=ProductSerializer(read_only=True)
    class Meta:
        model = CartItem
        fields = ["quantity"]