import { useState } from "react";
import api, { setAuthToken } from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      console.log("Login response:", res.data);

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setAuthToken(token);

      console.log("Login attempt", email, password, user?.password);

      // Redirect based on role
      if (user.role === "ADMIN") navigate("/admin");
      else if (user.role === "TEACHER") navigate("/teacher");
      else navigate("/student");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error-text">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
