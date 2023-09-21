import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {

  const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}

  return (
    <section className="not-found">
      <h2 className="not-found__header">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <p onClick={goBack} className="not-found__link button">Назад</p>
    </section>
  );
}

export default NotFound;