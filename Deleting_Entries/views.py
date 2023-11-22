from django.shortcuts import render

# Create your views here.
def delEntriesView(request):
    templates_name = "Deleting_Entries.html"
    context = {
        'title':'dellllllllllllllllllllllll',
    }
    return render(request, templates_name, context)