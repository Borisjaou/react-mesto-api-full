import React from 'react';
import ReactDOM from 'react-dom';
import './blocks/index.css';
import App from '../src/components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
reportWebVitals();
