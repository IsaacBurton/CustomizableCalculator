import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router';

function App() {
  const navigate = useNavigate();
  const userType = getCookie('user_type');

  function getCookie(name) {
    const cookieArr = document.cookie.split(";");
  
    for (const cookie of cookieArr) {
      const [cookieName, cookieValue] = cookie.trim().split("=");
  
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
  
    return null;
  }
  
  async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin",
    });

    if (res.ok) {
      if (userType === "student") {
        window.location = "/registration/student_sign_in/";
      } else {
        window.location = "/registration/instructor_sign_in/";
      }
    } else {
      console.error("Logout failed");
    }
  }

  useEffect(() => {
    if (window.location.hash === "#/" || window.location.hash === "#" || window.location.hash === "") {
      if (userType === "student") {
        navigate("/calculator", { replace: true });
      } else if (userType === "instructor") {
        navigate("/courses", { replace: true });
      }
    }
  }, []);

  return (
    <div>
      <nav className="navbar">
        <h1>Customizable Calculator</h1>
        <button onClick={logout}>Logout</button>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App;
