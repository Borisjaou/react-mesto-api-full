const profilePopupButton = document.querySelector('#profile-popup');
const profilePopup = document.querySelector('#profile-opener');
const newPlaceButton = document.querySelector('#new-place-popup');
const placePopup = document.querySelector('#place-opener');
const newPlaceForm = document.querySelector('.new-place');
const imagePopup = document.querySelector('#image-zoom');
const signImageElement = document.querySelector('.pict-descr');
const zoomImageElement = document.querySelector('.zoom-pict');
const userInfoForm = document.querySelector('#user-profile');
const nameInputElement = document.querySelector('#name');
const statusInputElement = document.querySelector('#job');
const avatarInputElement = document.querySelector('#avatar');
const placeInputElement = document.querySelector('#where');
const imageInputElement = document.querySelector('#what');
const deletePopup = document.querySelector('#delete-card');
const editAvatarPopup = document.querySelector('#avatar-opener');
const editAvatarButton = document.querySelector('#avatar-button');
const editAvatarForm = document.querySelector('.avatar-form');

const config = {
	formSelector: '.blank',
	inputSelector: '.blank__field',
	submitButtonSelector: '.blank__accept',
	inputErrorClass: 'blank__field_error_alert',
	errorActiveClass: 'error_showed',
};

export {
	userInfoForm,
	placePopup,
	newPlaceForm,
	config,
	profilePopupButton,
	newPlaceButton,
	profilePopup,
	nameInputElement,
	statusInputElement,
	imagePopup,
	signImageElement,
	zoomImageElement,
	placeInputElement,
	imageInputElement,
	deletePopup,
	editAvatarPopup,
	editAvatarButton,
	editAvatarForm,
	avatarInputElement,
};
