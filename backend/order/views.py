from django.shortcuts import render
import requests
# Create your views here.
from time import time
from datetime import timedelta
from django.conf import settings
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication

from django.shortcuts import get_object_or_404
from rest_framework.response import Response
# from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework import permissions, status, exceptions
from rest_framework.decorators import api_view
from .serializers import (
#     OrderItemSerializer,
#     OrderItemMiniSerializer,
    OrderSerializer
#     OrderMiniSerializer,
)
from .models import Order
from account.models import Address
from .models import Cart
from .checksum import generate_checksum,verify_checksum



def time_calculator(func):
    def wrapper(*args, **kwargs):
        time1 = time()
        func(*args, **kwargs)
        time2 = time()
        print("Run Time : ", timedelta(time2 - time1).total_seconds())

    return wrapper



class OrderView(APIView):
    permission_classes = [IsAuthenticated,]
    authentication_classes = [SessionAuthentication,JWTAuthentication]

    @time_calculator
    def time(self):
        return 0

    def post(self, request, *args, **kwargs):
        user = request.user
        user_address = Address.objects.filter(user=user, primary=True).first()
        cart = get_object_or_404(Cart, user=user)
        if cart.total == 0:
            raise exceptions.NotAcceptable("No ammount")
        # try:
        #     order_number = request.data.get("order_number", "")
        #     quantity = request.data.get("quantity", 1)
        # except:
        #     pass
        # pass
        # order = Order().create_order(user, order_number, user_address, True)
        order = Order.objects.create(cart=cart,address=user_address)
        order.save()
        # serializer=OrderSerializer(order)
        merchant_key = settings.PAYTM_MERCHANT_KEY
        paytm_params = {
            # ('MID', settings.PAYTM_MERCHANT_ID),
            # ('ORDER_ID', str(order.uuid)),
            # ('CUST_ID', str()),
            # ('TXN_AMOUNT', str(cart.total)),
            # ('CHANNEL_ID', settings.PAYTM_CHANNEL_ID),
            # ('WEBSITE', settings.PAYTM_WEBSITE),
            # ('EMAIL', request.user.email),
            # ('MOBILE_N0', '9911223388'),
            # ('INDUSTRY_TYPE_ID', settings.PAYTM_INDUSTRY_TYPE_ID),
            # ('CALLBACK_URL', 'http://127.0.0.1:8000/order/payment'),
            # ('PAYMENT_MODE_ONLY', 'NO'),
                    'MID': settings.PAYTM_MERCHANT_ID,
                    'ORDER_ID': str(order.uuid),
                    'CUST_ID':str(user.username),
                    'TXN_AMOUNT': str(cart.total),
                    'INDUSTRY_TYPE_ID': 'Retail',
                    'WEBSITE': 'WEBSTAGING',
                    'CHANNEL_ID': 'WEB',
                    'CALLBACK_URL': 'http://127.0.0.1:8000/api/order/paycallback/',
        }
        # paytm_params = dict(params)
        paytm_params['CHECKSUMHASH']= generate_checksum(paytm_params, merchant_key)
        # paytm_params['payment_url']= settings.PAYTM_PAYMENT_GATEWAY_URL
        # paytm_params['comany_name']= settings.PAYTM_COMPANY_NAME
        context = {
        'payment_url': settings.PAYTM_PAYMENT_GATEWAY_URL,
        'comany_name': settings.PAYTM_COMPANY_NAME,
        'data_dict': paytm_params
    }
        # response = requests.post(settings.PAYTM_PAYMENT_GATEWAY_URL, data = paytm_params, headers = {"Content-type": "application/json"}).json()
        print('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.')
        # print(response)
        # return Response({'paytm_params':paytm_params})
        return render(request, 'paymentstatus.html', context)
        # order_item = OrderItem().create_order_item(order, product, quantity, total)
        # serializer = OrderItemMiniSerializer(order_item)
        # self.time()
        # TODO Payment Integration here.
        # TODO send Email to seller and buyer
        # return Response(serializer.data, status=status.HTTP_201_CREATED)

def VerifyPaytmResponse(response):
    response_dict = {}
    if response.method == "POST":
        data_dict = {}
        for key in response.POST:
            data_dict[key] = response.POST[key]
        MID = data_dict['MID']
        ORDERID = data_dict['ORDERID']
        verify = verify_checksum(data_dict, settings.PAYTM_MERCHANT_KEY, data_dict['CHECKSUMHASH'])
        if verify:
            STATUS_URL = settings.PAYTM_TRANSACTION_STATUS_URL
            headers = {
                'Content-Type': 'application/json',
            }
            data = '{"MID":"%s","ORDERID":"%s"}'%(MID, ORDERID)
            check_resp = requests.post(STATUS_URL, data=data, headers=headers).json()
            if check_resp['STATUS']=='TXN_SUCCESS':
                response_dict['verified'] = True
                response_dict['paytm'] = check_resp
                return (response_dict)
            else:
                response_dict['verified'] = False
                response_dict['paytm'] = check_resp
                return (response_dict)
        else:
            response_dict['verified'] = False
            return (response_dict)
    response_dict['verified'] = False
    return response_dict

@api_view(['POST'])
def payment(request):
    resp = VerifyPaytmResponse(request)
    if resp['verified']:
        # save success details to db; details in resp['paytm']
        return HttpResponse("<center><h1>Transaction Successful</h1><center>", status=200)
    else:
        # check what happened; details in resp['paytm']
        return HttpResponse("<center><h1>Transaction Failed</h1><center>", status=400)
    # received_data = dict(request.POST)
    # paytm_params = {}
    # paytm_checksum = received_data['CHECKSUMHASH'][0]
    # for key, value in received_data.items():
    #     if key == 'CHECKSUMHASH':
    #         paytm_checksum = value[0]
    #     else:
    #         paytm_params[key] = str(value[0])
    # # Verify checksum
    # is_valid_checksum = verify_checksum(paytm_params, settings.PAYTM_SECRET_KEY, str(paytm_checksum))
    # if is_valid_checksum:
    #     received_data['message'] = "Checksum Matched"
    # else:
    #     received_data['message'] = "Checksum Mismatched"
    #     return render(request, 'payments/paymentstatus.html', context=received_data)
    # return render(request, 'payment/paymentstatus.html', context=received_data)

    # permission_classes = [IsAuthenticated,]
    # authentication_classes = [SessionAuthentication,JWTAuthentication]

    # def post(self, request):
    #     received_data = dict(request.POST)
    #     paytm_params = {}
    #     paytm_checksum = received_data['CHECKSUMHASH'][0]
    #     for key, value in received_data.items():
    #         if key == 'CHECKSUMHASH':
    #             paytm_checksum = value[0]
    #         else:
    #             paytm_params[key] = str(value[0])
    #     # Verify checksum
    #     is_valid_checksum = verify_checksum(paytm_params, settings.PAYTM_SECRET_KEY, str(paytm_checksum))
    #     if is_valid_checksum:
    #         received_data['message'] = "Checksum Matched"
    #     else:
    #         received_data['message'] = "Checksum Mismatched"
    #         return render(request, 'payments/paymentstatus.html', context=received_data)
    #     return render(request, 'payments/paymentstatus.html', context=received_data)
