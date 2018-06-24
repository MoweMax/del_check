import React from 'react';
import {connect} from 'react-redux';
import MainLayout from "./common/layout/Main";

import {getAllUsers} from '../actions/user';

class AllUsers extends React.Component {
	constructor(props) {
		// console.log("props from allUser", props);
		super(props);

		this.state = {
			users: {}
		};
		this.props.getAllUsers(() => {});
	}

	renderEntry(userData) {
		const {firstName, lastName, username, password} = userData;

		return (
			<tr key={username}>
				<td>{firstName}</td>
				<td>{lastName}</td>
				<td>{username}</td>
				<td>{password}</td>
			</tr>
		);
	}

	render() {
		return (
			<div>
				<MainLayout>
					<div className="container">
						<div className="starter-template">
							<table className="table table-hover">
								<thead>
								<tr>
									<td>First name</td>
									<td>Sec name</td>
									<td>username</td>
									<td>pass</td>
								</tr>
								</thead>
								<tbody>
								{ this.props.usersReducer.users && this.props.usersReducer.users.users.map(this.renderEntry) }
								</tbody>
							</table>
							{ !this.props.usersReducer.users && <div className="text-center">No Data to display</div>}
						</div>
					</div>
				</MainLayout>
			</div>
		);
	};
}

function mapStateToProps({usersReducer}) {
	return {usersReducer};
}

export default connect(mapStateToProps, {getAllUsers})(AllUsers);
