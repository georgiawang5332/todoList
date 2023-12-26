from django.urls import path
from . import views

app_name = "paginArrSlice"

urlpatterns = [
    path("paginArraySlice/", views.PaginationArraySliceView, name="paginArraySlice"),
]