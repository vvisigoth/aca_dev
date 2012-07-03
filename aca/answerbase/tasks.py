from datetime import date, timedelta 
from celery.task import Task, PeriodicTask 
from django.core.mail import send_mail
from answerbase.models import Question, UserProfile
from django.contrib.auth.models import User

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
        q = Question.objects.get(pk=q_id)
        logger = self.get_logger(**kwargs)
        logger.info("Notifying followers that question %s has a new answer" % q.question)
        f = q.followers.split(',')
        f_emails = [ User.objects.get(pk=int(x)).email for x in f if x != u'']
        logger.info(f_emails)
        if f_emails:
           send_mail('A question you followed has a new answer! Huzzah!', 'Hello there! You wanted to be notified when the question %s had an answer, right? Well, youre in luck! Follow the link here to check it out! http://www.abltnckbk.com%s' % (q.question, q.get_absolute_url()), 'anthonyarr@gmail.com', f_emails, fail_silently=True)
        return True
