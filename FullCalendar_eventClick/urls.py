from django.urls import path
from . import views

app_name = "fuEventClk"

urlpatterns = [
    path("fuEventClick/", views.FuEventClickView, name="fuEventClick"),

]