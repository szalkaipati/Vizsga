import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import './adminPage.css';
import Navbar from '../navbar/navBar';

export interface User {
  id: string;
  name: string;
  email: string;
  uploadedVids: number;
}

export const profiles: User[] = [
  { id: "u1", name: "Profil1", email: "Profil1@gmail.com", uploadedVids: 3 },
  { id: "u2", name: "Profil2", email: "Profil2@gmail.com", uploadedVids: 2 },
  { id: "u3", name: "Profil3", email: "Profil3@gmail.com", uploadedVids: 6 },
  { id: "u4", name: "Profil4", email: "Profil4@gmail.com", uploadedVids: 4 },
];

function AdminPage() {
  const [search, setSearch] = useState('');

  // Filter profiles by name or email
  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(search.toLowerCase()) ||
      profile.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
  };

  return (
    <>
      <Navbar />

      <div className="background">
        <h1 className="adminPage">Admin Page</h1>
        <h3>Search</h3>

        <form onSubmit={handleSubmit}>
          <div>
            <p>Email:</p>
          </div>
          <div id="searchT">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Keresés..."
            />
            <button type="submit" id="searchProfileButton">Search</button>
          </div>
        </form>

        <h2>Tanárok</h2>
        {filteredProfiles.map((profile) => (
          <div id="profiles" key={profile.id}>
            <div id="profile">
              <NavLink to={`/profiles/${profile.id}`} style={{ color: "#181818", textDecoration: "none" }}>
                {profile.name}
              </NavLink>
            </div>
            <div id="profile">
              <NavLink to={`/profiles/${profile.id}`} style={{ color: "#181818", textDecoration: "none" }}>
                {profile.email}
              </NavLink>
            </div>
            <div id="profile">
              <NavLink to={`/profiles/${profile.id}`} style={{ color: "#181818", textDecoration: "none" }}>
                {profile.uploadedVids}
              </NavLink>
            </div>
          </div>
        ))}

        <hr />
        <Outlet />
      </div>
    </>
  );
}

export default AdminPage;
