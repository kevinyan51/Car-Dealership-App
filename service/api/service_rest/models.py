from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)
    color = models.CharField(max_length=50, default=None)
    year = models.PositiveSmallIntegerField(default=None)

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin":self.vin})

class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveIntegerField()

    def get_api_url(self):
        return reverse("api_list_technicians", kwargs={"pk": self.id})

class ServiceAppointment(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
    reason = models.TextField()
    technician = models.ForeignKey(
        'Technician',
        related_name='technicians',
        on_delete=models.CASCADE,
    )
    vin = models.ForeignKey(
        'AutomobileVO',
        related_name='appointment',
        on_delete=models.CASCADE
    )
    def get_api_url(self):
        return reverse("api_list_appointment", kwargs={"pk": self.id})
