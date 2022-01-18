from django.urls import path
from order import views


app_name='order'

urlpatterns = [
    path("pay/", views.OrderView.as_view()),
    path("paycallback/", views.payment),
]