function AboutProject() {
  return (
    <section className="about" id="about">
      <h2 className="about__header">О проекте</h2>
      <div className="about__project">
          <ul className="about__list">
            <li className="about__big">Дипломный проект включал 5 этапов</li>
            <li className="about__small">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</li>
          </ul>
          <ul className="about__list">
            <li className="about__big">На выполнение диплома ушло 5 недель</li>
            <li className="about__small">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</li>
          </ul>
      </div> 
      <div className="about__diagram">
          <ul className="about__element">
            <li className="about__week about__week-back">1 неделя</li>
            <li className="about__web">Back-end</li>
          </ul>
          <ul className="about__element">
            <li className="about__week about__week-front">4 недели</li>
            <li className="about__web">Front-end</li>
          </ul>
      </div>



    </section>
  );
}

export default AboutProject;