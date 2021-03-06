import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { register } from '../actions/user';
import PropTypes from 'prop-types';

class RegisterPage extends React.Component {
	static propTypes = {
		user: PropTypes.object,
		submitted: PropTypes.bool
	};

	static defaultProps = {
		user: {
			firstName: '',
			lastName: '',
			username: '',
			password: '',
		},
		submitted: false
	};

	state = {
		user: this.props.user,
		submitted: this.props.submitted
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		const { user } = this.state;
		this.setState({
			user: {
				...user,
				[name]: value
			}
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();

		this.setState({ submitted: true });
		const { user } = this.state;
		if (user.firstName && user.lastName && user.username && user.password) {
			this.props.register(user, () => {
				this.props.history.push('/login');
			});
		}
	}

	render() {
		const { user, submitted } = this.state;
		return (
			<div className="col-md-6 col-md-offset-3">
				<h2>Register</h2>
				<form name="form" onSubmit={this.handleSubmit}>
					<div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
						<label htmlFor="firstName">First Name</label>
						<input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
						{submitted && !user.firstName &&
						<div className="alert alert-danger">First Name is required</div>
						}
					</div>
					<div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
						<label htmlFor="lastName">Last Name</label>
						<input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
						{submitted && !user.lastName &&
						<div className="alert alert-danger">Last Name is required</div>
						}
					</div>
					<div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
						<label htmlFor="username">Username</label>
						<input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
						{submitted && !user.username &&
						<div className="alert alert-danger">Username is required</div>
						}
					</div>
					<div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
						<label htmlFor="password">Password</label>
						<input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
						{submitted && !user.password &&
						<div className="alert alert-danger">Password is required</div>
						}
					</div>
					<div className="form-group">
						<button className="btn btn-primary">Register</button>
						<Link to="/login" className="btn btn-link">Login</Link>
					</div>
				</form>
			</div>
		);
	}
}

function mapStateToProps({register}) {
	return { register };
}

export default connect(mapStateToProps, {register})(RegisterPage);