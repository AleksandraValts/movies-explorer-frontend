import React from 'react';
import Header from '../Header/Header.js';
//import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import apiMain from '../../utils/ApiMain.js';
//import { useFormWithValidation } from '../../utils/Validator.js';

function Profile({ loggedIn, handleExit, currentUser, setCurrentUser }) {
  const [name, setName] = React.useState(currentUser.name);
  const [lastName, setLastName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [lastEmail, setLastEmail] = React.useState(currentUser.email);
  const [isVisibleButton, setVisibleButton] = React.useState(false);
  const [isButton, setButton] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleSubmit = (evt, data) => {
    evt.preventDefault();
    apiMain.changeUserInfo({name, email})
    .then((data) => {
     // setCurrentUser(data);
      setVisibleButton(false);
      setButton(false);
      setLastName(name);
      setLastEmail(email);
    })
    .catch((err) => {
      console.log(err);
      setErrorMessage('');
      setError(true);
      if (err === 400) {
        setErrorMessage('При обновлении профиля произошла ошибка');
      }
      if (err === 409) {
        setErrorMessage('Пользователь с таким email уже существует');
      }
      if (err === 500) {
        setErrorMessage('На сервере произошла ошибка');
      }
    });
  };

  function handleNameChange(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
    setName(value);
    if (value !== lastName) {
      setButton(true);
    } else {
      setButton(false);
    }
  }

  function handleEmailChange(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
    setEmail(value);
    if (value !== lastEmail) {
      setButton(true);
    } else {
      setButton(false);
    }
  }

  function showSaveBtn() {
    setVisibleButton(true);
  }

  return (
    <div className="app">
    <Header visibility={"none"}/>
    <form className="profile" onSubmit={handleSubmit} >
      <h2 className="profile__title">Привет, {name}!</h2>
        <div className="profile__list">
        
        <div className="profile__container">
            <label className="profile__item">Имя</label>
            <input id="name"
              className={ errors.name ? 'profile__item profile__input' : 'profile__item profile__input'}
              name="name" type="text" value={name} placeholder="Имя"
              minLength={2} maxLength={40} 
              onChange={handleNameChange} disabled={isVisibleButton ? false : true}/>
        </div>
        <span className="profile__input-error">{errors.name}</span>
        
        <div className="profile__container">
            <label className="profile__item">E-mail</label>
            <input className={ errors.name ? 'profile__item profile__input' : 'profile__item profile__input'}
             id="email" name="email" type="email" value={email} 
            onChange={handleEmailChange} disabled={isVisibleButton ? false : true}/>
        </div>
        <span className="profile__input-error profile__input-error_email">{errors.email}</span>
        
        <span className={!error ? "profile__error" : "profile__error"}>{errorMessage}</span>
      </div>
      
      {isVisibleButton
      ?
      (<div className="profile__save profile__save_none">
        <span className="profile__span">При обновлении произошла ошибка</span>
        <button className={
                !isValid  ? "profile__button-save_none profile__button-save button profile__button-save_disabled" 
                          : "profile__button-save_none profile__button-save button"}
                type="submit" disabled={(!isButton) && (!isValid ? true : false)}>Сохранить</button>
      </div>)
      : 
      (<div className="profile__buttons">
        <button className="profile__button button" type="submit" 
            onClick={(evt) => showSaveBtn(evt)}>Редактировать
        </button>
        <button className="profile__button profile__button-ex button" type="submit"
             onClick={handleExit}>Выйти из аккаунта
          </button>
      </div>)}
    </form>
    </div>
  );
}

export default Profile;