import React, { useState } from "react";
import '../styles/login.css';
const Login = () => {
  const [usernameOrEmail, setusernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const HOST = import.meta.env.VITE_DOMAIN
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Attempting to login with:", usernameOrEmail, password); // Log user input
  
      const res = await fetch(`${HOST}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        console.log("Login failed:", data); // Log the response data on failure
        setError(data.message || "Login failed");
        return;
      }
      // Store token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.id)
      alert("Login successful!");
      // Optionally redirect
      window.location.href = "/";
    } catch (err) {
      console.error("Login error", err);
      setError("Something went wrong");
    }
  };
  

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="login-section">
        <div class="form-group">
          <label>Tên hoặc Email:</label>
          <input
            type="usernameOrEmail"
            value={usernameOrEmail}
            onChange={(e) => setusernameOrEmail(e.target.value)}
            required
          />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="login-button"
        >
          Log In
        </button>
      </form>
      <div class="info-section">
        <div class="image-container">
          <img src="./images/logo.png" alt="Vietnamese Flag" class="vuahung-image"/>
        </div>
        <div class="info-text">
          <p>Xin chào bạn đã đến với "Ngày Giỗ Tổ", một dự án được tạo ra không chỉ để gởi gắm những thông tin, kiến thức thú vị về ngày quan trọng của dân tộc mà còn để giáo dục, tuyên truyền cho thế hệ trẻ về tầm quan trọng của Ngày Giỗ Tổ. </p>
        </div>
        <div class="team-name">
          <h1>Chích Chòe</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
