# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # REMOVED: full_name field to avoid redundancy with first_name/last_name.
    
    anime_preferences = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'.strip()
        
    def __str__(self):
        return self.username