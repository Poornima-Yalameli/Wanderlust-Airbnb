import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogOut({ setIsLoggedIn, setSuccessMsg, setErrorMsg, setCurrentUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const res = await fetch("http://localhost:5000/logout", {
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
