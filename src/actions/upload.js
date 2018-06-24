import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import getRequest  from "../services/request-helper";

// localStorage.removeItem('users');
let users = JSON.parse(localStorage.getItem('users')) || [];
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios, {delayResponse: 500});

const links = {
	UPLOAD_FOLDER: '/upload/'
}

mock.onPost(links.USERS_LOGIN).reply(config => {
	let data = JSON.parse(config.data);
	let filteredUsers;
	if ((filteredUsers = users.filter(user => {
			return user.username === data.username && user.password === data.password
		})).length) {
		return [200, {
			id: filteredUsers[0].id,
			username: data.username,
			firstName: data.firstName,
			lastName: data.lastName,
			token: 'fake-jwt-token'
		}];
	} else {
		return [500, {message:'2222222'}];
	}
});

mock.onPost(links.USER_ADD_POST).reply(config => {
	let data = JSON.parse(config.data);
	data.post_id = posts.length + 1;
	posts.push(data);
	localStorage.setItem('posts', JSON.stringify(posts));
	return [200, {post_id: data.post_id}];
});

mock.onGet(links.USERS_GET_ALL).reply(config => {
	let data = users;
	return [200, {users: data}];
});
export const userConsts = {
	UPLOAD_POST_IMG: 'USERS_REGISTER_REQUEST'
};

export function register(user, callback) {
	const request = getRequest( links.USERS_REGISTER, user, 'POST');

	request.then(() => callback());

	return {
		type: userConsts.REGISTER_REQUEST,
		payload: request
	}
}

export function addPost(post, callback) {
	const request = getRequest( links.USER_ADD_POST, post, 'POST');

	request.then(() => callback());

	return {
		type: userConsts.USER_ADD_POST_REQUEST,
		payload: request
	}
}