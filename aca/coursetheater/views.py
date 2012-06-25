# Create your views here.
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponse, HttpResponseRedirect

def index(request):
    return render_to_response('coursetheater/coursetheater.html', context_instance=RequestContext(request))
