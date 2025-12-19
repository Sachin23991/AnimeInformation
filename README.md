# 🌟 AnimeInformation - Complete Anime Database & Management Platform

## 📌 Project Overview

AnimeInformation is a comprehensive, full-stack web application designed to create, manage, and explore a rich anime database. Built with Django as the backend and HTML/CSS/JavaScript for the frontend, this project provides an intuitive platform for anime enthusiasts and administrators to discover, manage, and organize anime content with detailed information, character profiles, and episode tracking.

---

## 🎯 What I Have Done

### 1. **Backend Development (Django)**
   - Created a robust Django REST API with three core applications:
     - **Anime App**: Complete anime database management with models for Anime, Character, and Episode
     - **Users App**: Custom user authentication and profile management
     - **Reviews App**: Review and rating system for anime content
   - Implemented custom user model with extended fields
   - Database: SQLite3 with proper relational models and migrations

### 2. **Database Design**
   - **Anime Model**: 50+ fields including:
     - Basic info (title, description, genre, status)
     - Media files (poster, banner, screenshots, trailer URLs)
     - Metadata (release year, studio, rating, episode count)
     - SEO optimization fields (slug, seo_title, seo_description)
     - Popularity metrics (view count, favorite count, trending rank)
     - Advanced fields (alternative titles, age rating, season, source)
   - **Character Model**: Links characters to anime with name, description, images, and is_main_character flag
   - **Episode Model**: Tracks episode numbers, titles, air dates, and durations per anime
   - **Custom User Model**: Extended authentication with additional user profile fields

### 3. **Views & Business Logic**
   Implemented comprehensive view functions:
   - **Public Views**: Landing page, login page, explore interface
   - **User Views**: Homepage with statistics, anime showcase with search, explore by genre
   - **Anime Detail View**: Display anime with characters and episodes
   - **Admin Dashboard**: Admin-only statistics and management interface
   - **CRUD Operations**: 
     - Create, Read, Update, Delete anime
     - Manage characters per anime
     - Handle episodes and episode details
   - **Search & Filtering**: Search by anime title, filter by genre
   - **Statistics Calculation**: Total anime, characters, unique genres, and genre-specific counts

### 4. **Frontend Templates (15+ HTML Files)**
   - **Landing Page** (`landingpage.html`): Welcome screen with call-to-action
   - **Login/Authentication**:
     - `loginpage.html`: User login form
     - `password_reset_*.html` files: Complete password recovery workflow
     - `signup.html`: User registration
   - **User Features**:
     - `homepage.html`: Dashboard with statistics and featured anime
     - `anime_showcase.html`: Gallery view of all anime
     - `anime_detail.html`: Detailed anime page with characters and episodes
     - `explore.html`: Browse and filter anime by genre
   - **Admin Features**:
     - `admin_dashboard.html`: Admin control center with statistics
     - `admin_anime_list.html`: Manage all anime entries
     - `admin_anime_form.html`: Create/Edit anime (Create/Edit forms)
     - `admin_character_*.html`: Manage characters
     - `admin_character_form.html`: Create/Edit characters
   - **Loading States**: `anime-loading.html`, `explore-loading.html`, `pre-login-loading.html`

### 5. **Static Assets**
   - **CSS Files**: Organized stylesheets for responsive design
   - **JavaScript Files**: Frontend interactivity and form handling
   - Media management: Dedicated folders for anime posters, banners, screenshots, and character images

### 6. **Authentication & Authorization**
   - Login required decorators for protected views
   - Superuser/admin checks for admin-only operations
   - Session management with custom authentication settings
   - Password reset functionality via email
   - User role-based access control

### 7. **Configuration & Deployment**
   - **Django Settings**:
     - CORS headers enabled for API flexibility
     - WhiteNoise middleware for static file serving
     - Custom user model authentication
     - Email configuration for password reset
     - Template directories properly configured
   - **Dependencies**: 180+ packages including:
     - Django 5.2.4, Flask, DjangoRESTframework
     - Google AI, OpenAI, and Tavily APIs integrated
     - Image processing: Pillow, ImageIO
     - Data science: NumPy, Pandas, Scikit-learn
   - **Deployment Files**:
     - Procfile for Gunicorn WSGI server
     - Profile for application entry point
     - Successfully deployed on Render.com

---

## 🔄 Application Workflow

### **User Journey**

1. **Access Landing Page** → User arrives at `landingpage.html`
2. **Authentication**:
   - New users: Click signup → Register at `/signup/` → Creates CustomUser
   - Existing users: Click login → `/login/` → Authenticate via Django auth
3. **Dashboard** → Redirected to `homepage.html` → View:
   - Featured anime carousel
   - Total statistics (anime count, characters, genres)
   - Genre-specific breakdowns
4. **Explore Content**:
   - **Showcase**: `/anime-showcase/` → Browse all published anime with search
   - **Genre Filter**: `/explore/?genre=shounen` → Filter by specific genres
5. **View Details**: Click anime → `/anime/<id>/` → See:
   - Anime description, metadata, ratings
   - Main characters with images
   - Episode list
6. **Admin Panel** (Superuser only):
   - `/admin-dashboard/` → Statistics and management
   - `/admin-anime-list/` → CRUD all anime
   - `/admin-character-list/<anime_id>/` → Manage characters
   - `/admin-anime-create/` → Add new anime entry

### **Admin Workflow**

```
Login as Superuser
        ↓
Access Admin Dashboard
        ↓
    ┌───┴────┬──────────┬──────────┐
    ↓        ↓          ↓          ↓
 Manage   Manage    Manage    View
 Anime   Characters Episodes  Stats
    ↓        ↓          ↓          ↓
 Create   Create     Create    Display
  Edit     Edit       Edit     Analytics
 Delete   Delete     Delete
```

---

## 🏗️ Project Architecture

```
AnimeInformation/
├── animeinfo_backend/                 # Django Project Root
│   ├── animeinfo_backend/             # Project Configuration
│   │   ├── settings.py                # Django settings with CORS, Auth
│   │   ├── urls.py                    # URL routing configuration
│   │   ├── asgi.py                    # ASGI configuration
│   │   └── wsgi.py                    # WSGI configuration for deployment
│   │
│   ├── anime/                         # Core Anime App
│   │   ├── models.py                  # Anime, Character, Episode models (50+ fields)
│   │   ├── views.py                   # All view functions (user + admin)
│   │   ├── forms.py                   # ModelForms for create/edit
│   │   ├── urls.py                    # App URL patterns
│   │   ├── admin.py                   # Django admin customization
│   │   └── migrations/                # Database migrations
│   │
│   ├── users/                         # User Management App
│   │   ├── models.py                  # CustomUser model
│   │   ├── views.py                   # Auth views
│   │   └── forms.py                   # User forms
│   │
│   ├── reviews/                       # Reviews & Ratings App
│   │   ├── models.py                  # Review model
│   │   └── views.py                   # Review views
│   │
│   ├── manage.py                      # Django management
│   ├── requirements.txt               # All dependencies (180+ packages)
│   └── db.sqlite3                     # SQLite database
│
├── templates/                         # HTML Templates (15+ files)
│   ├── landingpage.html              # Home page
│   ├── loginpage.html                # Login form
│   ├── homepage.html                 # User dashboard
│   ├── anime_showcase.html           # Anime gallery
│   ├── anime_detail.html             # Anime details page
│   ├── explore.html                  # Genre browsing
│   ├── admin_dashboard.html          # Admin control center
│   ├── admin_anime_list.html         # Manage anime
│   ├── admin_anime_form.html         # Create/Edit anime
│   ├── admin_character_list.html     # Character management
│   ├── password_reset_*.html         # Password recovery workflow (5 files)
│   └── *-loading.html                # Loading states
│
├── static/                           # Frontend Assets
│   ├── css/                          # Stylesheets
│   └── js/                           # JavaScript files
│
├── media/                            # User Uploaded Content
│   ├── anime_posters/                # Anime poster images
│   ├── anime_banners/                # Anime banner images
│   ├── anime_screenshots/            # Anime screenshots
│   ├── anime_logos/                  # Anime logos
│   └── characters/                   # Character images
│
└── db.sqlite3                        # Application Database
```

---

## 🚀 Key Features Implemented

### **1. Content Management**
- ✅ Add unlimited anime entries with 50+ customizable fields
- ✅ Upload images: posters, banners, screenshots, logos
- ✅ Add trailers and video URLs
- ✅ Manage characters per anime (main and supporting)
- ✅ Track episode information with air dates
- ✅ Support multiple genres, sources, and ratings

### **2. User Experience**
- ✅ Responsive design for all devices
- ✅ Search anime by title
- ✅ Filter by genre (15+ genres)
- ✅ Browse timeline view of anime
- ✅ Featured anime carousel
- ✅ Statistics dashboard with genre breakdowns
- ✅ Character profiles with images

### **3. Admin Features**
- ✅ Comprehensive admin dashboard
- ✅ Full CRUD operations for anime
- ✅ Manage characters with images
- ✅ Episode management
- ✅ Publish/unpublish content control
- ✅ Featured anime selection
- ✅ Content statistics and analytics

### **4. Technical Implementation**
- ✅ Custom Django authentication system
- ✅ SQLite database with relational models
- ✅ Slug-based URLs for SEO
- ✅ Pagination support
- ✅ Image optimization with Pillow
- ✅ Static file serving with WhiteNoise
- ✅ CORS enabled for API access
- ✅ Email-based password recovery

---

## 🛠️ Technology Stack

### **Backend**
- **Framework**: Django 5.2.4
- **Database**: SQLite3 (easily upgradable to PostgreSQL)
- **Server**: Gunicorn WSGI
- **Static Files**: WhiteNoise

### **Frontend**
- **HTML5**: Semantic markup
- **CSS3**: Responsive design
- **JavaScript**: Form handling and interactivity
- **Bootstrap/Tailwind**: (Optional styling framework usage)

### **APIs Integrated**
- Google Generative AI (for content generation)
- OpenAI (optional LLM integration)
- Tavily Search API

### **Key Dependencies**
- Django REST Framework
- django-cors-headers
- Pillow (image processing)
- NumPy, Pandas, Scikit-learn
- Pydantic (data validation)

---

## 📦 Quick Summary

| Aspect | Details |
|--------|----------|
| **Language** | Python (Backend), HTML/CSS/JavaScript (Frontend) |
| **Framework** | Django 5.2.4 |
| **Database** | SQLite3 |
| **Models** | Anime, Character, Episode, CustomUser, Review |
| **Views** | 20+ function-based views covering all use cases |
| **Templates** | 15+ HTML files for different workflows |
| **Authentication** | Custom user model with Django auth |
| **Deployment** | Render.com (Gunicorn + WhiteNoise) |
| **Total Dependencies** | 180+ packages |
| **API Integrations** | Google AI, OpenAI, Tavily |

---

## 🎓 What This Project Demonstrates

✨ **Full-Stack Development**: Complete Django project from database design to deployment
✨ **Database Design**: Complex relational models with 50+ fields
✨ **User Authentication**: Custom user model and role-based access control
✨ **RESTful API Design**: CRUD operations for multiple models
✨ **Frontend Integration**: Dynamic templates with real data
✨ **Admin Panel**: Custom Django admin interface
✨ **File Upload Handling**: Image management and media storage
✨ **Search & Filtering**: Complex queries and QuerySet optimization
✨ **Deployment**: Production-ready application on Render
✨ **Code Organization**: Modular structure with separation of concerns

---

## 🌐 Live Demo

The application is deployed and running at:
- **Frontend**: https://animeinformation.onrender.com/
- **Admin Panel**: https://animeinformation.onrender.com/admin/

---

## 📝 License

This project is open source and available under the MIT License.

---

**Built with passion by Sachin Sharma** 🎌
*A full-stack web development project showcasing Django expertise, database design, and modern web application architecture.*
