from django.shortcuts import render

import pandas as pd
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from processor.models import User

from processor.serializers import FileUploadSerializer

class UploadFileView(APIView):
    serializer_class = FileUploadSerializer
    
    def post(self, request):
        # Assume authenticated user
        request.user = User.objects.first()
        serializer = self.serializer_class(request.user, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        

