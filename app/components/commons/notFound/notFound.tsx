"use client";
import { Link } from 'react-router-dom';
import "./notFound.css";

 function NotFound() {
    return (
      <>
        <div className="notfound">
          <div className="notfound">  
              <h1>404</h1>
              <p className="text">oops! <br/>page not found!</p>
          </div>
          
          <Link to="/">
            <button > Go back </button>
          </Link>
        </div>
    </>
    );
  };

  export default NotFound;