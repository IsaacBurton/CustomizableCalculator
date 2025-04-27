import { Link } from "react-router";
import { useFunctions } from "../hooks/useFunctions";

export function Course({ course }) {
  const [functions] = useFunctions(course.id);

  if (!functions) {
    return <div>Loading...</div>;
  }

  const firstFiveEnabled = Object.entries(functions).filter(([name, isEnabled]) => isEnabled).slice(0, 5);

  return (
    <div className="course-card">
      <h3>
        <Link to={`/courses/${course.id}`}>{course.code}- {course.name}</Link>
      </h3>
      <div>Allowed functions:{' '}
        {firstFiveEnabled.map(([name], index) => (
          <span key={name}>
            {name}
            {index < 4 ? ', ' : '...'}
          </span>
        ))}
      </div>
    </div>
  );
}