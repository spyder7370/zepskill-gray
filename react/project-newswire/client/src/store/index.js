import { createStore, compose, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import combinedReducers from './reducers/index';

const ReduxStore = () => {
	const webToolEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const middlewareEnhancers = applyMiddleware(promiseMiddleware);
	const composedEnhancers = webToolEnhancers(middlewareEnhancers);
	const store = createStore(combinedReducers, composedEnhancers);
	return store;
};

export default ReduxStore;
