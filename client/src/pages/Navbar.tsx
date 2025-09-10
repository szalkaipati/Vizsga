import { useEffect, useState } from "react";
import api, { setAuthToken } from "../api/axios";
import { Link } from "react-router-dom";

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
    if (token) setAuthToken(token); // make sure Axios sends it
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {user ? (
        <>
          <span>Hi, {user.name}</span>
          <Link to="/profile">My Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
