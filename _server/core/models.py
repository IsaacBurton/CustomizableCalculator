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

    # allow_addition = models.BooleanField(default=True)
    # allow_subtraction = models.BooleanField(default=True)
    # allow_multiplication = models.BooleanField(default=True)
    # allow_division = models.BooleanField(default=True)
    # allow_exponentiation = models.BooleanField(default=True)
    # allow_sqrt = models.BooleanField(default=True)
    # allow_cbrt = models.BooleanField(default=True)
    # allow_log10 = models.BooleanField(default=True)
    # allow_ln = models.BooleanField(default=True)
    # allow_sin = models.BooleanField(default=True)
    # allow_cos = models.BooleanField(default=True)
    # allow_tan = models.BooleanField(default=True)
    # allow_arcsin = models.BooleanField(default=True)
    # allow_arccos = models.BooleanField(default=True)
    # allow_arctan = models.BooleanField(default=True)
    # allow_factorial = models.BooleanField(default=True)

    def __str__(self):
        return f"Calculator for {self.course.name}"