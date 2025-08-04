# anime/models.py
from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
import re

User = get_user_model()

class Anime(models.Model):
    GENRE_CHOICES = [
        ('shounen', 'Shounen'),
        ('seinen', 'Seinen'),
        ('shoujo', 'Shoujo'),
        ('fantasy', 'Fantasy'),
        ('mecha', 'Mecha'),
        ('horror', 'Horror'),
        ('romance', 'Romance'),
        ('action', 'Action'),
        ('comedy', 'Comedy'),
        ('drama', 'Drama'),
        ('slice_of_life', 'Slice of Life'),
        ('supernatural', 'Supernatural'),
        ('thriller', 'Thriller'),
        ('mystery', 'Mystery'),
        ('sports', 'Sports'),
        ('music', 'Music'),
        ('school', 'School'),
    ]
    
    STATUS_CHOICES = [
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('upcoming', 'Upcoming'),
        ('hiatus', 'On Hiatus'),
        ('cancelled', 'Cancelled'),
    ]

    AGE_RATING_CHOICES = [
        ('G', 'General Audiences'),
        ('PG', 'Parental Guidance'),
        ('PG13', 'PG-13'),
        ('R', 'Restricted'),
        ('NC17', 'Adults Only'),
    ]

    SOURCE_CHOICES = [
        ('manga', 'Manga'),
        ('light_novel', 'Light Novel'),
        ('visual_novel', 'Visual Novel'),
        ('game', 'Video Game'),
        ('original', 'Original'),
        ('web_manga', 'Web Manga'),
        ('novel', 'Novel'),
        ('other', 'Other'),
    ]

    SEASON_CHOICES = [
        ('winter', 'Winter'),
        ('spring', 'Spring'),
        ('summer', 'Summer'),
        ('fall', 'Fall'),
    ]

    # Basic Information (EXISTING FIELDS - keep as is)
    title = models.CharField(max_length=200)
    description = models.TextField()
    poster_image = models.ImageField(upload_to='anime_posters/', blank=True, null=True, 
                                   help_text="Upload poster from your computer")
    poster_url = models.URLField(blank=True, null=True, 
                               help_text="Or enter poster image URL")
    banner_image = models.ImageField(upload_to='anime_banners/', blank=True, null=True,
                                   help_text="Upload banner from your computer")
    banner_url = models.URLField(blank=True, null=True,
                               help_text="Or enter banner image URL")
    trailer_url = models.URLField(blank=True, null=True)
    genre = models.CharField(max_length=20, choices=GENRE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ongoing')
    total_episodes = models.IntegerField(default=0)
    current_episode = models.IntegerField(default=0)
    release_year = models.IntegerField()
    studio = models.CharField(max_length=100)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    timeline_position = models.IntegerField(default=0, help_text="Position in timeline (2000-2025)")
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    # ✅ NEW FIELDS - Add these safely
    video_url = models.URLField(blank=True, null=True, help_text="URL for anime video/preview")
    
    # Additional metadata with safe defaults
    alternative_titles = models.TextField(blank=True, null=True, 
                                        help_text="Alternative titles separated by commas")
    short_description = models.CharField(max_length=300, blank=True, null=True,
                                       help_text="Brief description for cards and previews")
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, default='manga')
    age_rating = models.CharField(max_length=10, choices=AGE_RATING_CHOICES, default='PG13')
    season = models.CharField(max_length=10, choices=SEASON_CHOICES, blank=True, null=True)
    
    # Additional images
    logo_image = models.ImageField(upload_to='anime_logos/', blank=True, null=True,
                                 help_text="Anime logo/title image")
    screenshot1 = models.ImageField(upload_to='anime_screenshots/', blank=True, null=True)
    screenshot2 = models.ImageField(upload_to='anime_screenshots/', blank=True, null=True)
    screenshot3 = models.ImageField(upload_to='anime_screenshots/', blank=True, null=True)
    
    # Media URLs
    opening_theme_url = models.URLField(blank=True, null=True, help_text="Opening theme video URL")
    ending_theme_url = models.URLField(blank=True, null=True, help_text="Ending theme video URL")
    
    # External links
    official_website = models.URLField(blank=True, null=True)
    myanimelist_url = models.URLField(blank=True, null=True, help_text="MyAnimeList page URL")
    anilist_url = models.URLField(blank=True, null=True, help_text="AniList page URL")
    
    # Multiple genres
    secondary_genres = models.CharField(max_length=100, blank=True, null=True,
                                      help_text="Additional genres separated by commas")
    
    # Episode details
    episode_duration = models.IntegerField(default=24, help_text="Average episode duration in minutes")
    episodes_per_season = models.IntegerField(default=12, validators=[MinValueValidator(1)])
    total_seasons = models.IntegerField(default=1, validators=[MinValueValidator(1)])
    
    # ✅ SAFE DATE FIELDS - Use null=True, blank=True
    start_date = models.DateField(blank=True, null=True, help_text="First episode air date")
    end_date = models.DateField(blank=True, null=True, help_text="Last episode air date")
    next_episode_date = models.DateField(blank=True, null=True, help_text="Next episode air date")
    
    # Production info
    producer = models.CharField(max_length=200, blank=True, null=True)
    director = models.CharField(max_length=100, blank=True, null=True)
    music_composer = models.CharField(max_length=100, blank=True, null=True)
    
    # Additional ratings
    mal_score = models.DecimalField(max_digits=3, decimal_places=1, default=0.0, blank=True, null=True,
                                  help_text="MyAnimeList score")
    user_ratings_count = models.IntegerField(default=0, help_text="Number of user ratings")
    
    # Popularity metrics
    popularity_rank = models.IntegerField(blank=True, null=True)
    trending_rank = models.IntegerField(blank=True, null=True)
    view_count = models.IntegerField(default=0)
    favorite_count = models.IntegerField(default=0)
    
    # Additional flags
    is_trending = models.BooleanField(default=False, help_text="Show in trending section")
    is_completed_series = models.BooleanField(default=False)
    is_award_winner = models.BooleanField(default=False)
    is_editor_choice = models.BooleanField(default=False)
    
    # Content and SEO
    content_warnings = models.TextField(blank=True, null=True,
                                      help_text="Content warnings separated by commas")
    tags = models.TextField(blank=True, null=True,
                          help_text="Search tags separated by commas")
    seo_title = models.CharField(max_length=60, blank=True, null=True)
    seo_description = models.CharField(max_length=160, blank=True, null=True)
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
    
    # Keep all your existing methods
    def get_poster_url(self):
        if self.poster_image:
            return self.poster_image.url
        elif self.poster_url:
            return self.poster_url
        return None
    
    def get_banner_url(self):
        if self.banner_image:
            return self.banner_image.url
        elif self.banner_url:
            return self.banner_url
        return None
    
    def get_logo_url(self):
        if self.logo_image:
            return self.logo_image.url
        return None
    
    def get_screenshots(self):
        screenshots = []
        if self.screenshot1:
            screenshots.append(self.screenshot1.url)
        if self.screenshot2:
            screenshots.append(self.screenshot2.url)
        if self.screenshot3:
            screenshots.append(self.screenshot3.url)
        return screenshots
    
    def get_progress_percentage(self):
        if self.total_episodes > 0:
            return min(100, (self.current_episode / self.total_episodes) * 100)
        return 0
    
    def increment_view_count(self):
        self.view_count += 1
        self.save(update_fields=['view_count'])

# Keep your existing Character and Episode models exactly as they were
class Character(models.Model):
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, related_name='characters')
    name = models.CharField(max_length=100)
    description = models.TextField()
    character_image = models.ImageField(upload_to='characters/', blank=True, null=True,
                                      help_text="Upload character image from computer")
    character_image_url = models.URLField(blank=True, null=True,
                                        help_text="Or enter character image URL")
    is_main_character = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.name} - {self.anime.title}"
    
    def get_character_image_url(self):
        if self.character_image:
            return self.character_image.url
        elif self.character_image_url:
            return self.character_image_url
        return None

class Episode(models.Model):
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, related_name='episodes')
    episode_number = models.IntegerField()
    title = models.CharField(max_length=200)
    description = models.TextField()
    air_date = models.DateField(blank=True, null=True)
    duration = models.IntegerField(help_text="Duration in minutes")
    
    class Meta:
        ordering = ['episode_number']
        unique_together = ['anime', 'episode_number']
    
    def __str__(self):
        return f"{self.anime.title} - Episode {self.episode_number}"
