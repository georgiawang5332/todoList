from django.shortcuts import render

# Create your views here.
def addingEntryView(request):
    templates_name = "Adding_Entries.html"
    context = {
        'title':'addddddddddddddddddddddddddddd',
    }
    return render(request, templates_name, context)