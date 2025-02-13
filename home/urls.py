from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing, name='landing'),
    path('home/', views.index, name='home'),
    path('network/', views.network, name='network'),
    path('profile/', views.profile, name='profile'),
    path('profile/profile_view', views.profile_view, name='profile_view'),
    path('profile/edit_profile/', views.edit_profile, name='edit_profile'),
    path('profile/delete_profile/', views.delete_profile, name='delete_profile'),
    path ('about/', views.about, name='about'),
    path("contact/", views.contact, name="contact"),
]
