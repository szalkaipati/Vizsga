'use client';
import { useState } from "react";
import { LoginButton } from "../commons/button";
import './navBar.css';
import Search from "../commons/search/search";
import Link from "next/link"; // Use Next.js Link for navigation
import { UploadButton } from "../commons/uploadButton/uploadButton";
import Modal from "../modal";

const Navbar = () => {
  const [currentRole, setCurrentRole] = useState('diák');
  
  const handleRoleChange = (role: string) => {
    setCurrentRole(role);
  };

  return (
    <>
      <nav>
        <div className="nav">
          <div>
            <button onClick={() => handleRoleChange('diák')}>Diák</button>
            <button onClick={() => handleRoleChange('tanár')}>Tanár</button>
            <button onClick={() => handleRoleChange('admin')}>Admin</button>
          </div>

          <div className="logo">
            <Link href="/">
              <img src="/skill-hill.png" className="logo" width="150px" />
            </Link>
          </div>
          
          <div className="search">
            <Search />
          </div>

          {(currentRole === 'tanár' || currentRole === 'admin') && <UploadButton />}
          
          <div><LoginButton /></div>

          <button className="admin-button">
            <Link href="/admin" passHref>
              <span style={{ color: 'black' }}>admin felület</span>
            </Link>
          </button>

          <button className="admin-button">
            <Link href="/videos" passHref>
              <span style={{ color: 'black' }}>videók megtekintése</span>
            </Link>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
