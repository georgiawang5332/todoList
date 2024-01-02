from django.shortcuts import render

# Create your views here.
def DebuggingView(request):
    templates_name = "Debugging.html"
    context = {
        'title':'Debuggingggggggggggg',
    }
    return render(request, templates_name, context)