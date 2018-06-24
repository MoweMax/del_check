import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../actions/user';

class LogoutPage extends React.Component {
	constructor(props) {
		super(props);
		this.props.logout();
		this.props.history.push('/');
	}

	render(){
		return(
			<div></div>
		);
	}
}

export default connect(null, {logout})(LogoutPage);