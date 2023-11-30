from django.urls import path
from . import views

app_name = "undone"

urlpatterns = [
    path("shortlistingUndone/", views.ShortlistingUndoneView, name="shortlistingUndone"),

]