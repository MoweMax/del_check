import { userConsts } from '../actions/user';

export default function registerReducer(state = {}, action) {
	switch (action.type) {
		case userConsts.REGISTER_REQUEST:
			return { };
		default:
			return state
	}
}