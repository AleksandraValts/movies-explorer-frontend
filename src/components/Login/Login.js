import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';

function Login() {
  return (
    <section className="login">
      <Link to={"/"}>
        <img className="login__icon button" src={headerLogo} alt="Лого"/>
      </Link>
      <form className="login__form" name="login">
        <h2 className="login__title">Рады видеть!</h2>
        <span className="login__plaseholder">E-mail</span>
        <input className="login__input" type="email" name="email"
        id="login-email" required />
        <span className="login__error">Что-то пошло не так</span>
        <span className="login__plaseholder">Пароль</span>
        <input className="login__input" type="password" name="password"
        id="login-password" required />
        <span className="login__error">Что-то пошло не так</span>
        <button className="login__button log__button button" type="submit">Войти</button>
      </form>
      <p className="login__link">Еще не зарегистрированы?
      <Link to={"/signup"} className="login__link-src button" href="#">Регистрация</Link></p>
    </section>
  );
}

export default Login;