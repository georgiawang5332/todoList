from django.shortcuts import render


# Create your views here.
def uuidView(request):
    templates_name = "UUID.html"
    context = {
        'title': 'UUIDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
    }
    return render(request, templates_name, context)
