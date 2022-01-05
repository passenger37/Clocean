from django.urls import path
from . import views


app_name='carts'

urlpatterns = [
    path("cart/", views.CartItemAPIView.as_view()),
    path("cartitem/<int:pk>/", views.CartItemView.as_view()),
]