function PageNotFound(props) {
	return (
		<div className='page404'>
			<p>404</p>
			<p>страница не найдена</p>
			<button className='sign-page__button' onClick={props.onBack}>
				Назад
			</button>
		</div>
	);
}
export default PageNotFound;
