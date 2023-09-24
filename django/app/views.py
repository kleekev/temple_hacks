from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *

# Create your views here.
class UserApiView(APIView):
    serializer_class=UserSerializer
    def get(self,request):
        allUsers=User.objects.all().values()
        return Response({"All Users":allUsers})

    def post(self,request):
        print('Request data is : ',request.data)
        serializer_obj=UserSerializer(data=request.data)
        if(serializer_obj.is_valid()):

            User.objects.create(title=serializer_obj.data.get("title"),
                                author=serializer_obj.data.get("author")
                                )

        book=User.objects.all().filter(username=request.data["username"]).values()
        return Response({"Book":book})