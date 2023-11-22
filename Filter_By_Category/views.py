from django.shortcuts import render

# Create your views here.
def filterCategoryView(request):
    templates_name = "Filter_By_Category.html"
    context = {
        'title':'Filter_By_Cccccccccccccccc',
    }
    return render(request, templates_name, context)