from django.db import models
from django.contrib.auth.models import User

class Instructor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    instructor_code = models.CharField(max_length=10, unique=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"Instructor: {self.user.first_name} {self.user.last_name}"
    
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    student_id = models.CharField(max_length=10, unique=True)
    courses = models.ManyToManyField('Course', related_name='students')

    def __str__(self):
        return f"Student: {self.user.first_name} {self.user.last_name}"
    
class Course(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)

    def __str__(self):
        return f"Course: {self.code}"
    
class Calculator(models.Model):
    course = models.OneToOneField(Course, on_delete=models.CASCADE)
    allowed_functions = models.JSONField(default=dict)

    def __str__(self):
        return f"Calculator for {self.course.name}"