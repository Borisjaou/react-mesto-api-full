import React from 'react';

function PopupWithForm(props) {
	return (
		<div
			className={`popup popup_type_${props.name} ${
				props.isOpen ? 'popup_is-opened' : null
			}`}
		>
			<div className='popup__inside'>
				<button
					type='button'
					className='popup__close'
					onClick={props.onClose}
				/>
				<h2 className='popup__title'>{props.title}</h2>
				<form className='blank' name={props.name} onSubmit={props.onSubmit}>
					{props.children}
					<button type='submit' className='blank__accept'>
						{props.buttonName}
					</button>
				</form>
			</div>
		</div>
	);
}
export default PopupWithForm;
