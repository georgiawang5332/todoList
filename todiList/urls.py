"""todiList URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings  # add this
from django.conf.urls.static import static  # add this

urlpatterns = [
    path('', include('todoDashboard.urls')),
    path('Adding_Entries/', include('Adding_Entries.urls')),
    path('Deleting_Entries/', include('Deleting_Entries.urls')),
    path('Done_Marking/', include('Done_Marking.urls')),
    path('Category/', include('Category.urls')),
    path('Filter_By_Category/', include('Filter_By_Category.urls')),
    path('Auto_Update_Options/', include('Auto_Update_Options.urls')),
    path('localStorage/', include('localStorage.urls')),
    path('Object/', include('Object.urls')),
    path('Identifying_Data/', include('Identifying_Data.urls')),
    path('UUID/', include('UUID.urls')),
    path('Date_And_Time_Input/', include('Date_And_Time_Input.urls')),
    path('Sorting/', include('Sorting.urls')),
    path('Problem_Solving/', include('Problem_Solving.urls')),
    path('FullCalendar/', include('FullCalendar.urls')),
    path('User_Interface/', include('User_Interface.urls')),
    path('Shortlisting_Undone/', include('Shortlisting_Undone.urls')),



    path('admin/', admin.site.urls),
]
if settings.DEBUG:  # add this
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
