# users/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import login, get_user_model
from django.contrib import messages
from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy
from .forms import CustomUserCreationForm, FlexibleAuthenticationForm

User = get_user_model()

class CustomLoginView(LoginView):
    form_class = FlexibleAuthenticationForm
    template_name = 'loginpage.html'
    
    def get_success_url(self):
        # Check if user is superuser and redirect accordingly
        if self.request.user.is_superuser:
            return reverse_lazy('admin_dashboard')  # Redirect to admin dashboard
        else:
            return reverse_lazy('homepage')  # Redirect to regular homepage
    
    def form_valid(self, form):
        user = form.get_user()
        login(self.request, user)
        
        # Different messages for different user types
        if user.is_superuser:
            messages.success(self.request, f'Welcome back, Admin {user.first_name or user.username}!')
        else:
            messages.success(self.request, f'Welcome back, {user.first_name or user.username}!')
        
        return super().form_valid(form)
    
    def form_invalid(self, form):
        messages.error(self.request, 'Invalid username/email or password. Please try again.')
        return super().form_invalid(form)

# Keep your existing signup_view and homepage_view as they are
def signup_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        
        if form.is_valid():
            try:
                username = form.cleaned_data['username']
                email = form.cleaned_data['email']
                
                if User.objects.filter(username=username).exists():
                    messages.error(request, f'Username "{username}" is already taken. Please choose a different username.')
                    return render(request, 'signup.html', {'form': form})
                
                if User.objects.filter(email=email).exists():
                    messages.error(request, f'An account with email "{email}" already exists. Please use a different email or try logging in.')
                    return render(request, 'signup.html', {'form': form})
                
                user = form.save()
                login(request, user)
                messages.success(request, f'Welcome {user.first_name}! Your account has been created successfully!')
                return redirect('homepage')  # Regular users go to homepage
                
            except Exception as e:
                print("Error saving user:", str(e))
                messages.error(request, f'Error creating account: {str(e)}')
        else:
            print("Form errors:", form.errors)
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f'{field.title()}: {error}')
    else:
        form = CustomUserCreationForm()
    
    return render(request, 'signup.html', {'form': form})

def homepage_view(request):
    # Check if user is superuser when accessing homepage directly
    if request.user.is_authenticated and request.user.is_superuser:
        return redirect('admin_dashboard')
    return render(request, 'homepage.html')
