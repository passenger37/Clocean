from django.urls import path
from  .views import (RegisterView,
                    LoginUser,
                    logout_user)

app_name='account'

urlpatterns = [

    path('register/',RegisterView.as_view(),name='register'),
    path('login/',LoginUser.as_view(),name='login'),
    path('logout/',logout_user,name='logout')
]
