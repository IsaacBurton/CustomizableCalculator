import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router";

export function DeletePopup(props) {
    const {
        show,
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
            navigate("/courses");
        } else {
            // handle error
        }
    }
    
    return (
      <div className={`popup ${show ? "open" : ""}`}>
        <div className="popup-content">
            <div className="popup-text">Are you sure you want to delete this course?</div>
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    );
}