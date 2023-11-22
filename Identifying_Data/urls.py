from django.urls import path
from . import views

app_name = "identData"

urlpatterns = [
    path("identifyingData/", views.identifyingDataView, name="identifyingData"),

]