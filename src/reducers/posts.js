import { userConsts } from '../actions/user';
import merge from 'lodash/merge'

const initialState = { message_r: null, allPosts: []};

export default function postsReducer(state = initialState, action) {
	switch (action.type) {
		case userConsts.USER_ADD_POST_REQUEST: {
			return merge({}, state, {message_r: "You added post with id: "+action.payload.data.post_id});
		}
		case userConsts.USER_GET_ALL_POSTS: {
			return merge({}, state, {allPosts: action.payload.data.all_posts});
		}
		default:
			return state;
	}
}
