from django.urls import path
from .views import api_list_technicians, api_list_appointment

urlpatterns = [
    path('technician/', api_list_technicians, name='api_list_technicians'),
    path('service/', api_list_appointment, name='api_list_appointment'),
]
