from django.urls import path
from .views import api_list_technicians, api_list_appointment, api_detail_technician, api_appointment_delete

urlpatterns = [
    path('technician/', api_list_technicians, name='api_list_technicians'),
    path('technician/<int:pk>/', api_detail_technician, name='api_detail_technician'),
    path('service/', api_list_appointment, name='api_list_appointment'),
    path('service/<int:pk>/', api_appointment_delete, name='api_appointment_delete'),
]
