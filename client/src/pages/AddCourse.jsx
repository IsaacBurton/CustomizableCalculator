import { Link, useNavigate } from "react-router";
import { useState } from "react";
import cookies from "js-cookie";
import { useFetch } from "../hooks/useFetch";

export function AddCourse() {
    const [courseCode, setCourseCode] = useState("");
    const [courseName, setCourseName] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
      e.preventDefault();
      const makeRequest = useFetch();

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
          </div>
          <button type="submit">Add Course</button>
        </form>
      </div>
    );
  }