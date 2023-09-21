import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';
import { useFormWithValidation } from "../../utils/Validator.js";

function Register(props) {
//  const [userData, setUserData] = React.useState({email: '', password: '', name: ''});
  const [values, errors, isValid, handleChange] =
    useFormWithValidation();
  

 // function handleChange(e) {
  //  const { name, value } = e.target;
   // setUserData({...userData, [name]: value})
  //}

 // function handleSubmit(e) {
 //   let { email, password, name } = userData;
 //   e.preventDefault();
  //  props.onRegister({ email, password, name })
  //    .catch(err => {console.error(err)})
 // }

  // Обработчик формы
  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = values;
    props.onRegister({ name, email, password });
  }
  


  return (
    <section className="login">
      <Link to={"/"}>
        <img className="login__icon button" src={headerLogo} alt="Лого"/>
      </Link>
      <form className="login__form" name="register" onSubmit={handleSubmit}>
        <h2 className="login__title">Добро пожаловать!</h2>
        
        <span className="login__plaseholder">Имя</span>
        <input type="text" name="name" minLength={2} maxLength={40}
        pattern='^(!\s)[A-Za-zА-Яа-я\s]+$'
        className={ errors.name ? 'login__input login__input-active' : 'login__input'}
        id="register-name" placeholder="Имя" required onChange={handleChange}/>
        <span className="login__error-active">{errors.name}</span>
        
        <span className="login__plaseholder">E-mail</span>
        <input type="email" name="email" pattern='^.+@.+\..+$'
        className={ errors.email ? 'login__input login__input-active' : 'login__input'}
        id="register-email" required placeholder="Email" onChange={handleChange}/>
        <span className="login__error-active">{errors.email}</span>
        
        <span className="login__plaseholder">Пароль</span>
        <input type="password" name="password" minLength="4"
        className={ errors.password ? "login__input login__input-active" : "login__input"}
        id="register-password" required placeholder="Пароль" onChange={handleChange}/>
        <span className="login__error-active login__input_last">{errors.password}</span>
        
        <span className={!props.error ? "login__error-app" : "login__error-app"}>{props.text}</span>

        <button
        disabled={!isValid ? true : false}
        className={!isValid  ? "login__button login__button_disabled" : "login__button button"}
        type="submit">Зарегистрироваться</button>
      </form>

      <p className="login__link">Уже зарегистрированы?
      <Link to={"/signin"} className="login__link-src button" href="#">Войти</Link></p>
    </section>
  );
}

export default Register;