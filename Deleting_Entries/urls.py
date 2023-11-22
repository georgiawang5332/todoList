from django.urls import path
from . import views

app_name = "del"

urlpatterns = [
    path("delEntries/", views.delEntriesView, name="delEntries"),

]