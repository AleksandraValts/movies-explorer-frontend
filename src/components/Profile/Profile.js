import React from 'react';
import Header from '../Header/Header.js';
import apiMain from '../../utils/ApiMain.js';
import {CONFLICT, SERVER_ERROR, PROFILE_ERROR} from '../../utils/errors.js'

function Profile({ handleExit, currentUser }) {
  const [name, setName] = React.useState(currentUser.data.name);
  const [lastName, setLastName] = React.useState(currentUser.data.name);
  const [email, setEmail] = React.useState(currentUser.data.email);
  const [lastEmail, setLastEmail] = React.useState(currentUser.data.email);
  const [isVisibleButton, setVisibleButton] = React.useState(false);
  const [isButton, setButton] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isOk, setIsOk] = React.useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    apiMain.changeUserInfo({name, email})
    .then(() => {
      setVisibleButton(false);
      setButton(false);
      setErrorMessage('')
      setLastName(name);
      setLastEmail(email);
      setIsOk('Данные успешно обновлены');
    })
    .catch((err) => {
      console.log(err);
      setErrorMessage('');
      setError(true);
      if (err === 400) { setErrorMessage(PROFILE_ERROR)}
      if (err === 409) { setErrorMessage(CONFLICT)}
      if (err === 500) { setErrorMessage(SERVER_ERROR)}
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
  //  if (value !== lastName) { setButton(true)} 
  //  else { setButton(false)}
  }

  function handleEmailChange(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
    setEmail(value);
  //  if (value !== lastEmail) { setButton(true)} 
  //  else { setButton(false)}
  }

  function showSaveBtn() {
    setIsOk('')
    setVisibleButton(true);
  }
  
  const isButtonAble = isValid && (values.name !== lastName || values.email !== lastEmail);

  return (
    <div className="app">
    <Header visibility={"none"}/>
    <form className="profile" onSubmit={handleSubmit} >
      <h2 className="profile__title">Привет, {name}!</h2>
        <div className="profile__list">
        
        <div className="profile__container">
            <label className="profile__item">Имя</label>
            <input id="name" pattern='^(?!\s)[A-Za-zА-Яа-я\-\s]+$' type="text"
              className={ errors.name ? 'profile__item profile__input' : 'profile__item profile__input'}
              name="name" value={name} placeholder="Имя" minLength={2} maxLength={40} 
              onChange={handleNameChange} disabled={isVisibleButton ? false : true}/>
        </div>
        <span className="profile__input-error">{errors.name}</span>
        
        <div className="profile__container">
            <label className="profile__item">E-mail</label>
            <input className={ errors.name ? 'profile__item profile__input' : 'profile__item profile__input'}
             id="email" name="email" type="email" value={email} pattern='^.+@.+\..+$'
            onChange={handleEmailChange} disabled={isVisibleButton ? false : true}/>
        </div>
        <span className="profile__input-error profile__input-error_email">{errors.email}</span>
        
        <span className={!error ? "profile__error" : "profile__error"}>{errorMessage}</span>
        <span className={!isOk ? "profile__ok" : "profile__ok"}>{isOk}</span>
      </div>
      
      {isVisibleButton
      ?
      (<div className="profile__save profile__save_none">
        <span className="profile__span">При обновлении произошла ошибка</span>
        <button className={
                !isButtonAble  ? "profile__button-save_none profile__button-save button profile__button-save_disabled" 
                          : "profile__button-save_none profile__button-save button"}
                type="submit" disabled={(!isButton) && (!isButtonAble ? true : false)}>Сохранить</button>
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