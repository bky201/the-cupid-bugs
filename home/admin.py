from django.contrib import admin
from .models import Profile

# Register your models here.
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name_one', 'name_two', 'location_one', 'location_one_latitude','location_one_longitude', 'location_two', 'location_two_latitude', 'location_two_longitude', 'status']

# admin.site.unregister(Profile)
# admin.site.register(Profile, ProfileAdmin)
