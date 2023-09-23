from django.urls import path
from . import views

# URLConf
urlpatterns = [
    path('hello/', views.say_hello),
    path('api/check-username/', views.check_username, name='check_username'),
]