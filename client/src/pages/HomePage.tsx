import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">

      {/* Banner */}
      <div className="banner">
        <h1>Segítünk elérni a céljait!</h1>
        <p>Kezdje akár egy kattintással!</p>
        <button onClick={() => navigate("/login")} className="login-button">Bejelentkezés</button>
      </div>

      {/* Numbers / Stats */}
      <section className="stats">
        <div className="stat-card">
          <p className="stat-number">100+</p>
          <p>Videók</p>
        </div>
        <div className="stat-card">
          <p className="stat-number">50+</p>
          <p>Tanár</p>
        </div>
        <div className="stat-card">
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
