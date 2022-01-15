from rest_framework.authentication import SessionAuthentication
from .serializers import ProductSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from .models import Product


class ProductView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permissions_classes = [AllowAny,]
    # authentication_classes = [SessionAuthentication]

# Details View of Product
class ProductDetailsView(APIView):
    permissions_classes = [AllowAny,]
    # authentication_classes = [SessionAuthentication]

    def get(self, request, pk):
        product= Product.objects.get(pk=pk)
        serializer = ProductSerializer(product, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

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