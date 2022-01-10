from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model
from account.models import Address
from products.models import Product
from carts.models import Cart

import uuid


UserModel = get_user_model()

class Extensions(models.Model):
    uuid = models.UUIDField(db_index=True, default=uuid.uuid4, editable=False)
    created = models.DateTimeField(auto_now_add=True, db_index=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
class TimeStampedModel(models.Model):
    created = models.DateTimeField(db_index=True, auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True




# Order Id generator Signaldef 
# def pre_save_order_number(sender,instance,order_number, *args, **kwargs):
#     if not instance.order_number:
#         instance.order_number=uniq


class OrderItem(TimeStampedModel):
    cart=models.ForeignKey(Cart,on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name="product_order", on_delete=models.CASCADE)
    quantity = models.IntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2)

    @staticmethod
    def create_order_item(order, product, quantity, total):
        order_item = OrderItem()
        order_item.order = order
        order_item.product = product
        order_item.quantity = quantity
        order_item.total = total
        order_item.save()
        return 
    
    def __str__(self):
        return self.cart.user.username

class Order(Extensions):
    PENDING_STATE = "p"
    COMPLETED_STATE = "c"

    ORDER_CHOICES = ((PENDING_STATE, "pending"), (COMPLETED_STATE, "completed"))

    order_number = models.CharField(max_length=250, blank=True, null=True)
    status = models.CharField(max_length=1, choices=ORDER_CHOICES, default=PENDING_STATE)
    is_paid = models.BooleanField(default=False)
    address = models.ForeignKey(Address, related_name="order_address", on_delete=models.CASCADE)
    order = models.ForeignKey(OrderItem, related_name="order_items", on_delete=models.CASCADE)

    @staticmethod
    def create_order(order_number, address, is_paid=False):
        order = Order()
        order.order_number = order_number
        order.address = address
        order.is_paid = is_paid
        order.save()
        return order