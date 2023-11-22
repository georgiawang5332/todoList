from django.urls import path
from . import views

app_name = "FCategory"

urlpatterns = [
    path("filterCategory/", views.filterCategoryView, name="filterCategory"),

]