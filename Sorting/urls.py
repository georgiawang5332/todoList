from django.urls import path
from . import views

app_name = "sort"

urlpatterns = [
    path("sorting/", views.SortingView, name="Sorting"),

]