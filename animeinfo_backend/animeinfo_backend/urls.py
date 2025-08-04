from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
     path('anime/', include('anime.urls')),
    path('', TemplateView.as_view(template_name='landingpage.html'), name='landing'),
    path('', include('users.urls')),  # Include user authentication URLs
   
    path('reviews/', include('reviews.urls')),
]


