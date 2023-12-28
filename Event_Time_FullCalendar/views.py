from django.shortcuts import render

# Create your views here.
def EventTimeFullCalendarView(request):
    templates_name = "Event_Time_FullCalendar.html"
    context = {
        'title':'Event Time of FullCalendar',
    }
    return render(request, templates_name, context)