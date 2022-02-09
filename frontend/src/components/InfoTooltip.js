import acceptedImage from '../../src/images/Unionaccepted.svg';
import errorImage from '../../src/images/UnionError.svg';

function InfoTooltip(props) {
	return (
		<div
			className={`popup popup_type_${props.name} ${
				props.status.isOpen ? 'popup_is-opened' : null
			}`}
		>
			<div className='tooltip__popup'>
				<button
					type='button'
					className='popup__close'
					onClick={props.onClose}
				/>
				<img
					className='tooltip__image'
					src={props.status.image === 'error' ? errorImage : acceptedImage}
					alt='Успешно'
				/>
				<h2 className='tooltip__text'>{props.status.text}</h2>
			</div>
		</div>
	);
}

export default InfoTooltip;
