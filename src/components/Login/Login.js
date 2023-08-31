import React from 'react';
import headerLogo from '../../images/header-logo.svg';

function Login() {
  return (
    <section className="login">
      <img className="login__icon" src={headerLogo} alt="Лого"/>
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
        <button className="login__button" type="submit">Войти</button>
      </form>
      <p className="login__link">Еще не зарегистрированы?
      <a className="login__link-src" href="#">Регистрация</a></p>
    </section>
  );
}

export default Login;