# Generated by Django 4.2.7 on 2024-02-25 19:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0007_alter_profile_location_one_latitude_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='count_down_timer',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
