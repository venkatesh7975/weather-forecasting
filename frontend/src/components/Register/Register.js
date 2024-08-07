import React, { useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const onRegister = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const isPasswordSecure = passwordRegex.test(password);
    if (!isPasswordSecure) {
      setError("Password not secure");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      setIsRegister(true);
      console.log(response.data.message);
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
    }
  };

  if (isRegister) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <form onSubmit={onRegister} className="w-50">
        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassWord(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100">Register</button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <p className="mt-3">
        Already have an account? Please <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
