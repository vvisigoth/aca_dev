from datetime import date, timedelta
from celery.task import Task, PeriodicTask
from django.core.mail import send_mail
"""
class TestTask(PeriodicTask):
    run_every = timedelta(seconds=60)

    def run(self, **kwargs):
        logger = self.get_logger(**kwargs)
        logger.info("Running Test Task")
        return True
"""
class NotificationEmailTask(Task):
    """
    notify admin that a user has asked a question
    """
    def run(self, username, **kwargs):
        logger = self.get_logger(**kwargs)
        logger.info("Notifying admin that %s aksed a question" % username)
        send_mail('A user, named %s, just asked a question' % username, 'This is a test message.', 'anthonyarr@gmail.com', ['anthonyarr@gmail.com'], fail_silently=True)
        return True
