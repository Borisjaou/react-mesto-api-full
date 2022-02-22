import React from 'react';
import '../blocks/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { auth } from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Switch, useHistory } from 'react-router';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import PageNotFound from './PageNotFound';

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [tooltip, setTooltip] = React.useState('');
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((value) => {
        console.log('Ошибка. Запрос не выполнен ' + value);
      });
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((value) => {
        console.log('Ошибка. Запрос не выполнен' + value);
      });
  }, []);


  // Проверка токена
  /* React.useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          console.log(data.token)
          localStorage.setItem('token', data.token);
          setLoggedIn({ loggedIn: true, email: data.email });
          history.push('/');
        })
        .catch((value) => {
          console.log('Ошибка. Запрос не выполнен' + value);
        });
    }
  }, []); */

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setLoggedIn(true);
        setLoggedIn({ loggedIn: true, email: data.email });
        history.push('/');
      })
      .catch((value) => {
        setLoggedIn(false);
        console.log('Ошибка. Запрос не выполнен' + value);
      });
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(name, link) {
    setSelectedCard({ name, link });
    setIsImagePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setTooltip('');
  }
  function handleUpdateUser({ name, about }) {
    api
      .editProfile(name, about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((value) => {
        console.log('Ошибка. Запрос не выполнен' + value);
      });
  }
  function handleUpdateAvatar({ avatar }) {
    api
      .editAvatar(avatar)
      .then((link) => {
        setCurrentUser(link);
        closeAllPopups();
      })
      .catch((value) => {
        console.log('Ошибка. Запрос не выполнен' + value);
      });
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((value) => {
        console.log('Ошибка. Запрос не выполнен' + value);
      });
  }
  function handleCardDelete(card) {
    api
      .deletCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((value) => {
        console.log('Ошибка. Запрос не выполнен' + value);
      });
  }
  function handleAddPlace({ name, link }) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((value) => {
        console.log('Ошибка. Запрос не выполнен' + value);
      });
  }
  function handleRegisterUser({ password, email }) {
    auth
      .registerUser(password, email)
      .then((res) => {
        if (res) {
          setTooltip({
            text: 'Вы успешно зарегистрировались!',
            image: 'accepted',
            isOpen: true,
          });
          history.push('/sign-in');
        }
      })
      .catch((value) => {
        setTooltip({
          text: 'Что-то пошло не так! Попробуйте еще раз.',
          image: 'error',
          isOpen: true,
        });
        console.log('Ошибка. Запрос не выполнен' + value);
      });
  }

  // Логин пользователя
  function handleLoginUser({ password, email }) {
    auth
      .loginUser(password, email)
      /*       .then((data) => {
              if (data.token !== 400) {
                localStorage.setItem('token', data.token);
                setLoggedIn({ loggedIn: true, email: email });
                history.push('/');
              }
            }) */
      .then(() => {
        setLoggedIn({ loggedIn: true, email: email });
        history.push('/');
      })
      .catch((value) => {
        setTooltip({
          text: 'Что-то пошло не так! Попробуйте еще раз.',
          image: 'error',
          isOpen: true,
        });
        console.log('Ошибка. Запрос не выполнен ' + value);
      });
  }

  function handleSignOut() {
    auth
      .logOutUser()
      .then((info) => {
        console.log(info)
        setLoggedIn('false');
        history.push('/sign-in');
      })
      .catch((value) => {
        setTooltip({
          text: 'Что-то пошло не так! Попробуйте еще раз.',
          image: 'error',
          isOpen: true,
        });
        console.log('Ошибка. Запрос не выполнен ' + value);
      });
    // localStorage.removeItem('token');

  }

  function handleGoBack() {
    history.goBack();
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='sheet'>
        <div className='page'>
          <Header loggedIn={loggedIn} signOut={handleSignOut} />
          <Switch>
            <ProtectedRoute
              exact
              path='/'
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path='/sign-up'>
              <Register onRegister={handleRegisterUser} />
            </Route>
            <Route path='/sign-in'>
              <Login onLogin={handleLoginUser} />
            </Route>
            <Route path='*'>
              <PageNotFound onBack={handleGoBack} />
            </Route>
          </Switch>
          <Footer />
        </div>
        <InfoTooltip status={tooltip} onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <PopupWithForm
          title='Вы уверены?'
          name='confirmDelete'
          buttonName='Да'
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
