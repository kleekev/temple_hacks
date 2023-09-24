from django.urls import path
from .views import RequestView, CreateRoomView, GetRequest, GetAll, deleteAll

urlpatterns = [
    path('all', RequestView.as_view()),
    path('create', CreateRoomView.as_view()),
    path('get', GetRequest.as_view()),
    path('getAll', GetAll.as_view()),
    path('delete', deleteAll.as_view()),

]