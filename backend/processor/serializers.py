from rest_framework import serializers
from .models import User

class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['file']
        