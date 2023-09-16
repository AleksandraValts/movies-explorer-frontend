import React from 'react';
import Header from '../Header/Header.js';
//import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import apiMain from '../../utils/ApiMain.js';
import { useFormWithValidation } from '../../utils/Validator.js';

function Profile({ loggedIn, handleExit, currentUser }) {
 // const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [lastName, setLastName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [lastEmail, setLastEmail] = React.useState(currentUser.email);
  const [isVisibleButton, setVisibleButton] = React.useState(false);
  const [isButton, setButton] = React.useState(false);
  
  const { values, handleChange, errors, isValid, resetForm} = useFormWithValidation();
  const [serverErrorMessage, setServerErrorMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    resetForm({ name, email });
  }, [currentUser]);

  React.useEffect(() => {
    setServerErrorMessage('');
  }, [values]);

  // Ошибки ввода данных
  React.useEffect(() => {
    const msgName = errors.name ? `Имя: ${errors.name}` : '';
    const msgEmail = errors.email ? `Почта: ${errors.email}` : '';
    setErrorMessage(`${msgName} ${msgEmail}`);
  }, [errors]);



  const handleSubmit = (evt, data) => {
    evt.preventDefault();

    apiMain.changeUserInfo({name, email})
    .then((data) => {
     // setCurrentUser(data);
     setServerErrorMessage('Информация о пользователе сохранена.');
      setVisibleButton(false);
      setButton(false);
      setLastName(name);
      setLastEmail(email);
      resetForm({ name, email });
    })
    .catch((err) => {
      switch (err) {
        case 400:
          setServerErrorMessage("Некорректное значение одного или нескольких полей");
          break;
        case 409:
          setServerErrorMessage(`Пользователь ${values.email} уже существует.`);
          break;
        default:
          setServerErrorMessage(`Невозможно сохранить данные на сервере. Ошибка ${err}.`);
        }
    });
  };

  function handleNameChange(evt) {
    const value = evt.target.value;
    setName(value);
    if (value !== lastName) {
      setButton(true);
    } else {
      setButton(false);
    }
  }

  function handleEmailChange(evt) {
    const value = evt.target.value;
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
            <input className="profile__item profile__input" id="name"
              name="name" type="text" value={name} placeholder="Имя"
              onChange={handleNameChange} disabled={isVisibleButton ? false : true}/>
        </div>
        <span className="profile__input-error">{errorMessage}</span>
        <div className="profile__container">
            <label className="profile__item">E-mail</label>
            <input className="profile__item profile__input" id="email"
            name="name" type="email" value={email} 
            onChange={handleEmailChange} disabled={isVisibleButton ? false : true}/>
        </div>
        <span className="profile__input-error">{errorMessage}</span>
      </div>
      {isVisibleButton
      ?
      (<div className="profile__save profile__save_none">
        <span className="profile__span">{serverErrorMessage}</span>
        <button className="profile__button-save_none profile__button-save button" 
                type="submit" disabled={!isButton}>Сохранить</button>
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