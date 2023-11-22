from django.urls import path
from . import views

app_name = "obj"

urlpatterns = [
    path("object/", views.objectView, name="object"),

]