"use client";
//import { useState } from "react";
import { LoginButton } from "../commons/button";
import './navBar.css';
import Search from "../commons/search/search";
import { Link } from "react-router-dom";
//import type { ComponentType, ElementType } from "react"
//import Button from "../commons/button"





const Navbar = ({  }) => {
   /* const [searchQuery, setSearchQuery]= useState("");
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(true);
    
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Keresés: ${searchQuery}`);
    
  };*/

  return (
    <>
    
          <nav>
            <div className="nav">
              <div className="logo"><a id="brand" href="#"><img src="/skill-hill.png" className="logo" width="150px"/></a></div>
              <div className="search"><Search/></div>
              <div><LoginButton/></div>
              <button className="admin-button" ><Link to="/admin">admin</Link></button>
            </div>
          </nav>
          
    </>
  )
}

export default Navbar