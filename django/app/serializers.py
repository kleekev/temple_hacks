from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(label="Enter id")
    username=serializers.CharField(label="Enter username")
    password=serializers.CharField(label="Enter password")
