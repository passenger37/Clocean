from django.shortcuts import get_object_or_404
from django.db.models import F
from rest_framework.generics import (
    ListCreateAPIView,
    ListAPIView,
    RetrieveUpdateDestroyAPIView,
)
from .serializers import CartItemSerializer, CartItemUpdateSerializer
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import NotAcceptable, ValidationError, PermissionDenied
from django.utils.translation import ugettext_lazy as _
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Cart, CartItem
from products.models import Product


class CartItemAPIView(ListCreateAPIView):
    serializer_class = CartItemSerializer
    authentication_classes=[JWTAuthentication,SessionAuthentication]
    permissions_classes = [IsAuthenticated,]

    def get_queryset(self):
        user = self.request.user
        queryset = CartItem.objects.filter(cart__user=user)
        return queryset

    def create(self, request, *args, **kwargs):
        user = request.user
        cart = get_object_or_404(Cart, user=user)
        product = get_object_or_404(Product, pk=request.data["product"])
        quantity = int(request.data["quantity"])
        if CartItem.objects.filter(product__title=product):
            cart_obj=CartItem.objects.filter(product__title=product).update(quantity=F('quantity')+1)
            # TODO: return data when added quantity in exixting cartitem
            data={
                "msg":"Iterm Added Again",
            }
            return Response(data, status=status.HTTP_201_CREATED)
        else:

            cart_item = CartItem(cart=cart, product=product, quantity=quantity)
            cart_item.save()
            print("NEW ITEM ADDED IN CART")
            serializer = CartItemSerializer(cart_item)
            cart.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)


class CartItemView(RetrieveUpdateDestroyAPIView):
    serializer_class = CartItemUpdateSerializer
    authentication_classes=[JWTAuthentication,SessionAuthentication]
    permissions_classes = [IsAuthenticated,]
    queryset = CartItem.objects.all()

    def retrieve(self, request, *args, **kwargs):
        cart_item = self.get_object()
        if cart_item.cart.user != request.user:
            raise PermissionDenied("Sorry this cart not belong to you")
        serializer = self.get_serializer(cart_item)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        cart_item = self.get_object()
        print('CART UPDATE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        print(self.get_object())
        # print(request.data)
        serializer = CartItemUpdateSerializer(cart_item, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        cart_item = self.get_object()
        if cart_item.cart.user != request.user:
            raise PermissionDenied("Sorry this cart not belong to you")
        cart_item.delete()

        return Response(
            {"detail": _("your item has been deleted.")},
            status=status.HTTP_204_NO_CONTENT,
        )

