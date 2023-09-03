function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <a className="portfolio__nav button" href="https://aleksandravalts.github.io/how-to-learn/" target="blank">
        <p className="portfolio__item">Статичный сайт</p>
        <p className="portfolio__item portfolio__item-link">↗</p>
      </a>
      <a className="portfolio__nav button" href="https://aleksandravalts.github.io/russian-travel/" target="blank">
        <p className="portfolio__item">Адаптивный сайт</p>
        <p className="portfolio__item portfolio__item-link">↗</p>
      </a>
      <a className="portfolio__nav button" href="https://aleksandravalts.github.io/mesto/" target="blank">
        <p className="portfolio__item">Одностраничное приложение</p>
        <p className="portfolio__item portfolio__item-link">↗</p>
      </a>
    </section>
  );
}

export default Portfolio;