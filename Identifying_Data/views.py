from django.shortcuts import render

# Create your views here.
def identifyingDataView(request):
    templates_name = "Identifying_Data.html"
    context = {
        'title':'Identi_Dataaaaaaaaaaaaaaaaaaaa',
    }
    return render(request, templates_name, context)