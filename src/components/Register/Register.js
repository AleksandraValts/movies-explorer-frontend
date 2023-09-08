import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';

function Register(props) {

  const [userData, setUserData] = React.useState({email: '', password: '', name: ''})

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value})
  }

  function handleSubmit(e) {
    let { email, password, name } = userData;
    e.preventDefault();
    props.onRegister({ email, password, name })
      .catch(err => {console.error(err)})
  }
  return (
    <section className="login">
      <Link to={"/"}>
        <img className="login__icon button" src={headerLogo} alt="Лого"/>
      </Link>
      <form className="login__form" name="register" onSubmit={handleSubmit}>
        <h2 className="login__title">Добро пожаловать!</h2>
        <span className="login__plaseholder">Имя</span>
        <input className="login__input" type="text" name="name"
        id="register-name" placeholder="Имя" required onChange={handleChange}/>
        <span className="login__error">Что-то пошло не так</span>
        <span className="login__plaseholder">E-mail</span>
        <input className="login__input" type="email" name="email"
        id="register-email" required placeholder="Email" onChange={handleChange}/>
        <span className="login__error">Что-то пошло не так</span>
        <span className="login__plaseholder">Пароль</span>
        <input className="login__input" type="password" name="password"
        id="register-password" required placeholder="Пароль" onChange={handleChange}/>
        <span className="login__error">Что-то пошло не так</span>
        <button className="login__button button" type="submit">Зарегистрироваться</button>
      </form>
      <p className="login__link">Уже зарегистрированы?
      <Link to={"/signin"} className="login__link-src button" href="#">Войти</Link></p>
    </section>
  );
}

export default Register;