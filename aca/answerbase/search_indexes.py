import datetime
from haystack.indexes import *
from haystack import site, indexes
from answerbase.models import Question, Answer

class QuestionIndex(SearchIndex):
    text = CharField(document=True, use_template=True)
    explanation = CharField(model_attr='explanation')
    askedOn = DateTimeField(model_attr='askedOn')
    content_auto= indexes.EdgeNgramField(model_attr='question')

    def index_queryset(self):
        """Used when the entire index for model is updated"""
        return Question.objects.filter(askedOn__lte=datetime.datetime.now())

class AnswerIndex(SearchIndex):
    text = CharField(document=True, use_template=True)
    answeredOn = DateTimeField(model_attr='answeredOn')
    content_auto= indexes.EdgeNgramField(model_attr='answer')

    def index_queryset(self):
        return Answer.objects.filter(answeredOn__lte=datetime.datetime.now())

site.register(Question, QuestionIndex)
site.register(Answer, AnswerIndex)
