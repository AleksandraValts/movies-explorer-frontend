import React from 'react';
import Promo from './Promo/Promo.js';
import AboutProject from './AboutProject/AboutProject.js';
import Techs from './Techs/Techs.js';
import AboutMe from './AboutMe/AboutMe.js';
import Portfolio from './Portfolio/Portfolio.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Popup from '../Popup/Popup.js';

function Main() {
  return (
    <main className="content">
      <div className="main__header">
        <Header />
        <Promo/>
      </div>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
        <Portfolio/>
        <Footer/>
        <Popup/>

    </main>
  );
}

export default Main;