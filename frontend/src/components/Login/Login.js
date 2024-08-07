import React, { useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      setIsLogin(true);
      console.log(response.data.message);
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
    }
  };

  if (isLogin) {
    return <Navigate to="/weather" />;
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <form onSubmit={onLogin} className="w-50">
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
        <button className="btn btn-primary w-100">Login</button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <p className="mt-3">
        Don't have an account? Please <Link to="/">Register</Link>
      </p>
    </div>
  );
}
