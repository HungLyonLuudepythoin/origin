import React, { useState } from "react";

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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label>usernameOrEmail:</label>
          <input
            type="usernameOrEmail"
            className="w-full border p-2 rounded"
            value={usernameOrEmail}
            onChange={(e) => setusernameOrEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
