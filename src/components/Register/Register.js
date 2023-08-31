import React from 'react';
import headerLogo from '../../images/header-logo.svg';

function Register() {
  return (
    <section className="login">
      <img className="login__icon" src={headerLogo} alt="Лого"/>
      <form className="login__form" name="register">
        <h2 className="login__title">Добро пожаловать!</h2>
        <span className="login__plaseholder">Имя</span>
        <input className="login__input" type="text" name="name"
        id="register-name" required />
        <span className="login__error">Что-то пошло не так</span>
        <span className="login__plaseholder">E-mail</span>
        <input className="login__input" type="email" name="email"
        id="register-email" required />
        <span className="login__error">Что-то пошло не так</span>
        <span className="login__plaseholder">Пароль</span>
        <input className="login__input" type="password" name="password"
        id="register-password" required />
        <span className="login__error">Что-то пошло не так</span>
        <button className="login__button" type="submit">Зарегистрироваться</button>
      </form>
      <p className="login__link">Уже зарегистрированы?
      <a className="login__link-src" href="#">Войти</a></p>
    </section>
  );
}

export default Register;