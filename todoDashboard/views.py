from django.shortcuts import render

# Create your views here.
def DashboardView(request):
    templates_name = "dashboard.html"
    context = {
        'title':'dashboard 首頁',
    }
    return render(request, templates_name, context)