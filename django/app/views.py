from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from . serializers import *
from django.http import JsonResponse

def checkUsername(request):
    username = request.GET.get('username')
    user_exists = User.ojbects.filter(username=username).exists()
    return JsonResponse({user_exists: user_exists})

# Create your views here.
class RegisterApiView(APIView):
    serializer_class=UserSerializer
    def get(self, request):
        allUsers=User.objects.all().values()
        return Response({"User":allUsers})
    
    def post(self, request):
        print("Request data is :", request.data)
        serializer_object = UserSerializer(data= request.data)
        if(serializer_object.is_valid()):
            User.objects.create(id=serializer_object.data.get('id'),
                                username=serializer_object.data.get('username'),
                                password=serializer_object.data.get('password'))
        user=User.objects.all().filter(id=request.data["id"]).values()
        return Response({"User":user})
    
