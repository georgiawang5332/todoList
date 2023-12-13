from django.urls import path
from . import views

app_name = "editEntry"

urlpatterns = [
    path("editEntries/", views.EditEntriesView, name="editEntries"),

]