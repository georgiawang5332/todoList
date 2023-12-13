from django.shortcuts import render

# Create your views here.
def EditEntriesView(request):
    templates_name = "Edit_Entries.html"
    context = {
        'title':'Edit Entriesssssssssssssssssssssssssssss',
    }
    return render(request, templates_name, context)