import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { useEffect, useState } from "react";
import api, { setAuthToken } from "../api/axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const HomePage = () => {
  const navigate = useNavigate();
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
    if (token) setAuthToken(token);
    fetchUser();
  }, []);


  return (
    <div className="homepage">
      <Navbar />
      {/* Banner */}
      <div className="banner">
        <br/>
        <br/>
        
        {user ? (
                  <>
                    <div></div>
                  </>
                ) : (
                    <button onClick={() => navigate("/login")} className="login-button">Bejelentkezés</button>

                )}
      </div>
      <div className="banner-text">
        <h1>Segítünk elérni a céljait!</h1>
        <p>Kezdje akár egy kattintással!</p>
      </div>
      {/* Numbers / Stats */}
      <section className="row stats">
        <div className="col-lg-3 col-md-3 col-sm stat-card">
          <p className="stat-number">100+</p>
          <p>Videók</p>
        </div>
        <div className="col-lg-3 col-md-3 col-sm stat-card">
          <p className="stat-number">50+</p>
          <p>Tanár</p>
        </div>
        <div className="col-lg-3 col-md-3 col-sm stat-card">
          <p className="stat-number">200+</p>
          <p>Diák</p>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="videos-section">
        <h2>Első lépésnek ajánljuk</h2>
        <div className="video-grid">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Video 1"
            allowFullScreen
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/3JZ_D3ELwOQ"
            title="Video 2"
            allowFullScreen
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
            title="Video 3"
            allowFullScreen
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/V-_O7nl0Ii0"
            title="Video 4"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Supported Languages */}
      <section className="languages">
        <h2>Támogatott nyelvek</h2>
        <div className="language-grid">
          <span>JavaScript</span>
          <span>CSS</span>
          <span>HTML</span>
          <span>C#</span>
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section">
        <div className="info-card">
          <h3>Tanuló</h3>
          <p>Ingyenes online kurzusokat vehet igénybe.<br/>
          Elérhető nyelv: magyar.<br/>
          Elmentheti kedvenc oktató videóit.</p>
        </div>
        <div className="info-card">
          <h3>Tanár</h3>
          <p>Létrehozhat oktató anyagokat.<br/>
          Láthatja a videóval kapcsolatos statisztikákat.<br/>
          Kurzusára felvehet vagy tilthat tanulókat.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <div>
            <a href="#">Rólunk</a>
            <a href="#">Elérhetőségek</a>
            <a href="#">Segítség</a>
          </div>
          <div>
            <a href="#">Adatkezelési nyilatkozat</a>
            <a href="#">Általános szerződési feltételek</a>
            <a href="#">Süti szabályzat</a>
          </div>
        </div>
        <p>© 2024 Skill Hill - BMSZC Bolyai János Technikum és Kollégium. Minden jog fenntartva.</p>
      </footer>

    </div>
  );
};

export default HomePage;
