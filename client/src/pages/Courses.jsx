import { Link } from "react-router";
import { useCourses } from "../hooks/useCourses";
import { Course } from "../components/Course";

export function Courses() {
  const courses = useCourses();

  return (
    <div className="container">
      <h2>Welcome, Instructor!</h2>
      <div className="course-links">
        <Link to="/add-course">Add Course</Link>
      </div>
      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <div className="course-list">
          {courses.map(course => (
            <Course key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
