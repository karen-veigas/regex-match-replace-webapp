import re
from django.db import Error
from django.shortcuts import render

import pandas as pd
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from processor.utils import nl_str_to_regex
from processor.models import User

from processor.serializers import FileUploadSerializer

class UploadFileView(APIView):
    serializer_class = FileUploadSerializer
    
    def post(self, request):
        request.user = User.objects.first()
        serializer = self.serializer_class(request.user, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReplaceFileView(APIView):

    def post(self, request):
        user = User.objects.first()
        if not user or not user.file:
            return Response({"error": "No file found for the first user"}, status=404)

        file_path = user.file.path
        if file_path.endswith(".csv"):
            df = pd.read_csv(file_path)
        elif file_path.endswith(".xlsx"):
            df = pd.read_excel(file_path, header=1)
        else:
            return Response({"message": "Incorrect File format"}, status= status.HTTP_400_BAD_REQUEST)
        
        
            
        nl_prompt = request.data.get("prompt")
        if not nl_prompt:
            return Response({"message": "Error: Field prompt not provided."}, status= status.HTTP_400_BAD_REQUEST)
        
        try:
            res = nl_str_to_regex(nl_prompt)
        
            col = res['column'].capitalize()
            
            if col not in df.columns:
                return Response({"message": f"Error: Column '{col}' not found."}, status=status.HTTP_400_BAD_REQUEST)

            regex = res['regex'].strip('`').strip('"').strip("'").strip()
            
            if not regex:
                return Response({"message": "Error: Regex pattern not generated."}, status=status.HTTP_400_BAD_REQUEST)
            
            replacement_str = res['replacement_str']
            
            df[col] = df[col].apply( lambda x: re.sub(regex, str(replacement_str), x))
                
            return Response({
                "message": "Success",
                "data": df
            }, status= status.HTTP_200_OK)
            
            
        except Exception as e:
            return Response({"message": "Error formulating response. Please try again later."}, status= status.HTTP_500_INTERNAL_SERVER_ERROR)
            
      