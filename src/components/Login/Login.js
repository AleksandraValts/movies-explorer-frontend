import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';
import { useFormWithValidation } from "../../utils/Validator.js";

function Login(props) {
  //const [userData, setUserData] = React.useState({email: '', password: ''})
  const [values, errors, isValid, handleChange] = useFormWithValidation();
  
 // function handleChange(e) {
  //  const { name, value } = e.target;
  //  setUserData({...userData, [name]: value})
 // }
  
 // function handleSubmit(e) {
  //  e.preventDefault();
  //  props.onLogin(userData)
  //    .catch(err => {console.error(err)})
 // }

 function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values;
    props.onLogin({ email, password });
  }

  return (
    <section className="login">
      <Link to={"/"}>
        <img className="login__icon button" src={headerLogo} alt="Лого"/>
      </Link>
      <form className="login__form" name="login" onSubmit={handleSubmit}>
        <h2 className="login__title">Рады видеть!</h2>
        
        <span className="login__plaseholder">E-mail</span>
        <input  type="email" name="email" id="login-email"
        className={ errors.email ? 'login__input login__input-active' : 'login__input'}
        required placeholder="Email" onChange={handleChange}/>
        <span className="login__error-active">{errors.email}</span>
        
        <span className="login__plaseholder">Пароль</span>
        <input type="password" name="password" id="login-password" minLength="4"
        className={ errors.password ? "login__input login__input-active" : "login__input"}
        required placeholder="Пароль" onChange={handleChange}/>
        <span className="login__error-active login__input_last_log">{errors.password}</span>
        
        <span className={!props.error ? "login__error-app" : "login__error-app"}>{props.text}</span>

        <button 
        disabled={!isValid ? true : false}
        className={!isValid  ? "login__button log__button login__button_disabled" 
                             : "login__button button log__button"}
        type="submit">Войти</button>
      
      </form>
      <p className="login__link">Еще не зарегистрированы?
      <Link to={"/signup"} className="login__link-src button" href="#">Регистрация</Link></p>
    </section>
  );
}

export default Login;