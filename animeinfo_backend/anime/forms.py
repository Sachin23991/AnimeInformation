# anime/forms.py
from django import forms
from .models import Anime, Character, Episode

class AnimeForm(forms.ModelForm):
    class Meta:
        model = Anime
        fields = [
            'title', 'description', 
            'poster_image', 'poster_url', 'banner_image', 'banner_url', 'trailer_url',
            'genre', 'status', 'total_episodes', 'current_episode', 'release_year',
             'trailer_url', 'video_url',
            'studio', 'rating', 'timeline_position', 'is_featured', 'is_published'
        ]
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter anime title'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 4, 'placeholder': 'Enter anime description'}),
            
            # ✅ NEW: Poster fields
            'poster_image': forms.FileInput(attrs={'class': 'form-control', 'accept': 'image/*'}),
            'poster_url': forms.URLInput(attrs={'class': 'form-control', 'placeholder': 'https://example.com/poster.jpg'}),
            
            # ✅ NEW: Banner fields
            'banner_image': forms.FileInput(attrs={'class': 'form-control', 'accept': 'image/*'}),
            'banner_url': forms.URLInput(attrs={'class': 'form-control', 'placeholder': 'https://example.com/banner.jpg'}),
            
            'genre': forms.Select(attrs={'class': 'form-control'}),
            'status': forms.Select(attrs={'class': 'form-control'}),
            'total_episodes': forms.NumberInput(attrs={'class': 'form-control'}),
            'current_episode': forms.NumberInput(attrs={'class': 'form-control'}),
            'release_year': forms.NumberInput(attrs={'class': 'form-control'}),
            'studio': forms.TextInput(attrs={'class': 'form-control'}),
            'rating': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.1', 'min': '0', 'max': '10'}),
            'timeline_position': forms.NumberInput(attrs={'class': 'form-control', 'min': '2000', 'max': '2025'}),
            'trailer_url': forms.URLInput(attrs={'class': 'form-control', 'placeholder': 'https://...'}),
             'video_url': forms.URLInput(attrs={'class': 'form-control', 'placeholder': 'https://...'}),
            'is_featured': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'is_published': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }

class CharacterForm(forms.ModelForm):
    class Meta:
        model = Character
        fields = ['name', 'description', 'character_image', 'character_image_url', 'is_main_character']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'character_image': forms.FileInput(attrs={'class': 'form-control', 'accept': 'image/*'}),
            'character_image_url': forms.URLInput(attrs={'class': 'form-control', 'placeholder': 'https://example.com/character.jpg'}),
            'is_main_character': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }

class EpisodeForm(forms.ModelForm):
    class Meta:
        model = Episode
        fields = ['episode_number', 'title', 'description', 'air_date', 'duration']
        widgets = {
            'episode_number': forms.NumberInput(attrs={'class': 'form-control'}),
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'air_date': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
            'duration': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Duration in minutes'}),
        }
