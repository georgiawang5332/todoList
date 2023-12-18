from django.shortcuts import render

# Create your views here.
def FixingSomeIssuesView(request):
    templates_name = "Fixing_some_issues.html"
    context = {
        'title':'Fixing some issuessssssssssssss',
    }
    return render(request, templates_name, context)