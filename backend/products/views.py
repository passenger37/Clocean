from rest_framework.authentication import SessionAuthentication
from .serializers import ProductSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication

from .models import Product


class ProductView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permissions_classes = [AllowAny,]
    authentication_classes = [SessionAuthentication]

# Details View of Product
class ProductDetailsView(generics.RetrieveAPIView):
    pass

# TODO poster
class PostersView(generics.ListAPIView):
    pass

# TODO Trending
class PostersView(generics.ListAPIView):
    pass


# TODO Other Category like Categories Mens
class PostersView(generics.ListAPIView):
    pass


# TODO Category Like Women
class PostersView(generics.ListAPIView):
    pass


# TODO Category Like Traditonal
class PostersView(generics.ListAPIView):
    pass


# TODO Category Like Featured
class PostersView(generics.ListAPIView):
    pass