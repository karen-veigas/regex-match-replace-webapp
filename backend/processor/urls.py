from django.urls import path
from . import views

urlpatterns = [
    path('upload-file/', views.UploadFileView.as_view(), name='upload-file'),
    path('replace-data/', views.ReplaceFileView.as_view(), name='replace-data'),
]