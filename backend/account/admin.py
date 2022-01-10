from django.contrib import admin
from .models import Profile
from .models import Address


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display=('user','mobile_number')


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display=('user','city','postal_code')