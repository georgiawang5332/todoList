from django.urls import path
from . import views

app_name = "dateInput"

urlpatterns = [
    path("DateAndTimeInput/", views.DateAndTimeInputView, name="DateAndTimeInput"),

]