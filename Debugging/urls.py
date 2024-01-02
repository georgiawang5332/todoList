from django.urls import path
from . import views

app_name = "Debug"

urlpatterns = [
    path("debugging/", views.DebuggingView, name="debugging"),
]