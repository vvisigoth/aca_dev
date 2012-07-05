from datetime import date, timedelta 
from celery.task import Task, PeriodicTask 
from django.core.mail import send_mail, EmailMultiAlternatives
from answerbase.models import Question, UserProfile
from django.contrib.auth.models import User
from django.template.loader import get_template
from django.template import Context

#this can be fixed with env vars
try:
    from aca.local_settings import SITE_ROOT
    SITE_ROOT = 'http://localhost:8000'
except ImportError:
    from aca.settings import SITE_ROOT
    SITE_ROOT = 'http://www.abltnckbk.com'
"""
class TestTask(PeriodicTask):
    run_every = timedelta(seconds=60)

    def run(self, **kwargs):
        logger = self.get_logger(**kwargs)
        logger.info("Running Test Task")
        return True
"""
class NewQuestionEmailTask(Task):
    """
    notify admin that a user has asked a question
    """
    def run(self, username, **kwargs):
        logger = self.get_logger(**kwargs)
        logger.info("Notifying admin that %s aksed a question" % username)
        send_mail('A user, named %s, just asked a question' % username, 'This is a test message.', 'anthonyarr@gmail.com', ['anthonyarr@gmail.com'], fail_silently=True)
        return True

class NewAnswerEmailTask(Task):
    """
    emails followers of a question that a new answer has been added
    """

    def run(self, q_id, **kwargs):
        #Question
        q = Question.objects.get(pk=q_id)
        url = SITE_ROOT + q.get_absolute_url()
        #set up logging
        logger = self.get_logger(**kwargs)
        logger.info("Notifying followers that question %s has a new answer" % q.question)
        # list of recipient information
        f = q.followers.split(',')
        followers = [ User.objects.get(pk=int(x)) for x in f if x != u'']
        followers = [ (x.username, x.email) for x in followers ]
        textemail = get_template('newansweremail.txt')
        question =  q.question
        d = Context({ 'url': url, 'question': question })
        logger.info(followers)
        for i in followers:
            try:
                subject, from_email, to = 'Hey, %s, a question you followed has a new answer!' % i[0], 'anthony@abltnckbk.com', [i[1]]
                text_content = textemail.render(d)
                msg = EmailMultiAlternatives(subject, text_content, from_email, to, headers={ 'Reply-To': 'anthony@abltnckbk.com'})
                msg.send()
            except:
                logger.info("%s doesn't have a valid email!" % i[0])
        return True
