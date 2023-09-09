import React from 'react';
import Header from '../Header/Header.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Profile(props) {
  
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.about)
  }, [currentUser, props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({name, about: email});
  }
  
  function handleChangeUserName(e) {
    setName(e.target.value)
  }

  function handleChangeUserAbout(e) {
    setEmail(e.target.value)
  }


  return (
    <div className="app">
    <Header visibility={"none"}/>
    <form className="profile" onSubmit={handleSubmit} >
      <h2 className="profile__title">Привет, Виталий!</h2>
        <div className="profile__list">
        <div className="profile__container">
            <label className="profile__item">Имя</label>
            <input className="profile__item profile__input" id="name"
              name="name" type="text" value={name || ''} 
              onChange={handleChangeUserName}/>
        </div>
        <div className="profile__container">
            <label className="profile__item">E-mail</label>
            <input className="profile__item profile__input" id="email"
            name="name" type="email" value={email || ''} 
            onChange={handleChangeUserAbout} />
        </div>
      </div>
      <div className="profile__buttons">
        <button className="profile__button button" type="submit">Редактировать</button>
        <button className="profile__button profile__button-ex button" type="submit"
        onClick={props.onExit}
        >Выйти из аккаунта</button>
      </div>
      <div className="profile__save profile__save_none">
        <span className="profile__span">При обновлении произошла ошибка</span>
        <button className="profile__button-save_none profile__button-save button" type="submit">Сохранить</button>
      </div>
    </form>
    </div>
  );
}

export default Profile;