import { userConsts } from '../actions/user';

export default function usersReducer(state = {}, action) {
	switch (action.type) {
		case userConsts.USERS_SHOW_REQUEST:
			if (action.payload.status === 200)
				return { users: action.payload.data };
		break;
		default:
			return state;
	}
}