"use client";
import { Link } from 'react-router-dom';
import "./notFound.css";

 function NotFound() {
    return (
      <>
        <div className="notfound">
          <div className="notfound">  
              <h1>404</h1>
              <p className="text">oopsz! <br/>Az oldalt nem találtuk!</p>
          </div>
          
          <Link to="/">
            <button > Vissza </button>
          </Link>
        </div>
    </>
    );
  };

  export default NotFound;