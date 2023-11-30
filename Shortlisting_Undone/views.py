from django.shortcuts import render

# Create your views here.
def ShortlistingUndoneView(request):
    templates_name = "Shortlisting_Undone.html"
    context = {
        'title':'User Shortlisting Undoneeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    }
    return render(request, templates_name, context)