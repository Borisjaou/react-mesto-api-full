import React from 'react';

function ImagePopup(props) {
	return (
		<div className={`popup ${props.isOpen ? 'popup_is-opened' : null}`}>
			<div className='popup__image'>
				<button
					type='button'
					className='popup__close'
					id='close-image'
					onClick={props.onClose}
				></button>
				<img
					className='zoom-pict'
					src={props.card.link}
					alt={props.card.name}
				/>
				<div className='pict-descr'>{props.card.name}</div>
			</div>
		</div>
	);
}
export default ImagePopup;
