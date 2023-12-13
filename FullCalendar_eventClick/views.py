from django.shortcuts import render

# Create your views here.
def FuEventClickView(request):
    templates_name = "FullCalendar_eventClick.html"
    context = {
        'title':'FullCalendar eventClickkkkkkkkkkkkkkkkkkkkk',
    }
    return render(request, templates_name, context)