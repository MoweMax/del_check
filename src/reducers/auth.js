import { userConsts } from '../actions/user';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { isLogged: true, user } : {isLogged: false};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case userConsts.LOGIN_REQUEST:
			if(action.payload.status === 200)
				return {isLogged: true};
			else
				return state;
		break;
		case userConsts.LOGOUT:
			return {isLogged: false};
		default:
			return state;
	}
}