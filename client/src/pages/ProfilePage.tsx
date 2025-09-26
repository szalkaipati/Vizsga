import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "./Navbar";
import "./ProfilePage.css";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
}

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [id]);

  if (!profile) return <p>Profil betöltése...</p>;

  return (
    <>
      <Navbar />
      <div className="background">
        <div className="section">
          <h1 className="name">{profile.name}'s Profile</h1>
          <hr/>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Felhasználói szerep:</strong> {profile.role}</p>
          {/* You can add more info like courses for teachers or enrolled courses for students */}
        </div>
      </div>
    </>
    
  );
};

export default ProfilePage;
