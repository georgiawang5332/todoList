from django.urls import path
from . import views

app_name = "dragEvent"

urlpatterns = [
    path("dragEventFull/", views.DragEventFullCaleView, name="dragEventFull"),
]