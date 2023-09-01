import React from 'react';
import Header from '../Header/Header.js';

function Profile() {
  return (
    <div className="app">
    <Header/>
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
        <div className="profile__list">
        <div className="profile__container">
            <p className="profile__item">Имя</p>
            <p className="profile__item">Виталий</p>
        </div>
        <div className="profile__container">
            <p className="profile__item">E-mail</p>
            <p className="profile__item">pochta@yandex.ru</p>
        </div>
      </div>
      <div className="profile__buttons">
        <button className="profile__button" type="submit">Редактировать</button>
        <button className="profile__button profile__button-ex" type="submit">Выйти из аккаунта</button>
      </div>
    </section>
    </div>
  );
}

export default Profile;