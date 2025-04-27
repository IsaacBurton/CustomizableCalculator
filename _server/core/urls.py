from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('courses/', view=views.courses, name="courses"),
    path('courses/<int:course_id>/', view=views.course, name="course"),
    path('courses/delete/', view=views.delete_course, name="delete_course"),
    path('functions/<int:course_id>/', view=views.functions, name="functions"),
]