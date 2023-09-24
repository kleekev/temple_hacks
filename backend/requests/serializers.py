from rest_framework import serializers
from .models import Requests

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requests
        fields = ('id', 'username', 'start_address', 'end_address', 'accepted')


class CreateRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requests
        fields = ('username', 'start_address', 'end_address', 'accepted')