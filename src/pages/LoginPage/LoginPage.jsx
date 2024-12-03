import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:3000/api/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.status) {
          navigate("/loading");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-page-wrapper">
      <form onSubmit={handleSubmit}>
        <h1 className="login-page-title">Login</h1>
        <div className="login-page-input-box">
          <MdEmail className="login-page-icon" style={{ fontSize: "21px" }} />
          <input
            type="text"
            placeholder="Enter your email"
            className="login-page-input-field"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-page-input-box">
          <FaLock className="login-page-icon" />
          <input
            type="password"
            placeholder="Enter your password"
            className="login-page-input-field"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-page-btn">
          Login
        </button>
      </form>

      <div className="signup-page-prompt">
        Don't have an account? <Link to="/sign-up">Join us today</Link>
      </div>
    </div>
  );
};

export default LoginPage;
