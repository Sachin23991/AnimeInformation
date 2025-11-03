# reviews/models.py
from django.db import models
from django.conf import settings
# NOTE: Make sure to create an empty anime/models.py if it doesn't exist
from anime.models import Anime 

class AnimeReview(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='anime_reviews'
    )
    anime = models.ForeignKey(
        Anime, 
        on_delete=models.CASCADE, 
        related_name='reviews'
    )
    rating = models.DecimalField(
        max_digits=3, 
        decimal_places=1, 
        choices=[(i/10, i/10) for i in range(1, 101)], 
        default=5.0
    )
    review_text = models.TextField(
        blank=True, 
        null=True,
        verbose_name='Review'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Anime Review"
        verbose_name_plural = "Anime Reviews"
        unique_together = ('user', 'anime')
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user.username} - {self.anime.title} ({self.rating})'