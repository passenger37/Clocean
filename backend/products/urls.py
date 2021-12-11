from django.urls import path
from  .views import (ProductView)

app_name='products'

urlpatterns = [
    path('products/',ProductView.as_view({'get':'list'}),name='product'),
]