from django.urls import path
from . import views

app_name = "local"

urlpatterns = [
    path("localStorage/", views.localStorageView, name="localStorage"),

]