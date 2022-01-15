from django.db import models
from products.models import Product
from datetime import datetime
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save,post_delete


class Cart(models.Model):
    created_at = models.DateTimeField(default=datetime.now)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,blank=True,null=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_cart(sender, created, instance, *args, **kwargs):
    if created:
        Cart.objects.create(user=instance)


class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    cart = models.ForeignKey('Cart', on_delete=models.CASCADE,related_name="cart_user",verbose_name='user')
    subtotal = models.IntegerField(default=1)


@receiver([post_save,post_delete], sender=CartItem)
def update_total(sender, instance, *args, **kwargs):
        cart= instance.cart
        cart_item=CartItem.objects.filter(cart__user=cart.user)
        print(cart_item)
        total = 0
        # subtotal=instance.subtotal
        print('SIGNAL +++++++++++++++++++++++++')
        # subtotal=int(instance.quantity*instance.product.price)
        for x in cart_item:
            if(x.quantity==0):
                x.delete()
            total += x.product.price*x.quantity
        cart.total= total
        # subtotal.save()
        cart.save()

