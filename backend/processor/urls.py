from django.urls import path
from . import views

urlpatterns = [
    path('upload-file/', views.UploadFileView.as_view(), name='upload-file'),
]