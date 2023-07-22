import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import ReduxStore from './store/index';

import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={ReduxStore()}>
			<App />
		</Provider>
	</React.StrictMode>
);
