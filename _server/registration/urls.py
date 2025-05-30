from django.urls import path
from . import views

urlpatterns = [
    path('instructor_sign_in/', views.instructor_sign_in),
    path('instructor_sign_up/', views.instructor_sign_up),
    path('instructor_verification/<int:user_id>/', views.instructor_verification, name='instructor_verification'),
    path('student_sign_in/', views.student_sign_in),
    path('student_sign_up/', views.student_sign_up),
    path('student_verification/<int:user_id>/', views.student_verification, name='student_verification'),
    path('logout/', views.logout_view),
]