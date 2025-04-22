from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('courses/', view=views.courses, name="courses"),
]