from django.shortcuts import render

# Create your views here.
def autoUOView(request):
    templates_name = "Auto_Update_Options.html"
    context = {
        'title':'autoUOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
    }
    return render(request, templates_name, context)