# anime/admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import Anime, Character, Episode

@admin.register(Anime)
class AnimeAdmin(admin.ModelAdmin):
    list_display = ['title', 'genre', 'status', 'rating', 'poster_preview', 'is_featured', 'is_published', 'created_at']
    list_filter = ['genre', 'status', 'is_featured', 'is_published', 'release_year']
    search_fields = ['title', 'studio']
    readonly_fields = ['created_at', 'updated_at', 'poster_preview', 'banner_preview']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description')
        }),
        ('Poster Image', {
            'fields': ('poster_image', 'poster_url', 'poster_preview'),
            'description': 'Choose either upload a file OR enter a URL. Uploaded file takes priority.'
        }),
        ('Banner Image', {
            'fields': ('banner_image', 'banner_url', 'banner_preview'),
            'description': 'Choose either upload a file OR enter a URL. Uploaded file takes priority.'
        }),
        ('Other Media', {
            'fields': ('trailer_url','video_url')
        }),
        ('Details', {
            'fields': ('genre', 'status', 'total_episodes', 'current_episode', 'release_year', 'studio', 'rating')
        }),
        ('Timeline & Display', {
            'fields': ('timeline_position', 'is_featured', 'is_published')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at', 'created_by'),
            'classes': ('collapse',)
        })
    )
    
    def poster_preview(self, obj):
        url = obj.get_poster_url()
        if url:
            return format_html('<img src="{}" style="max-width: 100px; max-height: 150px;" />', url)
        return "No poster"
    poster_preview.short_description = "Poster Preview"
    
    def banner_preview(self, obj):
        url = obj.get_banner_url()
        if url:
            return format_html('<img src="{}" style="max-width: 200px; max-height: 100px;" />', url)
        return "No banner"
    banner_preview.short_description = "Banner Preview"
    
    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_by = request.user
        super().save_model(request, obj, form, change)
