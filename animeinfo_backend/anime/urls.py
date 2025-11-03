# anime/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Landing page (entry point) - Using view function
    path('', views.landing_page, name='landing'),
    
    # Pre-login loading
    path('anime-loading/', views.anime_loading, name='anime_loading'),
    
    # User Views
    path('home/', views.homepage, name='homepage'),
    path('detail/<int:anime_id>/', views.anime_detail, name='anime_detail'),
    path('showcase/', views.anime_showcase, name='anime_showcase'),

    # Explore pages
    path('explore/', views.explore_main, name='explore'),
    path('explore/main/', views.explore, name='explore_main'),

    # Admin Management
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('admin/anime/', views.admin_anime_list, name='admin_anime_list'),
    path('admin/anime/create/', views.admin_anime_create, name='admin_anime_create'),
    path('admin/anime/edit/<int:anime_id>/', views.admin_anime_edit, name='admin_anime_edit'),
    # Delete URL is listed once
    path('admin/anime/delete/<int:anime_id>/', views.admin_anime_delete, name='admin_anime_delete'),
    
    # Character Management URLs
    path('admin/anime/<int:anime_id>/characters/', views.admin_character_list, name='admin_character_list'),
    path('admin/anime/<int:anime_id>/characters/create/', views.admin_character_create, name='admin_character_create'),
    path('admin/character/edit/<int:character_id>/', views.admin_character_edit, name='admin_character_edit'),
    path('admin/character/delete/<int:character_id>/', views.admin_character_delete, name='admin_character_delete'),
]