# Generated by Django 3.2.9 on 2022-01-05 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carts', '0010_remove_cartitem_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cartitem',
            old_name='price_ht',
            new_name='item_price',
        ),
        migrations.AddField(
            model_name='cart',
            name='total',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True),
        ),
    ]
