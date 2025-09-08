"use client";
import { NavLink, Outlet } from 'react-router-dom';
import './adminPage.css';
import Navbar from '../navbar/navBar';

export interface User{
    id: string,
    name: string
    email: string
    uploadedVids: number
};
export const profiles: User[] = [
    {
      id: "u1",
      name: "Profil1",
      email: "Profil1@gmail.com",
      uploadedVids: 3
    },
    {
      id: "u2",
      name: "Profil2",
      email: "Profil2@gmail.com",
      uploadedVids: 2
    },
    {
      id: "u3",
      name: "Profil3",
      email: "Profil3@gmail.com",
      uploadedVids:6
    },
    {
      id: "u4",
      name: "Profil4",
      email: "Profil4@gmail.com",
      uploadedVids: 4
    },
  ];

 function AdminPage() {
    
    return (
          <>
          <Navbar/>
          
            <html>
             
                <body > 
                  
                  <div className='background'>
                    <h1 className='adminPage'>Admin Page</h1>
                    <h3>Search</h3>
                    <form action="">
                      <div >
                        <p>Email:</p>
                      </div>
                      <div id='searchT'>
                        <input type="text" name="search" id="searchProfile" placeholder="Keresés..."/>
                        <button type="submit" id="searchProfileButton">Search</button>
                        </div>
                    </form>
                    
                    <h2>Tanárok</h2>
                     {profiles.map((profile) => {
                                return (
                                <div id="profiles" key={profile.id}>
                                    <div id="profile"><NavLink style={{ color: "#181818", textDecoration: "none" }}
                                    to={`/profiles/${profile.id}`}>
                                    {profile.name}
                                    </NavLink> </div>
                                    <div id="profile">
                                    <NavLink style={{ color: "#181818", textDecoration: "none" }}
                                    to={`/profiles/${profile.id}`}>
                                    {profile.email}
                                    </NavLink> </div>
                                    <div id="profile">
                                    <NavLink style={{ color: "#181818", textDecoration: "none" }}
                                    to={`/profiles/${profile.id}`}>
                                    {profile.uploadedVids}
                                    </NavLink>
                                    </div>
                                </div>
                                );
                            })}
                            <hr />
                            <Outlet />
                            <h2>Diákok</h2>
                            {profiles.map((profile) => {
                                return (
                                <div id="profiles"  key={profile.id}>
                                    <div id="profile"><NavLink style={{ color: "#181818", textDecoration: "none" }}
                                    to={`/profiles/${profile.id}`}>
                                    {profile.name}
                                    </NavLink> </div>
                                    <div id="profile">
                                    <NavLink style={{ color: "#181818", textDecoration: "none" }}
                                    to={`/profiles/${profile.id}`}>
                                    {profile.email}
                                    </NavLink> </div>
                                    <div id="profile">
                                    <NavLink style={{ color: "#181818", textDecoration: "none" }}
                                    to={`/profiles/${profile.id}`}>
                                    {profile.uploadedVids}
                                    </NavLink>
                                    </div>
                                </div>
                                );
                            })}
                            </div>
                </body>
            </html>

            </>
  
    );
} 

export default AdminPage;

