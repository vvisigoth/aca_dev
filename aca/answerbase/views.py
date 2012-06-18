from django.shortcuts import render_to_response
from answerbase.models import Question, Post
from django.template import RequestContext
from django.http import HttpResponseRedirect, HttpResponse

# Create your views here.
def index(request):
    question_list = Question.objects.all()
    return render_to_response('answerbase/index.html', {'question_list' : question_list})

def post(request):
    posts = Post.objects.all() 
    return render_to_response('answerbase/post.html', {'posts': posts},context_instance=RequestContext(request))

def post_submit(request):
    p = Post(post = request.POST['post'])
    p.save()
    return HttpResponseRedirect('/post')
