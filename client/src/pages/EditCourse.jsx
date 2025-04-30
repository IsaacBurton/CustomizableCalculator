import { useState } from "react";
import { Link, useLocation } from "react-router";
import { DeletePopup } from "../components/DeletePopup";
import { Calculator } from "../components/Calculator";
import { FunctionCheckbox } from "../components/FunctionCheckbox";
import { useCourse } from "../hooks/useCourse";
import { useFunctions } from "../hooks/useFunctions";

export function EditCourse() {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation()
  const courseId = location.pathname.split("/")[2];
  const course = useCourse(courseId);
  const link = `${window.location.origin}/registration/student_sign_in/?courseId=${courseId}`;
  let [functions, setFunctions] = useFunctions(courseId);

  function handleDelete() {
    setShowPopup(true);
  }

  function handleClosePopup() {
    setShowPopup(false);
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Edit Your Course Calculator</h2>
      <div className="course-links edit-nav">
        <div className="course-name">
          <h3>{course.code}- {course.name}</h3>
        </div>
        <div className="courses-link">
          <Link to="/courses" className="link">Courses</Link>
        </div>
        <div className="delete-course">
          <button onClick={handleDelete}>Delete Course</button>
        </div>
        {showPopup && (
          <DeletePopup show={showPopup} onClose={handleClosePopup} courseId={courseId} />
        )}
      </div>
      <div className="student-link">
        <span>Student Calculator Link: </span>
        <textarea value={ link } readOnly />
      </div>
      <div className="function-checkboxes">
        <div>
          Enable/Disable Functions:
        </div>
        <div className="functions">
          {Object.entries(functions).map(([name, isEnabled]) => (
            <FunctionCheckbox 
              key={name} 
              name={name} 
              isEnabled={isEnabled}
              courseId={courseId}
              onToggle={() => {
                setFunctions((prev) => ({
                  ...prev,
                  [name]: !prev[name],
                }));
              }}
            />
          ))}   
        </div>
      </div>
      <Calculator functions={functions} />
    </div>
  );
}