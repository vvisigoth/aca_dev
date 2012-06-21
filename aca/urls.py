from django.conf.urls.defaults import patterns, include, url
from django.http import HttpResponseRedirect
from django.conf import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'answerbase.views.index'),
    url(r'^questions/$', 'answerbase.views.index'),
    url(r'^newquestion/$', 'answerbase.views.newquestion'),
    url(r'^question/(?P<q_id>\d+)', 'answerbase.views.question'),
    url(r'^question/newanswersubmit/(?P<q_id>\d+)', 'answerbase.views.newanswersubmit'),
    url(r'^newquestion/newquestionsubmit', 'answerbase.views.newquestionsubmit'),
    url(r'^accounts/', include('registration.urls')),
    url(r'^post/$', 'answerbase.views.post'),
    url(r'^post/post_submit', 'answerbase.views.post_submit'),
    url(r'^accounts/profile', lambda x: HttpResponseRedirect('/questions/')),
    url(r'^search/', include('haystack.urls')),
    url(r'^autocomplete/', 'answerbase.views.autocomplete'),
    url(r'^searchjson/', 'answerbase.views.searchjson'),
    url(r'^vote/$', 'answerbase.views.vote'),
    url(r'^vote/votesubmit', 'answerbase.views.votesubmit'),
    # url(r'^$', 'aca.views.home', name='home'),
    # url(r'^aca/', include('aca.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)

if settings.DEBUG:
    urlpatterns += patterns('', 
        (r'^media/(?P<path>.*)', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}))
