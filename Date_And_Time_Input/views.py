from django.shortcuts import render


# Create your views here.
def DateAndTimeInputView(request):
    templates_name = "Date_And_Time_Input.html"
    context = {
        'title': 'Date And Time Inputtttttttttttttttttttttttttttt',
    }
    return render(request, templates_name, context)
