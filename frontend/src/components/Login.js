import React from 'react';

function Login(props) {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	React.useEffect(() => {
		setPassword('');
		setEmail('');
	}, []);
	function handleInputEmail(evt) {
		setEmail(evt.target.value);
	}
	function handleInputPassword(evt) {
		setPassword(evt.target.value);
	}
	function handleLogin(evt) {
		evt.preventDefault();
		props.onLogin({
			password,
			email,
		});
	}

	return (
		<div>
			<form className='blank' onSubmit={handleLogin}>
				<p className='sign-page__title'>Вход</p>
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
					type='password'
					value={password}
					required
					onChange={handleInputPassword}
				></input>
				›<span className='error'></span>
				<div className='button-container'>
					<button className='sign-page__button'>Войти</button>
				</div>
			</form>
		</div>
	);
}

export default Login;
