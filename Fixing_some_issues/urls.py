from django.urls import path
from . import views

app_name = "fixingIssues"

urlpatterns = [
    path("fixingSomeIssues/", views.FixingSomeIssuesView, name="fixingSomeIssues"),
]