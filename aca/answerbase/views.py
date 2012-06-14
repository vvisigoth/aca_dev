from django.shortcuts import render_to_response
from answerbase.models import Question

# Create your views here.
def index(request):
    question_list = Question.objects.all()
    return render_to_response('answerbase/index.html', {'question_list' : question_list})
