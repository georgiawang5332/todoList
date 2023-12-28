from django.urls import path
from . import views

app_name = "eventTimeOfFullCalendar"

urlpatterns = [
    path("eventTimeFullCalendar/", views.EventTimeFullCalendarView, name="eventTimeFullCalendar"),
]