import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
	const [name, setName] = React.useState('');
	const [description, setDescription] = React.useState('');
	const currentUser = React.useContext(CurrentUserContext);
	React.useEffect(() => {
		setName(currentUser.name || '');
		setDescription(currentUser.about || '');
	}, [currentUser, props.isOpen]);

	function handleChangeName(evt) {
		setName(evt.target.value);
	}
	function handleChangeDescription(evt) {
		setDescription(evt.target.value);
	}
	function handleSubmit(evt) {
		evt.preventDefault();
		props.onUpdateUser({
			name,
			about: description,
		});
	}

	return (
		<PopupWithForm
			title='Редактировать профиль'
			name='editProfile'
			buttonName='Сохарнить'
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			<input
				className='blank__field'
				id='name'
				type='text'
				required
				minLength='2'
				maxLength='40'
				value={name}
				onChange={handleChangeName}
			/>
			<span id='name-error' className='error'></span>
			<input
				className='blank__field'
				id='job'
				type='text'
				required
				minLength='2'
				maxLength='200'
				value={description}
				onChange={handleChangeDescription}
			/>
			<span id='job-error' className='error'></span>
		</PopupWithForm>
	);
}

export default EditProfilePopup;
