# users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('profile_picture', 'anime_preferences')}),
    )
    list_display = (
        'username', 
        'email', 
        'first_name', 
        'is_staff', 
        'is_active', 
        'created_at'
    )
    list_filter = UserAdmin.list_filter + ('created_at',)

admin.site.register(CustomUser, CustomUserAdmin)