from django.db import models
from products.models import Product
from datetime import datetime
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save,m2m_changed


class Cart(models.Model):
    created_at = models.DateTimeField(default=datetime.now)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,blank=True,null=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True)

    # def recalculate_and_save(self):
    #   print("recalculate_and_save running")
    #   total = 0
    #   for ci in self.cartitem_set.all():
    #       total += ci.product.price*ci.quantity
    #   self.total = total
    #   self.save()

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


# @receiver(m2m_changed, sender=CartItem)
# def m2m_changed_cart_receiver(sender, instance, action, *args, **kwargs):
#     if action == 'post_add' or action == 'post_remove' or action == 'post_clear':
#         products = instance.product.all()
#         total = 0
#         for x in products:
#             total += x.price
#         if instance.subtotal != total:
#             instance.subtotal = total
#             instance.save()
