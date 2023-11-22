from django.shortcuts import render


# Create your views here.
def problemSolvingView(request):
    templates_name = "Problem_Solving.html"
    context = {
        'title': 'Problem Solvinggggggggggggggggggggggggggggggggggg',
    }
    return render(request, templates_name, context)
