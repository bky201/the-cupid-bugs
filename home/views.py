from django.shortcuts import render, redirect
from .forms import ProfileForm
from .models import Profile
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required


def index(request):
    if request.user.is_authenticated:
        profile = Profile.objects.get(user=request.user)
        profiles = Profile.objects.all()

        context = {
            'profile': profile, 
            'profiles': profiles,
            }

        return render(request, 'home/index.html', context)
    else:
        return render(request, 'home/landing.html')
    
def network(request):
    profiles = Profile.objects.all()

    context = {
        'profiles': profiles,
        }
    return render(request, 'home/network.html', context)

def contact(request):
    """ A view to return the contact page """

    return render(request, 'home/contact.html')

def test(request):
    """ A view to return the contact page """

    return render(request, 'home/test.html')



def about(request):
    """ A view to return the about page """

    return render(request, 'home/about.html')



def profile_view(request):
    if request.user.is_authenticated:
        profile = Profile.objects.get(user=request.user)
        
        
        context = {
            'profile': profile,
        }
        return render(request, 'home/profile_view.html', context)
    else:
        return redirect('profile')



@login_required
def profile(request):
    if Profile.objects.filter(user=request.user).exists():
        return redirect('profile_view')

    if request.method == 'POST':
        form = ProfileForm(request.POST)
        if form.is_valid():
            profile = form.save(commit=False)
            profile.user = request.user
            profile.save()
            return redirect('home')
    else:
        form = ProfileForm()

    context = {'form': form}
    return render(request, 'home/profile.html', context)

@login_required
def edit_profile(request):
    try:
        profile = Profile.objects.get(user=request.user)
    except Profile.DoesNotExist:
        return redirect('profile')

    if request.method == 'POST':
        form = ProfileForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()
            return redirect('profile_view')
    else:
        form = ProfileForm(instance=profile)

    return render(request, 'home/edit_profile.html', {'form': form, 'profile': profile})


@login_required
def delete_profile(request):
    if request.method == 'POST':
        profile = Profile.objects.get(user=request.user)
        profile.delete()
        request.user.delete()
        logout(request)
        return redirect('home')
    else:
        return render(request, 'home/delete_profile_confirmation.html')
    
def landing(request):
    """ A view to return the about page """
    if request.user.is_authenticated:
        return redirect('profile')
    else:
        return render(request, 'home/landing.html')
    
