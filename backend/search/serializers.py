from rest_framework import serializers
from products.models import Product

class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=['title', 'description', 'price','image']