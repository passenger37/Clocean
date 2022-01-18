import os
import random
from unicodedata import category
from django.db import models
from django.db.models.signals import post_save
from django.conf import settings

# helper functioncs
def get_file_ext(file):
    base_name=os.path.basename(file)
    name,ext=os.path.splitext(base_name)
    return name,ext

def upload_image_field(instance,filename):
    # new_filename=random.randint(1,5446346843163)
    name,ext=get_file_ext(filename)
    finalname='{new_name}{ext}'.format(new_name=name,ext=ext)
    return 'media/product/{new_filename}/{finalname}'.format(new_filename=name,finalname=finalname)

class Product(models.Model):
    LARGE = "L"
    MEDIUM = "M"
    SMALL = "S"
    MALE='m'
    FEMALE='f'

    TYPE_CHOICES = ((LARGE, "LARGE"), (MEDIUM, "MEDIUM"),(SMALL, "SMALL"))
    CATEGORY_CHOICES = ((MALE, "MALE"), (FEMALE, "FEMALE"))


    title=models.CharField(max_length=120)
    # slug=models.SlugField(blank=True, null=True)
    type = models.CharField(max_length=1, choices=CATEGORY_CHOICES, default=LARGE)
    category= models.CharField(max_length=1,choices=TYPE_CHOICES, default=MALE)
    description=models.TextField(max_length=500)
    price=models.DecimalField(max_digits=20,decimal_places=2)
    image=models.ImageField(upload_to=upload_image_field,null=True, blank=True)
    
    def __str__(self):
        return self.title


# UPVOTE & DOWNVOTE

class UpVote(models.Model):
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    products=models.ForeignKey(Product,null=True, blank=True,on_delete=models.CASCADE)

class DownVote(models.Model):
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    products=models.ForeignKey(Product,null=True, blank=True,on_delete=models.CASCADE)

    