import { Link } from "react-router";

export function Course({ course }) {
  return (
    <div className="course-card">
      <h3>
        <Link to={`/courses/${course.id}`}>{course.code}- {course.name}</Link>
      </h3>
      <p>Allowed functions: {course.allowed_functions ? Object.keys(course.allowed_functions).filter(key => course.allowed_functions[key]).join(", ") : "None"}</p>
    </div>
  );
}