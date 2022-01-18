from rest_framework import serializers
from products.models import Product

class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=['id','title', 'description', 'price','image']