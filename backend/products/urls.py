from django.urls import path
from  .views import (ProductView,
                    ProductDetailsView)

app_name='products'

urlpatterns = [
    path('products/',ProductView.as_view(),name='product'),
    path('products/<int:pk>/',ProductDetailsView.as_view(),name='product_detail'),
]