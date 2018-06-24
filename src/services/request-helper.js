import axios from 'axios';
function authHeader() {
	// return authorization header with jwt token
	let user = JSON.parse(localStorage.getItem('user'));

	if (user && user.token) {
		return { 'Content-Type': 'application/json',
					'Auth': user.token };
	} else {
		return {'Content-Type': 'application/json'};
	}
}

export default function getRequest( link , params, type){
	const requestOptions = {
		method: type,
		headers: authHeader(),
		data: JSON.stringify(params),
		url: link
	};

	return axios(requestOptions);
}