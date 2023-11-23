from django.shortcuts import render

# Create your views here.
def FullCalendarView(request):
    templates_name = "FullCalendar.html"
    context = {
        'title':'FullCalendarrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
    }
    return render(request, templates_name, context)