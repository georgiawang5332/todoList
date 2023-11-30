from django.shortcuts import render

# Create your views here.
def UserInterfaceView(request):
    templates_name = "User_Interface.html"
    context = {
        'title':'User Interfaceeeeeeeeeeeeeeeeeeeeee',
    }
    return render(request, templates_name, context)