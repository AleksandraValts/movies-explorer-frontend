function Footer() {
    return (
      <footer className="footer">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p> 
        <div className="footer__container">
            <p className="footer__data">&copy; 2023</p>
            <div className="footer__links">
              <a className="footer__link button" href="https://practicum.yandex.ru" target="blank">
                Яндекс.Практикум</a>
              <a className="footer__link button" href="https://github.com/AleksandraValts" target="blank">Github</a>
            </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;