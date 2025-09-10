import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "./Navbar";

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

  if (!profile) return <p>Loading profile...</p>;

  return (
    <>
      <Navbar />
      <div className="p-6 border rounded">
        <h1 className="text-2xl font-bold mb-2">{profile.name}'s Profile</h1>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>
        {/* You can add more info like courses for teachers or enrolled courses for students */}
      </div>
    </>
    
  );
};

export default ProfilePage;
