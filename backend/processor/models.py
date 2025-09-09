from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    file = models.FileField(upload_to='files/', null= True, blank = True)
    uploaded_at = models.DateTimeField(null= True, blank = True)
    