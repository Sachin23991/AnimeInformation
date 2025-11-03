from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Admin Panel
    path('admin/', admin.site.urls),

    # Site navigation - handled by the 'anime' app (includes '/')
    path('', include('anime.urls')), 
   
    # User Authentication (e.g., /login/, /signup/)
    path('', include('users.urls')),

    # Reviews (e.g., /reviews/submit/)
    path('reviews/', include('reviews.urls')),
]

# Serving Static and Media files for development
if settings.DEBUG:
    # Serving Media files (user uploads)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # Serving Static files (CSS, JS, images)
    urlpatterns += static(settings.STATIC_URL, document_root=(settings.STATICFILES_DIRS[0]))