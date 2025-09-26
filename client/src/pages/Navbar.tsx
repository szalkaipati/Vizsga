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
            <span className="navbar-greeting">Szia, {user.name}</span>
            <Link to="/profile" className="btn">Profilom</Link>
            <Link to="/admin" className="btn">Admin</Link>
            <Link to="/" className="btn">Főoldal</Link>
            <button onClick={handleLogout} className="btn">Kijelentkezés</button>
          </>
        ) : (
          <Link to="/login" className="btn">Bejelentkezés</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
