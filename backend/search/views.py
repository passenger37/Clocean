# from django.shortcuts import render
# from rest_framework import viewsets
from rest_framework import generics
from products.models import Product
from .serializers import SearchSerializer
from rest_framework import filters
from products.models import Product
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication

class SearchListView(generics.ListAPIView):
    '''search bar'''
    queryset = Product.objects.all()
    serializer_class = SearchSerializer
    permissions_classes = [AllowAny,]
    authentication_classes = [SessionAuthentication]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']