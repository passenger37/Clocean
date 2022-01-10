from django.shortcuts import render

# Create your views here.
from time import time
from datetime import timedelta

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework import permissions, status, exceptions
from .serializers import (
    OrderItemSerializer,
    OrderItemMiniSerializer,
    OrderSerializer,
    OrderMiniSerializer,
)
from .models import Order, OrderItem
from account.models import Address
from .models import Product



def time_calculator(func):
    def wrapper(*args, **kwargs):
        time1 = time()
        func(*args, **kwargs)
        time2 = time()
        print("Run Time : ", timedelta(time2 - time1).total_seconds())

    return wrapper



class OrderView(APIView):
    permission_classes = [IsAuthenticated,]
    authentication_classes = [SessionAuthentication]

    @time_calculator
    def time(self):
        return 0

    def post(self, request, pk, *args, **kwargs):
        user = request.user
        user_address = Address.objects.filter(user=user, primary=True).first()
        product = get_object_or_404(Product, pk=pk)
        if product.quantity == 0:
            raise exceptions.NotAcceptable("quantity of this product is out.")
        try:
            order_number = request.data.get("order_number", "")
            quantity = request.data.get("quantity", 1)
        except:
            pass

        total = quantity * product.price
        order = Order().create_order(user, order_number, user_address, True)
        order_item = OrderItem().create_order_item(order, product, quantity, total)
        serializer = OrderItemMiniSerializer(order_item)
        self.time()
        # TODO Payment Integration here.
        # TODO send Email to seller and buyer
        return Response(serializer.data, status=status.HTTP_201_CREATED)



def Payment(request):
    pass