import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
	const [name, setName] = React.useState('');
	const [link, setLink] = React.useState('');

	React.useEffect(() => {
		setName('');
		setLink('');
	}, [props.isOpen]);

	function handleAddName(evt) {
		setName(evt.target.value);
	}
	function handleAddLink(evt) {
		setLink(evt.target.value);
	}
	function handleSubmit(evt) {
		evt.preventDefault();
		props.onAddPlace({
			name,
			link,
		});
	}

	return (
		<PopupWithForm
			title='Новое место'
			name='addNewPlace'
			buttonName='Создать'
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			<input
				className='blank__field'
				id='where'
				value={name}
				onChange={handleAddName}
				type='text'
				placeholder='Название'
				required
				minLength='2'
				maxLength='30'
			/>
			<span id='where-error' className='error'></span>
			<input
				className='blank__field'
				id='what'
				type='url'
				value={link}
				onChange={handleAddLink}
				placeholder='Ссылка на картинку'
				required
			/>
			<span id='what-error' className='error'></span>
		</PopupWithForm>
	);
}

export default AddPlacePopup;
