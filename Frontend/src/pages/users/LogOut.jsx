import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

function LogOut({ setIsLoggedIn, setSuccessMsg, setErrorMsg, setCurrentUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const res = await fetch(`${apiUrl}/logout`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setIsLoggedIn(false);
          setCurrentUser(null);
          setSuccessMsg("You are logged out!");
          setErrorMsg("");
          navigate("/");
        } else {
          setErrorMsg("Logout failed");
        }
      } catch (err) {
        setErrorMsg("Something went wrong while logging out");
      }
    };

    logout();
  }, []);
  return <div>Logging you out...</div>;
}
export default LogOut;
