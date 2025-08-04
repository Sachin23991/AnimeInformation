from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    # Landing page (entry point)
    path('', TemplateView.as_view(template_name='landingpage.html'), name='landing'),
    
    # Pre-login loading (when user clicks "Anime" from landing page)
    path('anime-loading/', TemplateView.as_view(template_name='pre-login-loading.html'), name='anime_loading'),
    
    # Login page
    #path('login/', TemplateView.as_view(template_name='loginpage.html'), name='login'),
    
    # Signup page
   # path('signup/', TemplateView.as_view(template_name='signup.html'), name='signup'),
    
    # ✅ Homepage (direct redirect after login)
     path('home/', views.homepage, name='homepage'),
     path('detail/<int:anime_id>/', views.anime_detail, name='anime_detail'),

path('showcase/', views.anime_showcase, name='anime_showcase'),

    
    # Explore pages
    path('explore/', TemplateView.as_view(template_name='explore-loading.html'), name='explore'),
    path('explore/main/', TemplateView.as_view(template_name='explore.html'), name='explore_main'),

    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('admin/anime/', views.admin_anime_list, name='admin_anime_list'),
    path('admin/anime/create/', views.admin_anime_create, name='admin_anime_create'),
    path('admin/anime/edit/<int:anime_id>/', views.admin_anime_edit, name='admin_anime_edit'),
    path('admin/anime/delete/<int:anime_id>/', views.admin_anime_delete, name='admin_anime_delete'),  # Add this
    
    # Character Management URLs
    path('admin/anime/<int:anime_id>/characters/', views.admin_character_list, name='admin_character_list'),
    path('admin/anime/<int:anime_id>/characters/create/', views.admin_character_create, name='admin_character_create'),
    path('admin/character/edit/<int:character_id>/', views.admin_character_edit, name='admin_character_edit'),
    path('admin/character/delete/<int:character_id>/', views.admin_character_delete, name='admin_character_delete'),

    # Add this line to your anime/urls.py
path('admin/anime/delete/<int:anime_id>/', views.admin_anime_delete, name='admin_anime_delete'),

]
