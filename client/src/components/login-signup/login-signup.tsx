import './login-signup.css';
//import { usePopup } from '../../popupContext';



function LoginSignup(){


    const onClose = () => {
        const Popup = document.getElementById("takar");
        if (Popup) {
          Popup.style.display = "none";
        }
    }

    
    /*const { loginOpen, closeAllPopups } = usePopup();

    if (!loginOpen) return null*/
    return (
      <>
      <div id="takar" className="Takar">
      <div className="RegisterPopup-overlay">
          <div className="RegisterPopup-content">
              <div id="reg" className="RegisterPopup">
                  <button id="close"  onClick={onClose}>X
                  
                  </button>
                  
                  <div className="logo">
                      <img src="./src/images/skill-hill.png" className="logo" width="150px" alt="Skill Hill Logo" />
                  </div>
                  <div>
                      <p id="text" className="textheadline">Regisztráljon és kezdjen a tanulásba</p>
                  </div>
                 

                  </div>
                  <label className="container textlight">
                      <input type="checkbox" /*checked="checked"*/  />
                      <span id="texthalvany" className="checkmark">Elfogadom az általános szerződési feltételeket.</span> 
                  </label>
                  <label className="container textlight">
                      <input type="checkbox" />
                      <span id="texthalvany" className="checkmark"> Szeretnék kapni e-mail értesítéseket.</span>
                  </label>
                  <p id="texthalvany" className="textlight"></p>
                  
                  <div className="whitebox">
                      <p className="textmini">
                          A regisztrációval elfogadja a SkillHill szolgáltatási feltételeit és adatvédelmi szabályzatát.{' '}
                          <a href="gdpr.html">Adatvédelmi Szabályzat</a>, <a href="aszf">ÁSZF</a>,{' '}
                          <a href="cookie">Süti Szabályzat</a>
                      </p>
                  </div>
                  
              </div>
          </div>
      </div>
 
      </>
        );
      };

{/*<div id="takar">
    <div className="RegisterPopup-overlay" >
      <div
        className="RegisterPopup-content"
        
      >
        {CloseLoginSignup() && <button id="close" >
          X
        </button>}
        <div className="logo">
          <img
            src="./src/images/skill-hill.png"
            className="logo"
            width="150px"
            alt="Skill Hill Logo"
          />
        </div>
        <p className="textheadline">Log in with Google to start learning!</p>
        <button className="google-login-button">
          Log in with Google
        </button>
      </div>
    </div>
    </div>*/}


export default LoginSignup;