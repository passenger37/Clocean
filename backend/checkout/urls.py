from django.urls import path
from .views import (CheckoutView,
                    CheckoutCartView)


app_name='checkout'

urlpatterns = [
    path("checkout/<int:pk>/", CheckoutView.as_view()),
    path("cart/checkout/<int:pk>/",CheckoutCartView.as_view()),
]