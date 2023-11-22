from django.urls import path
from . import views

app_name = "cate"

urlpatterns = [
    path("cateGory/", views.cateGoryView, name="category"),

]