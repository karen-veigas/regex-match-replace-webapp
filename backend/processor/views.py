import re
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

class ProcessFileView(APIView):

    def get(self, request):
        user = User.objects.first()
        if not user or not user.file:
            return Response({"error": "No file found for the first user"}, status=404)

        file_path = user.file.path
        df = pd.read_csv(file_path)
        print(df.head())
        
        col = request.data.get("column").capitalize()
        print(col)
        
        if not col:
            return Response({"message": "Error: Field column not provided.",}, status= status.HTTP_400_BAD_REQUEST)
        if col not in df.columns:
            return Response({"message": "Error: Column not found.",}, status= status.HTTP_400_BAD_REQUEST)
       
        replace_str = request.data.get("replace_str")
        print(replace_str)
        if replace_str is None or replace_str is "":
            return Response({"message": "Error: Field replace_str not provided.",}, status= status.HTTP_400_BAD_REQUEST)
            
        regex = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}\b"
        
        df[col] = df[col].apply( lambda x: re.sub(regex, str(replace_str), x))
            
        return Response({
            "message": "Success",
            "data": df
        }, status= status.HTTP_200_OK)
        

