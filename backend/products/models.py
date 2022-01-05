import os
import random
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
    title=models.CharField(max_length=120)
    slug=models.SlugField(blank=True, null=True)
    description=models.TextField(max_length=500)
    price=models.DecimalField(max_digits=20,decimal_places=2)
    image=models.ImageField(upload_to=upload_image_field,null=True, blank=True)
    
    def __str__(self):
        return self.title

# Male Product Model
class MensProduct(models.Model):
    pass


# FeMale Product Model
class MensProduct(models.Model):
    pass
