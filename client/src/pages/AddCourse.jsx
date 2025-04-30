import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useCourses } from "../hooks/useCourses";

export function AddCourse() {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseCodeError, setCourseCodeError] = useState("");
  const [courseNameError, setCourseNameError] = useState("");
  const navigate = useNavigate();
  const courses = useCourses();

  async function handleSubmit(e) {
    e.preventDefault();
    const makeRequest = useFetch();

    setCourseCodeError("");
    setCourseNameError("");
      
    if (courses.some(course => course.code === courseCode)) {
      setCourseCodeError("Course code already exists");
      return;
    }

    if (courses.some(course => course.name === courseName)) {
      setCourseNameError("Course name already exists");
      return;
    }

    const response = await makeRequest("/courses/", "POST", {
      code: courseCode,
      name: courseName,
    });      

    if (response.ok) {
      navigate("/courses");
    } else {
      // handle error
    }
  }

  return (
    <div className="container">
      <h2>Create a New Course</h2>
      <div className="course-links">
        <Link to="/courses">Home Page</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label>
            <div>Course Code:</div>
            <input
              type="text"
              id="courseCode"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              required
            />
          </label>
          {courseCodeError && <p style={{ color: "red" }}>{courseCodeError}</p>}
        </div>
        <div className="input-field">
          <label>
          <div>Course Name:</div>
            <input
              type="text"
              id="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
          </label>
          {courseNameError && <p style={{ color: "red" }}>{courseNameError}</p>}
        </div>
        <div className="add-course">
          <button>Add Course</button>
        </div>
      </form>
    </div>
  );
}