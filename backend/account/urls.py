from django.urls import path
from rest_framework.authtoken import views
from  .views import (RegisterView,
                    login_user,
                    logout_user,
                    ProfileView)

app_name='account'

urlpatterns = [

    path('register/',RegisterView.as_view(),name='register'),
    path('login/',login_user,name='login'),
    path('logout/',logout_user,name='logout'),
    path("profile/<int:pk>/",ProfileView.as_view()),
    # path('token/', views.obtain_auth_token),
]
