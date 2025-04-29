from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.http import JsonResponse
from django.urls import reverse
from core.models import Instructor, Student, Course, Calculator
import random

def instructor_sign_in(req):
    if req.method == "POST":
        user = authenticate(req, username=req.POST.get("email"), password=req.POST.get("password"))
        if user is not None and hasattr(user, 'instructor'):
            if not user.instructor.is_verified:
                return redirect(reverse("instructor_verification", args=[user.id]))
            login(req, user)
            response = redirect("/")
            response.set_cookie('user_type', 'instructor')
            return response

        return render(req, "registration/instructor_sign_in.html", {"error": "Invalid email or password.",
                                                                    "email": req.POST.get("email"),
                                                                    })
    else:
        return render(req, "registration/instructor_sign_in.html")

def instructor_sign_up(req):
    if req.method == "POST":
        username = req.POST.get("email")
        password = req.POST.get("password")
        email = req.POST.get("email")
        first_name = req.POST.get("first_name")
        last_name = req.POST.get("last_name")

        if User.objects.filter(email=email).exists():
            return render(req, "registration/instructor_sign_up.html", {"error": "Email already exists.",
                                                                        "first_name": first_name,
                                                                        "last_name": last_name,
                                                                        "email": email,
                                                                        "email_in_use": True
                                                                        })
        
        if len(password) < 8:
            return render(req, "registration/instructor_sign_up.html", {"error": "Password must be at least 8 characters long.",
                                                                        "first_name": first_name,
                                                                        "last_name": last_name,
                                                                        "email": email,
                                                                        "password_too_short": True
                                                                        })

        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name
        )

        Instructor.objects.create(
            user=user,
            instructor_code=str(random.randint(100000, 999999))
        )

        return redirect(reverse("instructor_verification", args=[user.id]))
    else:
        return render(req, "registration/instructor_sign_up.html")
    
def instructor_verification(req, user_id):
    if req.method == "POST":
        instructor_code = req.POST.get("verification_code")
        try:
            instructor = Instructor.objects.get(user_id=user_id)
        except Instructor.DoesNotExist:
            return render(req, "registration/instructor_sign_up.html", {"error": "Invalid instructor ID."})
        
        if instructor is not None and instructor.instructor_code == instructor_code:
            instructor.is_verified = True
            instructor.save()
            login(req, instructor.user)
            return redirect("/")
        else:
            return render(req, "registration/instructor_verification.html", {"error": "Invalid verification code.",
                                                                             "verification_code": instructor_code,
                                                                             "invalid_code": True,
                                                                             "user_id": user_id
                                                                             })
    else:
        return render(req, "registration/instructor_verification.html", {"user_id": user_id})

def student_sign_in(req):
    if req.method == "POST":
        user = authenticate(req, username=req.POST.get("student_id").lower(), password=req.POST.get("password"))
            
        if user is not None and hasattr(user, 'student'):
            course_id_cookie = req.COOKIES.get('course_id')
            if not user.student.courses.filter(id=course_id_cookie).exists():
                return render(req, "registration/student_sign_in.html", {"error": "You are not enrolled in this course.",
                                                                          "student_id": req.POST.get("student_id"),
                                                                          })
            
            if not user.student.is_verified:
                return redirect(reverse("student_verification", args=[user.id]))
            login(req, user)
            response = redirect("/")
            response.set_cookie('user_type', 'student')
            return response

        return render(req, "registration/student_sign_in.html", {"error": "Invalid Student ID or password.",
                                                                  "student_id": req.POST.get("student_id"),
                                                                  })
    else:
        courseCookie = req.COOKIES.get('course_id')
        if courseCookie is not None:
            return render(req, "registration/student_sign_in.html", {"error": "You do not have access to this course.",
                                                                     "course_id": courseCookie
                                                                     })
        else:
            course_id = req.GET.get('courseId')
            response = render(req, "registration/student_sign_in.html", {"course_id": course_id})
            if course_id:
                response.set_cookie('course_id', course_id)
            return response
    
def student_sign_up(req):
    if req.method == "POST":
        username = req.POST.get("student_id")
        password = req.POST.get("password")
        email = req.POST.get("email")
        first_name = req.POST.get("first_name")
        last_name = req.POST.get("last_name")

        if User.objects.filter(email=email).exists():
            return render(req, "registration/student_sign_up.html", {"error": "Email already exists.",
                                                                      "first_name": first_name,
                                                                      "last_name": last_name,
                                                                      "email": email,
                                                                      "student_id": username,
                                                                      "email_in_use": True
                                                                      })
        
        if User.objects.filter(username=username).exists():
            return render(req, "registration/student_sign_up.html", {"error": "Student ID already exists.",
                                                                      "first_name": first_name,
                                                                      "last_name": last_name,
                                                                      "email": email,
                                                                      "student_id": username,
                                                                      "student_id_in_use": True
                                                                      })
        
        if len(password) < 8:
            return render(req, "registration/student_sign_up.html", {"error": "Password must be at least 8 characters long.",
                                                                      "first_name": first_name,
                                                                      "last_name": last_name,
                                                                      "email": email,
                                                                      "student_id": username,
                                                                      "password_too_short": True
                                                                      })
        
        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name
        )

        student = Student.objects.create(
            user=user,
            student_code=str(random.randint(100000, 999999)),
            student_id=username
        )

        course_ids = req.POST.getlist("course_ids")
        student.courses.set(Course.objects.filter(id__in=course_ids))
        student.save()

        return redirect(reverse("student_verification", args=[user.id]))
    else:
        courses = Course.objects.all()
        return render(req, "registration/student_sign_up.html", {"courses": courses})
    
def student_verification(req, user_id):
    if req.method == "POST":
        student_code = req.POST.get("verification_code")
        try:
            student = Student.objects.get(user_id=user_id)
        except Student.DoesNotExist:
            return render(req, "registration/student_sign_up.html", {"error": "Invalid student ID."})
        
        if student is not None and student.student_code == student_code:
            student.is_verified = True
            student.save()
            login(req, student.user)
            return redirect("/")
        else:
            return render(req, "registration/student_verification.html", {"error": "Invalid verification code.",
                                                                          "verification_code": student_code,
                                                                          "invalid_code": True,
                                                                          "user_id": user_id
                                                                          })
    else:
        return render(req, "registration/student_verification.html", {"user_id": user_id})

def logout_view(request):
    logout(request)

    response = JsonResponse({"success": True})
    response.delete_cookie('user_type')
    response.delete_cookie('course_id')

    return response