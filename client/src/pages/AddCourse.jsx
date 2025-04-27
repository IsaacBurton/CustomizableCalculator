import { Link, useNavigate } from "react-router";
import { useState } from "react";
import cookies from "js-cookie";
import { useFetch } from "../hooks/useFetch";
import { useCourses } from "../hooks/useCourses";

export function AddCourse(props) {
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
        navigate("/");
      } else {
        // handle error
      }
    }

    return (
      <div>
        <Link to="/">Courses</Link>
        <h2>Welcome, Instructor!</h2>
        <p>This is your Add Course page.</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Course Code:
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
          <div>
            <label>
              Course Name:
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
          <button type="submit">Add Course</button>
        </form>
      </div>
    );
  }