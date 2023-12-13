from django.shortcuts import render

# Create your views here.
def DragToReorderView(request):
    templates_name = "Drag_to_Reorder.html"
    context = {
        'title':'Drag to Reorderrrrrrrrrrrrrrrrr',
    }
    return render(request, templates_name, context)