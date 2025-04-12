"use client";

import { useState } from 'react';
import Banner from '../commons/banner/banner';
//import React, { useState, useEffect } from "react";
import '../homepage/homePage.css';
import Navbar from '../navbar/navBar';


const HomePage: React.FC = () => {

  
  return (
          <>
          <Navbar/>
          <Banner/>
       
          <div className="content"> 
      
            <div id="numbers" className="blackbox">
              <div className="wide75">
              <p className="motivation">Segítünk elérni a céljait!</p>
              <p className="motivation2">Kezdje akár egy kattintással!</p>
                <div className="containerrow scroll">
                  <div className="box3wide20 scroll">
                  <p className="text" >X+ videó</p>
                  </div>
                  <div className="box3wide20 scroll">
                  <p className="text" >X+ tanár</p>
                  </div>
                  <div className="box3wide20 scroll">
                  <p className="text" >X+ diák</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
            
          <div id="video" className="blackbox">
            <div className="wide75">
            <p className="motivation3">Első lépésnek ajánljuk</p>
                <div id="videocontainer1" className="videocontainer">
              
                <div id="100video-box" className="box4">
                  <div className="videokep"><iframe width="200" height="100" src="https://www.youtube.com/embed/FQdaUv95mR8?si=9_MgYWqFnve8T9xl" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                </div>
              
                <div id="110video-box" className="box4">
                  <div className="videokep"><iframe width="200" height="100" src="https://www.youtube.com/embed/FQdaUv95mR8?si=9_MgYWqFnve8T9xl" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                </div>
                
                <div id="120video-box" className="box4">
                  <div className="videokep"><iframe width="200" height="100" src="https://www.youtube.com/embed/FQdaUv95mR8?si=9_MgYWqFnve8T9xl" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                </div>
                
                <div id="130video-box" className="box4">
                  <div className="videokep"><iframe width="200" height="100" src="https://www.youtube.com/embed/FQdaUv95mR8?si=9_MgYWqFnve8T9xl" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                </div>
            </div>
            </div>
          </div>
      
            <div id="language" className="blackbox">
              <div className="wide75">
                <div className="containerrow">
                  <div >
                  <p className="motivation"></p>
                  </div>
                  <div className="box3wide20gray">
                  <p className="text" >javascript</p>
                  </div>
                  <div className="box3wide20gray">
                  <p className="text" >css</p>
                  </div>
                  <div className="box3wide20gray">
                  <p className="text" >html</p>
                  </div>
                  <div className="box3wide20gray">
                  <p className="text" >C#</p>
                  </div>
                  <div>
                  <p className="motivation"></p>
                  </div>
                </div>
              </div>
            </div>

            <div id="info" className="blackbox">
            <div className="wide75light">
            <div className="containerrow">
                <div className="box2black">
                <p>tanulo</p>
                <hr/>
                <p>ingyenes online kurzusokat vehet igénybe<br/>
                elérhető nyelv: magyar<br/>
                elmentheti kedvencoktató videóit</p>
                </div>
                <div className="box2black">
                <p>tanár</p>
                <hr/>
                <p>létrehozhat oktató anyagokat<br/>
                látja a videóval kapcsolatos anyagokat(nézettségek száma, kik látták)<br/>
                kurzusára felvehet, vagy tilthat tanulókat</p>
                </div>
            </div>
            </div>
            </div>
            
           
          
       
          
          <div id="footer" className="bannerfooter">
            <div className="wide75transparent">
              <div className="containerrow">
                <div className="box2">
                  <ul>
                  <li><a href="#">Rólunk</a></li>
                  <li><a href="#">Elérhetőségeink</a></li>
                  <li><a href="#">Segítség</a></li>
                  </ul>
                </div>
                <div className="box2">
                  <ul>
                  <li><a href="#">Adatkezelési nyilatkozatasd</a></li>
                  <li><a href="#">Általános szerződési feltételek</a></li>
                  <li><a href="#">Süti kezelési szabályzat</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <p className="text-right">Copyright © 2024 Skill Hill - Bolyai Szakgimnázium. Minden jog fenntartva!</p>
            </div>
          </div>
          </>
  );
};

export default HomePage;
