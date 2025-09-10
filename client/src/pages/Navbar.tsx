import { useEffect, useState } from "react";
import api, { setAuthToken } from "../api/axios";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setUser(res.data);
    } catch (err) {
      console.error(err);
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">SkillHill</Link>

      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-greeting">Hi, {user.name}</span>
            <Link to="/profile" className="btn">My Profile</Link>
            <button onClick={handleLogout} className="btn">Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
