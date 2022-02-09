import React from 'react';
import logo from '../../src/images/logo.svg';
import { Link, Route, Switch } from 'react-router-dom';

function Header(props) {
	return (
		<header className='header sign-page__header'>
			<img className='header__logo' src={logo} alt='Место' />
			<Switch>
				<Route exact path='/'>
					<div className='sign-page'>
						<p className='sign-page__text'>{props.loggedIn.email}</p>
						<button className='sign-page__exit-button' onClick={props.signOut}>
							Выйти
						</button>
						)
					</div>
				</Route>
				<Route path='/sign-up'>
					<Link className='sign-page__text' to='/sign-in'>
						Войти
					</Link>
				</Route>
				<Route path='/sign-in'>
					<Link className='sign-page__text' to='/sign-up'>
						Регистрация
					</Link>
				</Route>
			</Switch>
		</header>
	);
}

export default Header;
