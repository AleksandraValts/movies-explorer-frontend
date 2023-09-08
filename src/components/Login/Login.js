import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';

function Login(props) {
  const [userData, setUserData] = React.useState({email: '', password: ''})
  
  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value})
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(userData)
      .catch(err => {console.error(err)})
  }

  return (
    <section className="login">
      <Link to={"/"}>
        <img className="login__icon button" src={headerLogo} alt="Лого"/>
      </Link>
      <form className="login__form" name="login" onSubmit={handleSubmit}>
        <h2 className="login__title">Рады видеть!</h2>
        <span className="login__plaseholder">E-mail</span>
        <input className="login__input" type="email" name="email"
        id="login-email" required placeholder="Email" onChange={handleChange}/>
        <span className="login__error">Что-то пошло не так</span>
        <span className="login__plaseholder">Пароль</span>
        <input className="login__input" type="password" name="password"
        id="login-password" required placeholder="Пароль" onChange={handleChange}/>
        <span className="login__error">Что-то пошло не так</span>
        <button className="login__button log__button button" type="submit">Войти</button>
      </form>
      <p className="login__link">Еще не зарегистрированы?
      <Link to={"/signup"} className="login__link-src button" href="#">Регистрация</Link></p>
    </section>
  );
}

export default Login;