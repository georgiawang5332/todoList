from django.shortcuts import render

# Create your views here.
def DragEventFullCaleView(request):
    templates_name = "Drag_Event_of_FullCale.html"
    context = {
        'title':'Drag Event of FullCaleeeeeeeee',
    }
    return render(request, templates_name, context)