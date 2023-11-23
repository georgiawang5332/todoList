from django.urls import path
from . import views

app_name = "cale"

urlpatterns = [
    path("calendar/", views.FullCalendarView, name="calendar"),

]