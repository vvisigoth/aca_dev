from django.db import models

# Create your models here.
class Question(models.Model):
    askedBy = models.CharField(max_length=200)
    askedOn = models.DateField(auto_now=True)
    question = models.CharField(max_length=1000)
    explanation = models.CharField(max_length=1000)
    votes = models.IntegerField()
    followers = models.CharField(max_length=1000)
    def __unicode__(self):
        return self.question

class Answer(models.Model):
    question = models.ForeignKey(Question)
    answeredBy = models.CharField(max_length=200)
    answeredOn = models.DateField(auto_now=True)
    answer = models.CharField(max_length=1000)
    votes = models.IntegerField()
    def __unicode__(self):
        return self.answer


