import os
import random
from django.db import models
from django.conf import settings
from django.db.models.signals import post_save

# helper functioncs
def get_file_ext(file):
    base_name=os.path.basename(file)
    name,ext=os.path.splitext(base_name)
    return name,ext

def upload_image_field(instance,filename):
    new_filename=random.randint(1,5446346843163)
    name,ext=get_file_ext(filename)
    finalname='{new_name}{ext}'.format(new_name=new_filename,ext=ext)
    return 'media/profile/{new_filename}/{finalname}'.format(new_filename=new_filename,finalname=finalname)


class Profile (models.Model):
    user=models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    mobile_number=models.IntegerField(blank=True, null=True)
    profile_img=models.ImageField(upload_to=upload_image_field, null=True,blank=True)
    address=models.CharField(max_length=200,null=True,blank=True)
    # TODO: add other fields related to profile like img profile n all

    def __str__(self):
        return self.user.username


# signals
def post_save_user_model_receiver(sender,instance,created,*args, **kwargs):
    if created:
        try:
            print("Creating... Profile for User")
            Profile.objects.create(user=instance)
        except:
            print("Profile Signal Not Working Properly")

post_save.connect(post_save_user_model_receiver,sender=settings.AUTH_USER_MODEL)