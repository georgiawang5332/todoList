from django.urls import path
from . import views

app_name = "pStart"

urlpatterns = [
    path("padStart/", views.PadStartView, name="padStart"),
]