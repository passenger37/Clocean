import os
import random
from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
# from rest_framework.authtoken.models import Token

# helper functioncs
def get_file_ext(file):
    base_name=os.path.basename(file)
    name,ext=os.path.splitext(base_name)
    return name,ext

def upload_image_field(instance,filename):
    # new_filename=random.randint(1,5446346843163)
    name,ext=get_file_ext(filename)
    finalname='{new_name}{ext}'.format(new_name=name,ext=ext)
    return 'media/profile/{username}/{new_filename}/{finalname}'.format(username=instance.user,new_filename=name,finalname=finalname)


class Profile (models.Model):
    GENDER_MALE = "m"
    GENDER_FEMALE = "f"
    OTHER = "o"

    GENDER_CHOICES = (
        (GENDER_MALE, "Male"),
        (GENDER_FEMALE, "Female"),
        (OTHER, "Other"),
    )

    user=models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    mobile_number=models.IntegerField(blank=True, null=True)
    profile_img=models.ImageField(upload_to=upload_image_field, null=True,blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True)
    about = models.TextField(blank=True, null=True)
    # TODO: add other fields related to profile like img profile n all

    def __str__(self):
        return self.user.username


# signal to create profile while creating user
def post_save_user_model_receiver(sender,instance,created,*args, **kwargs):
    if created:
        try:
            print("Creating... Profile for User")
            Profile.objects.create(user=instance)
            # Token.objects.create(user=instance)
        except:
            print("Profile Signal Not Working Properly")

post_save.connect(post_save_user_model_receiver,sender=settings.AUTH_USER_MODEL)


class TimeStampedModel(models.Model):
    created = models.DateTimeField(db_index=True, auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Address(TimeStampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="address", on_delete=models.CASCADE)
    name=models.CharField(max_length=100,default='Unknown')
    city = models.CharField(max_length=100, blank=False, null=False)
    district = models.CharField(max_length=100, blank=False, null=False)
    street_address = models.CharField(max_length=250, blank=False, null=False)
    postal_code = models.CharField(max_length=20, blank=True, null=True)
    primary = models.BooleanField(default=False)
    phone_number=models.PositiveIntegerField(blank=True, null=True)
    building_number = models.PositiveIntegerField(blank=True, null=True)
    apartment_number = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return self.user.username