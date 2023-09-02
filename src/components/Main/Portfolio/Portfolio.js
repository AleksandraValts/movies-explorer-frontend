function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <a className="portfolio__nav button" href="https://aleksandravalts.github.io/how-to-learn/" target="blank">
        <li className="portfolio__item">Статичный сайт</li>
        <li className="portfolio__item portfolio__item-link">↗</li>
      </a>
      <a className="portfolio__nav button" href="https://aleksandravalts.github.io/russian-travel/" target="blank">
        <li className="portfolio__item">Адаптивный сайт</li>
        <li className="portfolio__item portfolio__item-link">↗</li>
      </a>
      <a className="portfolio__nav button" href="https://aleksandravalts.github.io/mesto/" target="blank">
        <li className="portfolio__item">Одностраничное приложение</li>
        <li className="portfolio__item portfolio__item-link">↗</li>
      </a>


    </section>
  );
}

export default Portfolio;