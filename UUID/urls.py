from django.urls import path
from . import views

app_name = "uuid"

urlpatterns = [
    path("uuid/", views.uuidView, name="uuidPage"),

]