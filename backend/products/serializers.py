from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=['title', 'description', 'price','image']

    # def create(self, validated_data):
    #     product= Product.objects.create(
    #         title=validated_data['title'],
    #         discription=validated_data['discription'],
    #         price=validated_data['price'],
    #     )

    #     return product.save()