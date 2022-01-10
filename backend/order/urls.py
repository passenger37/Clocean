from django.urls import path
from order import views


app_name='order'

urlpatterns = [
    path("order/<int:pk>/", views.OrderView.as_view()),
    path("payment/", views.Payment),
]