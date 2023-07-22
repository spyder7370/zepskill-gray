import { combineReducers } from 'redux';
import newsReducer from './newsReducer';

const combinedReducers = combineReducers({
	newsReducer
});

export default combinedReducers;
