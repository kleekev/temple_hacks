from django.urls import path
from .views import RequestView, CreateRequestView, GetRequest, GetAll, deleteAll, ChangeAcceptedView

urlpatterns = [
    path('all', RequestView.as_view()),
    path('create', CreateRequestView.as_view()),
    path('get', GetRequest.as_view()),
    path('getAll', GetAll.as_view()),
    path('delete', deleteAll.as_view()),
    path('accept', ChangeAcceptedView.as_view())
]