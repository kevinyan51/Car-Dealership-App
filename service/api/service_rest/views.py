from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Technician, AutomobileVO, ServiceAppointment
from django.http import JsonResponse



class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        'vin',
        'import_href',
    ]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        'name',
        'employee_number',
        'id',
    ]

class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        'name',
        'date',
        'time',
        'reason',
        'technician',
        'vin'
    ]
    encoders={
        'technician': TechnicianListEncoder(),
        'vin': AutomobileVOEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == 'GET':
        technicians = Technician.objects.all()
        return JsonResponse(
            {'technicians': technicians},
            encoder = TechnicianListEncoder
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianListEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_list_appointment(request):
    if request.method == 'GET':
        appointments = ServiceAppointment.objects.all()
        return JsonResponse(
            {'appointments': appointments},
            encoder = ServiceAppointmentEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            vin = AutomobileVO.objects.get(vin=content['vin'])
            content['vin'] = vin
            technician = Technician.objects.get(employee_number=content['technician'])
            content['technician'] = technician
            appointment = ServiceAppointment.objects.create(**content)
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": 'Invalid vin Id'},
                 status=400,
            )
        return JsonResponse(
                appointment,
                encoder=ServiceAppointmentEncoder,
                safe=False,
            )
