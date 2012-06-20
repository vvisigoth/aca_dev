from django.shortcuts import render_to_response
from answerbase.models import Question, Post, Answer
from django.contrib.auth.models import User
from django.template import RequestContext
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.utils import simplejson
from haystack.query import SearchQuerySet

# Create your views here.
def index(request):
    user = request.user
    question_list = Question.objects.all()
    return render_to_response('answerbase/answerbaseindex.html', {'user': user, 'question_list': question_list })

def newquestion(request):
    user = request.user
    return render_to_response('answerbase/newquestion.html', {'user':user}, context_instance=RequestContext(request))

def newquestionsubmit(request):
    askedBy = User.objects.get(pk=request.user.id)
    p = Question(question = request.POST['questionTitle'], explanation = request.POST['questionBody'], askedBy = askedBy)
    p.save()
    return HttpResponseRedirect(reverse('answerbase.views.index'))

def question(request, q_id):
    question = Question.objects.get(id=q_id)
    answers = question.answer_set.all().order_by('-votes')
    user = request.user
    return render_to_response('answerbase/question.html', {'question':question, 'answers': answers}, context_instance=RequestContext(request))

def newanswersubmit(request, q_id):
    answeredBy = User.objects.get(pk=request.user.id)
    p = request.POST['newanswer']
    a = Answer(question = Question.objects.get(pk=q_id), answer = p, answeredBy = answeredBy)
    a.save()
    return HttpResponseRedirect(reverse('answerbase.views.question', args = q_id))

def autocomplete(request):
    results = []
    if request.method == "GET":
        if request.GET.has_key(u'term'):
            value = request.GET[u'term']
            if len(value) > 2:
                model_results =SearchQuerySet().autocomplete(content_auto=value)
            #results = [ { 'label': str(x.object.__unicode__()), 'value': x.object.get_absolute_url() } for x in model_results ]
                results = [ str(x.object.__unicode__()) for x in model_results ]
    json = simplejson.dumps(results)
    return HttpResponse(json, mimetype='application/json')


def searchjson(request):
    results = []
    if request.method == "GET":
        if request.GET.has_key(u'q'):
            value = request.GET[u'q']
            if len(value) > 2:
                ## Could probably just use the non-autocomplete, because this might return too many results
                model_results =SearchQuerySet().autocomplete(content_auto=value)
            ##Heres where you define the format of JSON
                results = [ { 'title': str(x.object.__unicode__()), 'url': x.object.get_absolute_url() } for x in model_results ]
    json = simplejson.dumps(results)
    return HttpResponse(json, mimetype='application/json')


def post(request):
    posts = Post.objects.all() 
    return render_to_response('answerbase/post.html', {'posts': posts}, context_instance=RequestContext(request))

def post_submit(request):
    p = Post(post = request.POST['post'])
    p.save()
    return HttpResponseRedirect(reverse('answerbase.views.post'))

#VOTES

def q_voteup(pk, author):
    q = Question.objects.get(pk=pk)
    q.votes += 1
    q.save()
    return 


def q_votedown(pk, author):
    q = Question.objects.get(pk=pk)
    q.votes -= 1
    q.save()
    return 

def a_voteup(pk, author):
    a = Answer.objects.get(pk=pk)
    a.votes += 1
    a.save()
    return 


def a_votedown(pk, author):
    a = Answer.objects.get(pk=pk)
    a.votes -= 1
    a.save()
    return 
