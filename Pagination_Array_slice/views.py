from django.shortcuts import render

# Create your views here.
def PaginationArraySliceView(request):
    templates_name = "Pagination_Array_slice.html"
    context = {
        'title':'Pagination Array Sliceeeeeeeeeeeeeeeeeeee',
    }
    return render(request, templates_name, context)