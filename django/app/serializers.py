from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    username=serializers.CharField(label="Enter Username")
    password=serializers.CharField(label="Enter Password")