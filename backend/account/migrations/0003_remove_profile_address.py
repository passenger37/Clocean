# Generated by Django 3.2.9 on 2022-01-06 08:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_auto_20220106_1406'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='address',
        ),
    ]