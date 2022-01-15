from django.shortcuts import get_object_or_404
from account.models import Address
from account.serializers import AddressSerializer
from products.models import Product
from products.serializers import ProductSerializer
from carts.models import Cart,CartItem
from carts.serializers import CartItemMiniSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status

class CheckoutView(APIView):
    permission_classes = [IsAuthenticated,]
    authentication_classes = [SessionAuthentication,JWTAuthentication]
    def get(self, request, *args, **kwargs):
        user = request.user
        cart_items=CartItem.objects.filter(cart__user=user)
        cartItem=[]
        for item in cart_items:
            cartItem.append(CartItemMiniSerializer(item).data)
        user_address = Address.objects.filter(user=user)
        address=[]
        for x in user_address:
            address.append(AddressSerializer(x).data)
        cart= get_object_or_404(Cart, user=user)
        data = {}
        data["total"] = cart.total
        data["address"] = address
        data["cartitem"] = cartItem
        return Response(data, status=status.HTTP_200_OK)

# class CheckoutCartView(APIView):
#     permission_classes = [IsAuthenticated,]
#     authentication_classes = [SessionAuthentication,JWTAuthentication]

#     def get(self, request, pk, *args, **kwargs):
#         user = request.user
#         address_id = request.data.get("address")
#         ecommerce_feez = 150
#         data = {}
#         total = 0
#         quantity = 0
#         user_address = Address.objects.filter(id=address_id, user=user)[0]
#         cart = get_object_or_404(Cart, user=user)
#         cart_items = CartItem.objects.filter(cart=cart)
#         for item in cart_items:
#             total += item.product.price
#             quantity += item.quantity
#         end_total = ecommerce_feez + (total * quantity)

#         data["address"] = AddressSerializer(user_address).data
#         data["items"] = CartItemMiniSerializer(cart_items, many=True).data
#         data["total"] = end_total
#         data["feez"] = ecommerce_feez
#         return Response(data, status=status.HTTP_200_OK)

