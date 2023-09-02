import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';

function Register() {
  return (
    <section className="login">
      <Link to={"/"}>
        <img className="login__icon button" src={headerLogo} alt="Лого"/>
      </Link>
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
        <button className="login__button button" type="submit">Зарегистрироваться</button>
      </form>
      <p className="login__link">Уже зарегистрированы?
      <Link to={"/signin"} className="login__link-src button" href="#">Войти</Link></p>
    </section>
  );
}

export default Register;