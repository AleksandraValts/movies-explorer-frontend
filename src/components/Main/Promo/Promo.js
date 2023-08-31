import promoImg from '../../../images/promo-img.svg';

function Promo() {
    return (
      <section className="promo">
        <div className="promo__about">
            <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
            <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            <a className="promo__link" href="#about">
              <p className="promo__button">Узнать больше</p>
            </a>
        </div>
        <img className="promo__img" src={promoImg} alt="Веб"/>
      </section>
    );
  }
  
  export default Promo;