import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { formValidation } from "../../js/Script";
const apiUrl = import.meta.env.VITE_API_URL;

function SignUp({ setSuccessMsg, setErrorMsg }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMSg] = useState("");

  const formRef = useRef();

  useEffect(() => {
    formValidation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return; // Don't submit if form invalid
    }

    form.classList.remove("was-validated");

    const response = await fetch(`${apiUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (data.error) {
      setErrorMSg(data.error);
      setUsername("");
      setEmail("");
      setPassword("");
      form.classList.remove("was-validated");
      return;
    }
    setErrorMSg("");
    setErrorMsg("");
    setSuccessMsg("Welcome to Wanderlust");
    navigate("/");
  };

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <h3 className="heading">SignUp on Wanderlust</h3>
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
            <div className="valid-feedback"> Looks Good!</div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button className="btn btn-success">SignUp</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
