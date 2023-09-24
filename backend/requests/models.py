from django.db import models

# Create your models here.

class Requests(models.Model):
    username = models.CharField(max_length=250, unique=True)
    start_address = models.CharField(max_length=1000)
    end_address = models.CharField(max_length=1000)