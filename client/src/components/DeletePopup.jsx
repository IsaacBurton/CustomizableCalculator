import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router";

export function DeletePopup(props) {
    const {
        showPopup,
        onClose,
        courseId
    } = props;
    const navigate = useNavigate();
    
    async function handleDelete() {
        const makeRequest = useFetch();
        const response = await makeRequest("/courses/delete/", "POST", {
            id: courseId,
        });
        
        if (response.ok) {
            navigate("/");
        } else {
            // handle error
        }
    }
    
    return (
      <div className={`popup ${showPopup ? "open" : ""}`}>
        <div className="popup-content">
            <h2>Are you sure you want to delete this course?</h2>
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    );
}