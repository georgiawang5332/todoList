from django.urls import path
from . import views

app_name = "dragReorder"

urlpatterns = [
    path("dragToReorder/", views.DragToReorderView, name="dragToReorder"),
]