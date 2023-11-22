from django.shortcuts import render

# Create your views here.
def doneMarkingView(request):
    templates_name = "Done_Marking.html"
    context = {
        'title':'doneeeeeeeeeeeeeeeeeeeeeeeee',
    }
    return render(request, templates_name, context)