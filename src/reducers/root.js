import { combineReducers } from 'redux';
import homepageReducer from './homepage';
import authReducer from './auth';
import registerReducer from './register';
import usersReducer from './users';
import postsReducer from './posts';

export default combineReducers({
    homepageReducer,
	authReducer,
	registerReducer,
	usersReducer,
	postsReducer
});