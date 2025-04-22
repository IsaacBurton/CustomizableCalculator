import { Link } from "react-router";
import { useCourses } from "../hooks/useCourses";
import { Course } from "../components/Course";

export function Courses() {
  const courses = useCourses();

  return (
    <div>
      <Link to="/add-course">Add Course</Link>
      <h2>Welcome, Instructor!</h2>
      <p>This is your Courses page.</p>
      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <div>
          {courses.map(course => (
            <Course key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
