import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	React.useEffect(() => {
		setEmail('');
		setPassword('');
	}, []);
	function handleInputEmail(evt) {
		setEmail(evt.target.value);
	}
	function handleInputPassword(evt) {
		setPassword(evt.target.value);
	}
	function handleSubmit(evt) {
		evt.preventDefault();
		props.onRegister({
			password,
			email,
		});
	}
	return (
		<div>
			<form className='blank' onSubmit={handleSubmit}>
				<p className='sign-page__title'>Регистрация</p>
				<input
					className='blank__field blank__enter-form'
					placeholder='Email'
					type='email'
					value={email}
					required
					onChange={handleInputEmail}
				></input>
				<span className='error'></span>
				<input
					className='blank__field blank__enter-form'
					placeholder='Пароль'
					value={password}
					type='password'
					required
					onChange={handleInputPassword}
				></input>
				<span className='error'></span>
				<div className='button-container'>
					<button className='sign-page__button'>Зарегистрироваться</button>
					<p className='sign-page__underline-text'>
						Уже зарегистрированны?{' '}
						<Link className='sign-page__underline-link' to='/sign-in'>
							Войти
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
}

export default Register;
