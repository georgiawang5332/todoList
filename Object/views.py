from django.shortcuts import render


# Create your views here.
def objectView(request):
    templates_name = "Object.html"
    context = {
        'title': 'objecttttttttttttttttttttttttttttttttttttttt',
    }
    return render(request, templates_name, context)
