import { useState } from "react";
import api, { setAuthToken } from "../api/axios";
import { useNavigate } from "react-router-dom";
// import bcrypt from "bcrypt";

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
      // const match = await bcrypt.compare("password123", "$2b$10$bEsla7C440G3PzyW5HwAPurzKB/w1My38lgvCAhEIGiDmEFpOpcCW");
      // console.log(match); // should be true

      // Redirect based on role
      if (user.role === "ADMIN") navigate("/admin");
      else if (user.role === "TEACHER") navigate("/teacher");
      else navigate("/student");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-2 p-2 border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-2 p-2 border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
