import studentPhoto from '../../../images/student.jpg';

function AboutMe() {
  return (
    <section className="student">
      <h2 className="about__header">Студент</h2>
      <div className="student__box">
        <div className="student__info">
          <p className="student__name">Александра</p>
          <p className="student__age">Фронтенд-разработчик, 30 лет</p>
          <p className="student__about">Родилась в Ульяновске, живу в Москве. 
          Закончила авиационный институт с двумя дипломами. Увлекаюсь сноубордингом,
           путешествиями, книгами и музыкой. Недавно начала кодить и втянулась так, 
           что не могу оторваться. Хочу развиваться в этом направлении и дальше.</p>
          <a className="student__link button" href="https://github.com/AleksandraValts" target="blank">Github</a>
        </div>
        <img className="student__photo" src={studentPhoto} alt="Фото"/>
      </div>
    </section>
  );
}

export default AboutMe;