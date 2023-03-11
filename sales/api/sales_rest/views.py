from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutomobileVO, SalesPerson, Customer, SaleRecord


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
        "sold",
        "id",
    ]


class SalesPersonListEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
        "id",
    ]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
        "id",
    ]


class SaleRecordListEncoder(ModelEncoder):
    model = SaleRecord
    properties = [
        "price",
        "customer",
        "sales_person",
        "automobile",
        "id",
    ]
    encoders = {
        "sales_person": SalesPersonListEncoder(),
        "customer": CustomerListEncoder(),
        "automobile": AutomobileVODetailEncoder(),
    }

@require_http_methods(["GET"])
def api_list_automobilesVO(request):
    automobiles = AutomobileVO.objects.all()
    return JsonResponse({"automobiles": automobiles}, encoder=AutomobileVODetailEncoder)


@require_http_methods(["GET", "POST"])
def api_list_sales_person(request):
    if request.method == "GET":
        sales_person = SalesPerson.objects.all()
        return JsonResponse({"sales_person": sales_person}, encoder=SalesPersonListEncoder)
    else:
        content = json.loads(request.body)

        sales_person = SalesPerson.objects.create(**content)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonListEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse({"customer": customer}, encoder=CustomerListEncoder)
    else:
        content = json.loads(request.body)

        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerListEncoder,
            safe=False,
        )



@require_http_methods(["GET", "POST"])
def api_list_sale_record(request):
    if request.method == "GET":
        sale_record = SaleRecord.objects.all()
        return JsonResponse({"sale_record": sale_record}, encoder=SaleRecordListEncoder, safe=False,)
    else:
        content = json.loads(request.body)

        try:
            sales_person = SalesPerson.objects.get(name=content["sales_person"])
            content["sales_person"] = sales_person

            customer = Customer.objects.get(name=content["customer"])
            content["customer"] = customer

            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = automobile

            if automobile.sold == False:
                content["automobile"].sold = True
                automobile.save()
                sale_record = SaleRecord.objects.create(**content)

        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile"},
                status=400,
            )

        return JsonResponse(
            {"sales_record": sale_record},
            encoder=SaleRecordListEncoder,
            safe=False,
        )
