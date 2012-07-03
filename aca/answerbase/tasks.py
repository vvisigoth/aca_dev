from datetime import date, timedelta
from celery.task import Task, PeriodicTask
from answerbase.models import Question

"""
class TestTask(PeriodicTask):
    run_every = timedelta(seconds=60)

    def run(self, **kwargs):
        logger = self.get_logger(**kwargs)
        logger.info("Running Test Task")
        return True
"""
