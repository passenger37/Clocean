from django.contrib.auth.models import User
from .serializers import RegisterSerializer ,ProfileSerializer
from django.contrib.auth import authenticate,login,logout
from django.core.exceptions import ValidationError
from .models import Profile
from .utils import generate_access_token

from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.reverse import reverse
from rest_framework import views 
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
# from rest_framework_simplejwt.settings import api_settings

# JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
# JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    authentication_classes = []
    serializer_class = RegisterSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    data={}
    username=request.data['username']
    password=request.data['password']
    user=authenticate(username=request.data['username'],password=request.data['password'])
    if user is not None:
        if user.is_active and user.is_authenticated:
            data['messages']='Welcom Hero'
            data['username']=user.username
            data['email']=user.email
            # data['token']=generate_access_token(user)
            login(request, user)
            return Response(data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

            
    
@api_view(["GET","POST"])
@permission_classes([AllowAny])
def logout_user(request):
    logout(request)
    return Response({'url':reverse('products:product',request=request)})



# TODO profile view

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes=[SessionAuthentication,JWTAuthentication]

    def get(self, request, pk):
        profile = Profile.objects.get(pk=pk)
        serializer = ProfileSerializer(profile, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)