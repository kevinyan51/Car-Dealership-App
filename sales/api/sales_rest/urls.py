from django.urls import path

from .views import (
    api_list_sales_person,
    api_list_customer,
    api_list_sale_record,
    api_list_automobilesVO,
)

urlpatterns = [
    path("automobiles/", api_list_automobilesVO, name="api_automobilesVO"),
    path("salespersons/", api_list_sales_person, name="api_create_sales_person"),
    path("customers/", api_list_customer, name="api_create_customer"),
    path("salerecords/", api_list_sale_record, name="api_create_sale_record"),
]
