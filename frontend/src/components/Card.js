import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  console.log(props);
  console.log(currentUser);
  const isOwn = props.cardInfo.owner === currentUser._id;
  const cardDeleteButtonClassName = `places__delete ${isOwn ? 'places__delete' : 'places__delete_hidden'
    }`;
  const isLiked = props.cardInfo.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `places__like ${isLiked ? 'places__like_active' : 'places__like'
    }`;
  function handleClick() {
    props.onCardClick(props.cardInfo.name, props.cardInfo.link);
  }
  function handleLikeClick() {
    props.onCardLike(props.cardInfo);
  }
  function handleDeleteCard() {
    props.onCardDelete(props.cardInfo);
  }

  return (
    <figure className='places__card'>
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteCard}
        type='button'
      ></button>
      <img
        className='places__pict show-popup'
        id='zoom-popup'
        alt={props.cardInfo.name}
        src={props.cardInfo.link}
        onClick={handleClick}
      />
      <div className='places__footnote'>
        <figcaption className='places__about'>{props.cardInfo.name}</figcaption>
        <div className='places__like-container'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <div className='places__counter'>{props.cardInfo.likes.length}</div>
        </div>
      </div>
    </figure>
  );
}
export default Card;
