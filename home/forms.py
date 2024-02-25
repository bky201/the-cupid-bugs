from django import forms
from .models import Profile
from django.forms.fields import DateTimeField

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['name_one', 'name_two', 'location_one', 'location_one_latitude', 'location_one_longitude', 'location_two', 'location_two_latitude', 'location_two_longitude', 'status', 'datetime_field']
        widgets = {
            'datetime_field': forms.DateTimeInput(attrs={'type': 'datetime-local'})
        }

    def save(self, commit=True):
        instance = super(ProfileForm, self).save(commit=False)

        # Extract latitude and longitude values from form data
        lat1 = self.cleaned_data.get('location_one_latitude')
        lon1 = self.cleaned_data.get('location_one_longitude')
        lat2 = self.cleaned_data.get('location_two_latitude')
        lon2 = self.cleaned_data.get('location_two_longitude')

        # Save latitude and longitude values to the model instance
        instance.location_one_latitude = lat1
        instance.location_one_longitude = lon1
        instance.location_two_latitude = lat2
        instance.location_two_longitude = lon2

        if commit:
            instance.save()
        return instance
