import { useState } from "react";
import { Link, useLocation } from "react-router";
import { DeletePopup } from "../components/DeletePopup";
import { Calculator } from "../components/Calculator";
import { useCourse } from "../hooks/useCourse";

export function EditCourse() {
    const [showPopup, setShowPopup] = useState(false);
    const location = useLocation()
    const courseId = location.pathname.split("/")[2];
    const course = useCourse(courseId);

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
      <div>
        <Link to="/">Courses</Link>
        <button onClick={handleDelete}>Delete Course</button>
        {showPopup && (
          <DeletePopup show={showPopup} onClose={handleClosePopup} courseId={courseId} />
        )}
        <h2>Welcome, Instructor!</h2>
        <p>This is your Edit Course page.</p>
        <h3>{course.code}- {course.name}</h3>
        <Calculator />
      </div>
    );
  }