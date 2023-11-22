from django.urls import path
from . import views

app_name = "auto"

urlpatterns = [
    path("autoUO/", views.autoUOView, name="autoUO"),

]