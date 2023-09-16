import React from 'react';
import Promo from './Promo/Promo.js';
import AboutProject from './AboutProject/AboutProject.js';
import Techs from './Techs/Techs.js';
import AboutMe from './AboutMe/AboutMe.js';
import Portfolio from './Portfolio/Portfolio.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';

function Main({loggedIn}) {
  return (
    <main className="content">
      {!loggedIn
      ? (<Header header={"main"} logo={"main"} about={"none"} />) 
      : (<Header visibility={"none"} logo={"main"} header={"main"} />)}
        <Promo/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
        <Portfolio/>
        <Footer/>
    </main>
  );
}

export default Main;