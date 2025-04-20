from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.http import JsonResponse
from django.urls import reverse
from core.models import Instructor, Student, Course, Calculator
import random

# Create your views here.
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

def instructor_sign_in(req):
    if req.method == "POST":
        user = authenticate(req, username=req.POST.get("email"), password=req.POST.get("password"))
        if user is not None and hasattr(user, 'instructor'):
            if not user.instructor.is_verified:
                return redirect(reverse("instructor_verification", args=[user.id]))
            login(req, user)
            return redirect("/")

        return render(req, "registration/instructor_sign_in.html", {"error": "Invalid email or password.",
                                                                    "email": req.POST.get("email"),
                                                                    })
    else:
        return render(req, "registration/instructor_sign_in.html")

def logout_view(request):
    logout(request)
    return JsonResponse({"success": True })