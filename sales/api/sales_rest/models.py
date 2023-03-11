from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, null=True, unique=True)
    vin = models.CharField(max_length=17, unique=True)
    color = models.CharField(max_length=50, default=None)
    year = models.PositiveSmallIntegerField(default=None)
    sold = models.BooleanField(default=False)

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin": self.vin})


class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveIntegerField(unique=True)

    def get_api_url(self):
        return reverse("api_sales_person", kwargs={"pk": self.id})


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.PositiveBigIntegerField()

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.id})


class SaleRecord(models.Model):
     price = models.PositiveIntegerField()

     customer = models.ForeignKey(
         'Customer',
         related_name='customer',
         on_delete=models.CASCADE,
     )

     sales_person = models.ForeignKey(
         'SalesPerson',
         related_name='sales_person',
         on_delete=models.CASCADE,
     )

     automobile = models.ForeignKey(
         'AutomobileVO',
         related_name='salerecord',
         on_delete=models.CASCADE,
     )
