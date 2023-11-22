from django.shortcuts import render


# Create your views here.
def SortingView(request):
    templates_name = "Problem_Solving.html"
    context = {
        'title': 'Problem Solvinggggggggggggggggggggggggggggggggggggggggggggg',
    }
    return render(request, templates_name, context)
