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
        'vip',
        'id',
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
        'vin',
        'id',
        'completed',
        'vip',
    ]
    encoders={
        'technician': TechnicianListEncoder(),
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

@require_http_methods(["DELETE"])
def api_detail_technician(request, pk):
    if request.method == 'DELETE':
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})




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
        if AutomobileVO.objects.filter(vin=content['vin']).exists():
            content['vip'] = True
        content['vip'] = False
        try:
            technician = Technician.objects.get(name=content['technician'])
            content['technician'] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": 'Invalid Technician Person'},
                 status=400,
            )
        appointment = ServiceAppointment.objects.create(**content)
        return JsonResponse(
                appointment,
                encoder=ServiceAppointmentEncoder,
                safe=False,
            )

@require_http_methods(["DELETE", "PUT", "GET"])
def api_appointment_delete(request, pk):
    if request.method == "GET":
        appointment = ServiceAppointment.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=ServiceAppointmentEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = ServiceAppointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        ServiceAppointment.objects.filter(id=pk).update(**content)
        appointment = ServiceAppointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=ServiceAppointmentEncoder,
            safe=False,
        )
