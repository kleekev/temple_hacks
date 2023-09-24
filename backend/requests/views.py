from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RequestSerializer, CreateRequestSerializer
from .models import Requests
from rest_framework.views import APIView
from rest_framework.response import Response
import json
# Create your views here.

class RequestView(generics.CreateAPIView):
    queryset = Requests.objects.all()
    serializer_class = RequestSerializer

class deleteAll(APIView):
    def delete(self, request, format=None):
        # Delete all records from the Requests model
        Requests.objects.all().delete()
        return Response({'success': 'Deleted All Data'}, status=status.HTTP_204_NO_CONTENT)

class GetAll(APIView):
    serializer_class = RequestSerializer

    def get(self, request, format=None):
        queryset = Requests.objects.all()
        req_list = [{'username': req.username, 'start_address': req.start_address, 'end_address': req.end_address, 'accepted': req.accepted} for req in queryset]
        data = json.dumps(req_list)
        return Response({'req_list': data}, status=status.HTTP_200_OK)


class GetRequest(APIView):
    serializer_class = RequestSerializer
    lookup_url_kwarg = 'username'

    def get(self, request, format=None):
        username = request.GET.get(self.lookup_url_kwarg)
        print(username)
        if username != None:
            r = Requests.objects.filter(username = username)
            if len(r) > 0:
                data = RequestSerializer(r[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid username'}, status=status.HTTP_502_BAD_GATEWAY)
        return Response({'error': 'username not found in request'}, status=status.HTTP_502_BAD_GATEWAY)

class CreateRequestView(APIView):
    serializer_class = CreateRequestSerializer
    r = None;
    def post(self, request, format=None):
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get('username')
            start_address = serializer.data.get('start_address')
            end_address = serializer.data.get('end_address')
            accepted = serializer.data.get('accepted')

            r = Requests(username = username, start_address=start_address, end_address=end_address, accepted=accepted)
            r.save()
        else:
            Response({'error': 'Not valid'}, status=status.HTTP_502_BAD_GATEWAY)
        return Response(RequestSerializer(r).data, status=status.HTTP_200_OK)