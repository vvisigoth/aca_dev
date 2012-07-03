from django.db import models
from django.contrib.auth.models import User
from django.contrib import admin
from django.db.models.signals import post_save
from django.core.mail import send_mail

# Create your models here.
#Just for testing the post form

class Post(models.Model):
    post = models.CharField(max_length=200)

class Question(models.Model):
    #askedBy = models.CharField(max_length=200)
    askedBy = models.ForeignKey(User, blank=True, null=True)
    askedOn = models.DateTimeField(auto_now=True)
    question = models.CharField(max_length=1000)
    explanation = models.CharField(max_length=1000)
    votes = models.IntegerField(default=0)
    followers = models.CharField(max_length=1000)
    def __unicode__(self):
        return self.question
    def get_absolute_url(self):
        return "/question/%i" % self.id

class Answer(models.Model):
    question = models.ForeignKey(Question)
    #answeredBy = models.CharField(max_length=200)
    answeredBy = models.ForeignKey(User, blank=True, null=True)
    answeredOn = models.DateTimeField(auto_now=True)
    answer = models.CharField(max_length=1000)
    votes = models.IntegerField(default=0)
    #to keep track of Users that have voted
    voted = models.CharField(max_length=1000)

    def __unicode__(self):
        return self.answer

    def get_absolute_url(self):
        return "/question/%i" % self.question.id

    def voteup(self):
        a = self
        a.votes += 1
        a.save()
        try:
            p = UserProfile.objects.get(user = self.answeredBy)
            p.rep += 1
            p.save()
            return "votes", a.votes, " user", p, " rep", p.rep
        except:
            return "NOBODY"

    def votedown(self):
        a = self
        a.votes -= 1
        a.save()
        try:
            p = UserProfile.objects.get(user = self.answeredBy)
            p.rep -= 1
            p.save()
            return "votes", a.votes, " user", p, " rep", p.rep
        except:
            return "NOBODY"

class UserProfile(models.Model):
    created = models.DateField(auto_now=True)
    user=models.ForeignKey(User, unique=True)
    bio=models.CharField(max_length=500)
    playlist=models.CharField(max_length=500)
    votesCast=models.IntegerField(default=0)
    ups=models.IntegerField(default=0)
    downs=models.IntegerField(default=0)
    rep=models.IntegerField(default=10)
    followers=models.CommaSeparatedIntegerField(max_length=500)
    questionsFollowing=models.CommaSeparatedIntegerField(max_length=500)
    usersFollowing=models.CommaSeparatedIntegerField(max_length=500)
        
    def __unicode__ (self):
        return unicode(self.user)

def create_user_profile(sender, **kwargs):
    u=kwargs["instance"]
    if not UserProfile.objects.filter(user=u):
        UserProfile(user=u).save()
    #TODO queue this shizz, so that it doesn't hang when making a new user
    send_mail('A user, named %s, just registered' % u.username, 'This is a test message.', 'anthonyarr@gmail.com', ['anthonyarr@gmail.com'], fail_silently=True)


post_save.connect(create_user_profile, sender=User)


    


