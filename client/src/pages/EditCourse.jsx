import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { DeletePopup } from "../components/DeletePopup";
import { Calculator } from "../components/Calculator";
import { Function } from "../components/Function";
import { useFetch } from "../hooks/useFetch";
import { useCourse } from "../hooks/useCourse";
import { useFunctions } from "../hooks/useFunctions";

export function EditCourse() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasError, setHasError] = useState(false);
  const location = useLocation()
  const courseId = location.pathname.split("/")[2];
  const course = useCourse(courseId);
  const [functions, setFunctions] = useFunctions(courseId);

  useEffect(() => {
    if (hasError) {
      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  }, [hasError])

  async function handleSubmit(e) {
    e.preventDefault();
    const makeRequest = useFetch();

    const response = await makeRequest(`/functions/${courseId}/`, "POST", {
      allowed_functions: functions,
    });

    if (response.ok) {
      const updatedFunctions = await response.json();
      setFunctions(updatedFunctions.allowed_functions);
    } else {
      setHasError(true);
    }
  }

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
      {hasError && <div className="error-popup">There was an error updating the functions. Please refresh and retry.</div>}
      <form onSubmit={handleSubmit}>
        <div>Enable/Disable Functions:
          {Object.entries(functions).map(([name, isEnabled]) => (
            <Function 
              key={name} 
              name={name} 
              isEnabled={isEnabled} 
              onCheckChange={() => 
                {setFunctions(prev => 
                  ({...prev,[name]: !prev[name],})
                )}
              }
            />
          ))}
        </div>
        <button>Update Calculator</button>
      </form>
      <Calculator />
    </div>
  );
}