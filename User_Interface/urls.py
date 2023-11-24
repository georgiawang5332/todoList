from django.urls import path
from . import views

app_name = "interface"

urlpatterns = [
    path("userInterface/", views.UserInterfaceView, name="userInterface"),

]