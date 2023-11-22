from django.shortcuts import render

# Create your views here.
def localStorageView(request):
    templates_name = "localStorage.html"
    context = {
        'title':'localStorageeeeeeeeeeeeeeeeeee',
    }
    return render(request, templates_name, context)