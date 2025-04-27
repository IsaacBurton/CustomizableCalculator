from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from .models import Course, Calculator
from django.http import JsonResponse
from django.forms.models import model_to_dict

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

@login_required
def courses(req):
    if req.method == "POST":
        body = json.loads(req.body)
        course = Course.objects.create(
            name=body["name"],
            code=body["code"],
            instructor=req.user.instructor,
        )

        Calculator.objects.create(
            course=course,
            allowed_functions={
                "addition": True,
                "subtraction": True,
                "multiplication": True,
                "division": True,
                "exponentiation": True,
                "sqrt": True,
                "cbrt": True,
                "log10": True,
                "ln": True,
                "sin": True,
                "cos": True,
                "tan": True,
                "arcsin": True,
                "arccos": True,
                "arctan": True,
                "factorial": True
            }
        )
        
        return JsonResponse({"course": model_to_dict(course)})

    courses = req.user.instructor.course_set.all()
    return JsonResponse({"courses": [model_to_dict(course) for course in courses]})

@login_required
def course(req, course_id):
    try:
        course = req.user.instructor.course_set.get(id=course_id)
    except Course.DoesNotExist:
        return JsonResponse({"error": "You do not have access to this course."}, status=403)

    return JsonResponse({"course": model_to_dict(course)})

@login_required
def delete_course(req):
    body = json.loads(req.body)
    course_id = body.get("id")

    if not course_id:
        return JsonResponse({"error": "Missing course ID"}, status=400)

    try:
        # Fetch the Instructor instance for the logged-in user
        instructor = req.user.instructor

        # Query the course by id and ensure the instructor is the logged-in user's instructor
        course = Course.objects.get(id=course_id, instructor=instructor)
        
        # Delete the course
        course.delete()
        return JsonResponse({"message": "Course deleted successfully."})
    
    except Course.DoesNotExist:
        return JsonResponse({"error": "Course not found or you are not authorized to delete it."}, status=404)