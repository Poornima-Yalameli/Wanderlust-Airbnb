import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { formValidation } from "../../js/Script";
const apiUrl = import.meta.env.VITE_API_URL;

function LogIn({
  setSuccessMsg,
  errorMsg,
  setErrorMsg,
  setIsLoggedIn,
  setCurrentUser,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const formRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    formValidation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    form.classList.remove("was-validated");

    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.error) {
      setErrorMsg(data.error);
      setUsername("");
      setPassword("");
      form.classList.remove("was-validated");
      return;
    }

    setCurrentUser(data.user);

    setIsLoggedIn(true);
    setSuccessMsg("Welcome back to Wanderlust....You are logged in!");
    setErrorMsg("");
    navigate("/");
  };

  return (
    <div className="row">
      <div className="col-6 offset-3">
        {errorMsg && (
          <div
            className="alert alert-danger alert-dismissible fade show col-12 col-md-6 offset-md-3"
            role="alert"
          >
            <strong>{errorMsg}</strong>{" "}
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate
        >
          <h3>Log In</h3>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Username
            </label>
            <input
              name="username"
              className="form-control"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-success">LogIn</button>
        </form>
      </div>
    </div>
  );
}
export default LogIn;
