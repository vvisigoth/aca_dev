
from django.contrib.auth.models import User
from answerbase.models import Question, Answer, UserProfile
from django.contrib.syndication.views import FeedDoesNotExist, Feed
from django.shortcuts import get_object_or_404


class UserFeed(Feed):
    description_template = 'feeds/user_description.html'

    def get_object(self, request, user_id):
        return get_object_or_404(User, pk=user_id)

    def title(self, obj):
        return "Feed for %s" % obj.username

    def link(self, obj):
        return obj.get_absolute_url()

    def description(self, obj):
        return "Recent activity in %s's feed" % obj.username

    #maybe try to do this with feeds
    def items(self, obj):
        q_following = [Question.objects.get(pk= str(x)) for x in  
