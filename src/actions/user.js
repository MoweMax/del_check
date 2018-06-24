import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import getRequest  from "../services/request-helper";

// localStorage.removeItem('users');
let users = JSON.parse(localStorage.getItem('users')) || [];
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios, {delayResponse: 500});

const links = {
	USERS_GET_ALL: '/users/all',
	USERS_REGISTER: '/users/register',
	USERS_LOGIN: '/users/auth',
	USER_ADD_POST: '/user/add_post',
	USER_GET_ALL_POSTS: '/user/all_posts',
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

mock.onPost(links.USERS_REGISTER).reply(config => {
	let data = JSON.parse(config.data);
	data.id = users.length + 1;
	users.push(data);
	localStorage.setItem('users', JSON.stringify(users));
	return [200, {id: data.id}];
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

mock.onGet(links.USER_GET_ALL_POSTS).reply(config => {
	let data = posts;
	return [200, {all_posts: data}];
});

export const userConsts = {
	REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
	REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
	REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

	LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
	LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
	LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

	LOGOUT: 'USERS_LOGOUT',

	USERS_SHOW_REQUEST: 'USERS_SHOW_REQUEST',

	USER_ADD_POST_REQUEST: 'USER_ADD_POST_REQUEST',
	USER_GET_ALL_POSTS: 'USER_GET_ALL_POSTS'
};

export function login(username, password, callback) {
	const request = getRequest( links.USERS_LOGIN , {username, password}, 'POST');

	request.then(user => localStorage.setItem('user', JSON.stringify(user.data)))
		.then(() => callback());

	return {
		type: userConsts.LOGIN_REQUEST,
		payload: request
	}

}

export function logout() {
	localStorage.removeItem('user');

	return {type: userConsts.LOGOUT};
}

export function getAllUsers(callback) {
	const request = getRequest( links.USERS_GET_ALL , {}, 'GET');

	request.then(() => callback());

	return {
		type: userConsts.USERS_SHOW_REQUEST,
		payload: request
	}
}

export function getAllPosts(callback) {
	const request = getRequest( links.USER_GET_ALL_POSTS , {}, 'GET');

	request.then(() => callback());

	return {
		type: userConsts.USER_GET_ALL_POSTS,
		payload: request
	}
}

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