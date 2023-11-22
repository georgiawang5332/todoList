from django.urls import path
from . import views

app_name = "problemSolve"

urlpatterns = [
    path("problemSolving/", views.problemSolvingView, name="problemSolving"),

]