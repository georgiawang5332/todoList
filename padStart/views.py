from django.shortcuts import render

# Create your views here.
def PadStartView(request):
    templates_name = "padStart.html"
    context = {
        'title':'padStartttttttttttttttttttttttt',
    }
    return render(request, templates_name, context)