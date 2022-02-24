import React from 'react';
import pencil from '../../src/images/VectorPpineappleApplePen2.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main>
      <section className='profile'>
        <div className='profile__account'>
          <div className='profile__avatar-container'>
            <img
              className='profile__pencil'
              alt='ярлык редактирования автара'
              src={pencil}
            />
            <img
              className='profile__avatar'
              alt='аватар'
              onClick={props.onEditAvatar}
              src={currentUser.avatar}
            />
          </div>
          <div className='profile__info'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              type='button'
              onClick={props.onEditProfile}
              className='profile__edit show-popup'
              id='profile-popup'
            ></button>
            <p className='profile__status'>{currentUser.about}</p>
          </div>
        </div>
        <button
          type='button'
          onClick={props.onAddPlace}
          className='profile__add show-popup'
          id='new-place-popup'
        ></button>
      </section>

      <section className='places'>
        {props.cards.map((item) => {
          return (
            <Card
              cardInfo={item}
              key={item._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}
export default Main;
