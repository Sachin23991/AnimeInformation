# anime/views.py
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.http import JsonResponse
from .models import Anime, Character, Episode
from .forms import AnimeForm, CharacterForm, EpisodeForm


def is_admin(user):
    return user.is_superuser


# ===== PUBLIC VIEWS =====

def landing_page(request):
    return render(request, 'landingpage.html')


def anime_loading(request):
    return render(request, 'anime-loading.html')


def login_page(request):
    return render(request, 'loginpage.html')


def explore_main(request):
    return render(request, 'explore-loading.html')


# ===== USER VIEWS (LOGIN REQUIRED) =====


@login_required
def homepage(request):
    if request.user.is_superuser:
        return redirect('admin_dashboard')
    else:
        # Get published anime data
        published_anime = Anime.objects.filter(is_published=True)
        featured_anime = published_anime.filter(is_featured=True)
        
        # Calculate stats
        total_anime = published_anime.count()
        total_characters = Character.objects.filter(anime__is_published=True).count()
        unique_genres_count = published_anime.values_list('genre', flat=True).distinct().count()
        
        # Count by genre
        shounen_count = published_anime.filter(genre='shounen').count()
        seinen_count = published_anime.filter(genre='seinen').count()
        shoujo_count = published_anime.filter(genre='shoujo').count()
        fantasy_count = published_anime.filter(genre='fantasy').count()
        mecha_count = published_anime.filter(genre='mecha').count()
        horror_count = published_anime.filter(genre='horror').count()
        
        # Debug prints
        print(f"🎌 DEBUG: Total anime: {total_anime}")
        print(f"🎌 DEBUG: Shounen count: {shounen_count}")
        
        context = {
            'featured_anime': featured_anime,
            'total_anime': total_anime,
            'total_characters': total_characters,
            'unique_genres_count': unique_genres_count,
            'shounen_count': shounen_count,
            'seinen_count': seinen_count,
            'shoujo_count': shoujo_count,
            'fantasy_count': fantasy_count,
            'mecha_count': mecha_count,
            'horror_count': horror_count,
        }
        return render(request, 'homepage.html', context)

@login_required

def anime_showcase(request):
    # Get search query from URL parameters
    search_query = request.GET.get('search', '').strip()
    
    # Get all published anime
    all_anime = Anime.objects.filter(is_published=True)
    
    # Apply search filter if search query exists
    if search_query:
        all_anime = all_anime.filter(
            title__icontains=search_query
        ).distinct()
    
    all_anime = all_anime.order_by('-created_at')
    
    # Get featured anime
    featured_anime = Anime.objects.filter(is_featured=True, is_published=True)[:3]
    
    # Get timeline anime (sorted by timeline position)
    timeline_anime = Anime.objects.filter(
        is_published=True, 
        timeline_position__gte=2000
    ).order_by('timeline_position')[:10]
    
    # Get popular characters (main characters only)
    popular_characters = Character.objects.filter(
        anime__is_published=True, 
        is_main_character=True
    )[:8]
    
    # Calculate statistics
    total_anime = all_anime.count()
    total_episodes = sum(anime.total_episodes for anime in all_anime)
    total_characters = Character.objects.filter(anime__is_published=True).count()
    unique_genres = all_anime.values_list('genre', flat=True).distinct().count()
    
    context = {
        'all_anime': all_anime,
        'featured_anime': featured_anime,
        'timeline_anime': timeline_anime,
        'popular_characters': popular_characters,
        'total_anime': total_anime,
        'total_episodes': total_episodes,
        'total_characters': total_characters,
        'genres': Anime.GENRE_CHOICES,
        'unique_genres': unique_genres,
        'search_query': search_query,  # ✅ Pass search query to template
    }
    
    return render(request, 'anime_showcase.html', context)


def explore(request):
    published_anime = Anime.objects.filter(is_published=True)
    genres = Anime.GENRE_CHOICES
    
    # Filter by genre if specified
    genre_filter = request.GET.get('genre')
    if genre_filter:
        published_anime = published_anime.filter(genre=genre_filter)
    
    context = {
        'anime_list': published_anime,
        'genres': genres,
        'current_genre': genre_filter,
    }
    return render(request, 'explore.html', context)


def anime_detail(request, anime_id):
    anime = get_object_or_404(Anime, id=anime_id, is_published=True)
    
    # Main characters (already exists)
    main_characters = anime.characters.filter(is_main_character=True)
    
    # Up to 15 other (non-main) characters
    other_characters = anime.characters.filter(is_main_character=False)[:15]
    
    episodes = anime.episodes.all()[:10]
    
    context = {
        'anime': anime,
        'main_characters': main_characters,
        'other_characters': other_characters,
        'episodes': episodes,
    }
    
    return render(request, 'anime_detail.html', context)



# ===== ADMIN VIEWS (SUPERUSER ONLY) =====

@login_required
@user_passes_test(is_admin)
def admin_dashboard(request):
    total_anime = Anime.objects.count()
    published_anime = Anime.objects.filter(is_published=True).count()
    featured_anime = Anime.objects.filter(is_featured=True).count()
    total_characters = Character.objects.count()
    
    recent_anime = Anime.objects.order_by('-created_at')[:5]
    
    context = {
        'total_anime': total_anime,
        'published_anime': published_anime,
        'featured_anime': featured_anime,
        'total_characters': total_characters,
        'recent_anime': recent_anime,
    }
    return render(request, 'admin_dashboard.html', context)


# ===== ANIME MANAGEMENT =====

@login_required
@user_passes_test(is_admin)
def admin_anime_list(request):
    anime_list = Anime.objects.all().order_by('-created_at')
    return render(request, 'admin_anime_list.html', {'anime_list': anime_list})


@login_required
@user_passes_test(is_admin)
def admin_anime_create(request):
    if request.method == 'POST':
        form = AnimeForm(request.POST, request.FILES)
        if form.is_valid():
            anime = form.save(commit=False)
            anime.created_by = request.user
            anime.save()
            messages.success(request, f'Anime "{anime.title}" created successfully!')
            return redirect('admin_anime_list')
    else:
        form = AnimeForm()
    
    return render(request, 'admin_anime_form.html', {'form': form, 'action': 'Create'})


@login_required
@user_passes_test(is_admin)
def admin_anime_edit(request, anime_id):
    anime = get_object_or_404(Anime, id=anime_id)
    
    if request.method == 'POST':
        form = AnimeForm(request.POST, request.FILES, instance=anime)
        if form.is_valid():
            form.save()
            messages.success(request, f'Anime "{anime.title}" updated successfully!')
            return redirect('admin_anime_list')
    else:
        form = AnimeForm(instance=anime)
    
    return render(request, 'admin_anime_form.html', {'form': form, 'action': 'Edit', 'anime': anime})


@login_required
@user_passes_test(is_admin)
def admin_anime_delete(request, anime_id):
    anime = get_object_or_404(Anime, id=anime_id)
    
    if request.method == 'POST':
        anime_title = anime.title
        anime.delete()
        messages.success(request, f'Anime "{anime_title}" and all associated data deleted successfully!')
    
    return redirect('admin_anime_list')


# ===== CHARACTER MANAGEMENT =====

@login_required
@user_passes_test(is_admin)
def admin_character_list(request, anime_id):
    anime = get_object_or_404(Anime, id=anime_id)
    characters = anime.characters.all()
    
    context = {
        'anime': anime,
        'characters': characters,
    }
    return render(request, 'admin_character_list.html', context)


@login_required
@user_passes_test(is_admin)
def admin_character_create(request, anime_id):
    anime = get_object_or_404(Anime, id=anime_id)
    
    if request.method == 'POST':
        form = CharacterForm(request.POST, request.FILES)
        if form.is_valid():
            character = form.save(commit=False)
            character.anime = anime
            character.save()
            messages.success(request, f'Character "{character.name}" created successfully!')
            return redirect('admin_character_list', anime_id=anime.id)
    else:
        form = CharacterForm()
    
    context = {
        'form': form,
        'anime': anime,
        'action': 'Create'
    }
    return render(request, 'admin_character_form.html', context)


@login_required
@user_passes_test(is_admin)
def admin_character_edit(request, character_id):
    character = get_object_or_404(Character, id=character_id)
    anime = character.anime
    
    if request.method == 'POST':
        form = CharacterForm(request.POST, request.FILES, instance=character)
        if form.is_valid():
            form.save()
            messages.success(request, f'Character "{character.name}" updated successfully!')
            return redirect('admin_character_list', anime_id=anime.id)
    else:
        form = CharacterForm(instance=character)
    
    context = {
        'form': form,
        'anime': anime,
        'character': character,
        'action': 'Edit'
    }
    return render(request, 'admin_character_form.html', context)


@login_required
@user_passes_test(is_admin)
def admin_character_delete(request, character_id):
    character = get_object_or_404(Character, id=character_id)
    anime = character.anime
    
    if request.method == 'POST':
        character_name = character.name
        character.delete()
        messages.success(request, f'Character "{character_name}" deleted successfully!')
    
    return redirect('admin_character_list', anime_id=anime.id)


# Add this function to your anime/views.py

@login_required
@user_passes_test(is_admin)
def admin_anime_edit(request, anime_id):
    anime = get_object_or_404(Anime, id=anime_id)
    
    if request.method == 'POST':
        form = AnimeForm(request.POST, request.FILES, instance=anime)
        if form.is_valid():
            form.save()
            messages.success(request, f'Anime "{anime.title}" updated successfully!')
            return redirect('admin_dashboard')
    else:
        form = AnimeForm(instance=anime)
    
    return render(request, 'admin_anime_form.html', {
        'form': form, 
        'action': 'Edit', 
        'anime': anime
    })
