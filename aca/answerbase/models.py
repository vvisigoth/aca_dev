from django.db import models
from django.contrib.auth.models import User
from django.contrib import admin
from django.db.models.signals import post_save

# Create your models here.
class Question(models.Model):
    #askedBy = models.CharField(max_length=200)
    askedBy = models.ForeignKey(User, blank=True, null=True)
    askedOn = models.DateField(auto_now=True)
    question = models.CharField(max_length=1000)
    explanation = models.CharField(max_length=1000)
    votes = models.IntegerField()
    followers = models.CharField(max_length=1000)
    def __unicode__(self):
        return self.question

class Answer(models.Model):
    question = models.ForeignKey(Question)
    #answeredBy = models.CharField(max_length=200)
    answeredBy = models.ForeignKey(User, blank=True, null=True)
    answeredOn = models.DateField(auto_now=True)
    answer = models.CharField(max_length=1000)
    votes = models.IntegerField()
    def __unicode__(self):
        return self.answer

class UserProfile(models.Model):
    created = models.DateField(auto_now=True)
    user=models.ForeignKey(User, unique=True)
    bio=models.CharField(max_length=500)
    playlist=models.CharField(max_length=500)
    #votesCast=models.IntegerField()
    #ups=models.IntegerField()
    #downs=models.IntegerField()
    #rep=models.IntegerField()
    followers=models.CommaSeparatedIntegerField(max_length=500)
    questionsFollowing=models.CommaSeparatedIntegerField(max_length=500)
    usersFollowing=models.CommaSeparatedIntegerField(max_length=500)
    
    def __unicode__ (self):
        return unicode(self.user)

def create_user_profile(sender, **kwargs):
    u=kwargs["instance"]
    if not UserProfile.objects.filter(user=u):
        UserProfile(user=u).save()

post_save.connect(create_user_profile, sender=User)


    


