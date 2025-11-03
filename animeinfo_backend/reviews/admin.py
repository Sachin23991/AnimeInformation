# reviews/admin.py
from django.contrib import admin
from .models import AnimeReview

@admin.register(AnimeReview)
class AnimeReviewAdmin(admin.ModelAdmin):
    list_display = (
        'anime', 
        'user', 
        'rating', 
        'created_at'
    )
    list_filter = (
        'rating', 
        'anime', 
        'user'
    )
    search_fields = (
        'anime__title', 
        'user__username', 
        'review_text'
    )
    readonly_fields = (
        'created_at', 
        'updated_at'
    )