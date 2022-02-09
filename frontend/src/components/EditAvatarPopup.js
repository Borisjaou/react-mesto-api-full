import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
	const userAvatar = React.useRef(null);

	function handleSubmit(evt) {
		evt.preventDefault();
		props.onUpdateAvatar({
			avatar: userAvatar.current.value,
		});
	}

	return (
		<PopupWithForm
			title='Обновить аватар'
			name='editAvatar'
			buttonName='Сохранить'
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			<input
				ref={userAvatar}
				className='blank__field'
				id='avatar'
				type='url'
				placeholder='Ссылка на аватар'
				required
			/>
			<span id='avatar-error' className='error'></span>
		</PopupWithForm>
	);
}

export default EditAvatarPopup;
