from datetime import date, timedelta
from celery.task import Task, PeriodicTask
from answerbase.models import Question

class HasAnswerTask(PeriodicTask):
    """
    Checks to see if there have been any new answers
    """

    run_every = timedelta(seconds=60)

    def run(self, **kwargs):
        logger = self.get_logger(**kwargs)
        logger.info("Running HasAnswerTask")
        for question in Question.objects.all():
            pass

        return True
