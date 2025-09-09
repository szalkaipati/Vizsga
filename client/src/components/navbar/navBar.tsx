import { useState } from "react";
import './navBar.css';
import { Link } from "react-router-dom";
import { UploadButton } from "../commons/uploadButton/uploadButton";
// import Modal from "../modal";

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
            <Link to="/">
              <img src="/skill-hill.png" className="logo" width="150px" />
            </Link>
          </div>
          
          {/* <div className="search">
            <Search />
          </div> */}

          {(currentRole === 'tanár' || currentRole === 'admin') && <UploadButton />}

          <button className="admin-button">
            <Link to="/admin" passHref>
              <span style={{ color: 'black' }}>admin felület</span>
            </Link>
          </button>

          <button className="admin-button">
            <Link to="/videos" passHref>
              <span style={{ color: 'black' }}>videók megtekintése</span>
            </Link>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
