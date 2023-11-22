from django.shortcuts import render


# Create your views here.
def cateGoryView(request):
    templates_name = "Category.html"
    context = {
        'title': 'Cateeeeeeeeeeeeeeeeeeeeeeeeee',
    }
    return render(request, templates_name, context)
