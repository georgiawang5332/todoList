from django.urls import path
from . import views

app_name = "done"

urlpatterns = [
    path("doneMarking/", views.doneMarkingView, name="doneMarking"),

]