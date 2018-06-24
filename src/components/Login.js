import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../actions/user';
import PropTypes from 'prop-types';

import Fingerprint2 from 'fingerprintjs2';

const fpInstance = new Fingerprint2();

class LoginPage extends React.Component {

	static propTypes = {
		username: PropTypes.string,
		password: PropTypes.string,
		submitted: PropTypes.bool,
		isLogged: PropTypes.bool,
		isIncorrect: PropTypes.bool
	};

	static defaultProps = {
		username: '',
		password: '',
		submitted: false,
		isLogged: false,
		isIncorrect: false
	};

	state = {
		username: this.props.username,
		password: this.props.password,
		submitted: this.props.submitted,
		isLogged: this.props.isLogged,
		isIncorrect: this.props.isIncorrect
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit = (e) => {
		e.preventDefault();

		this.setState({ submitted: true });
		const { username, password } = this.state;
		if (username && password) {

			this.props.login(username, password, () => {
				//collecting fingerprint
				fpInstance.get((result, components)=> {
					console.log("fingerprint: "+result);
					console.log("fingerprint components: ",components);
				});

				this.setState({ isIncorrect: false });
				this.setState({ isLogged: true });
				this.props.history.push('/');
			});
		}
	};

    componentDidMount() {
        console.log("mounted!");
        console.log(this);
        console.log(this.state);
        console.log(this.props);
        console.log(this.props.login.isLogged);
        if (this.props.login
			&& this.props.login.isLogged !== undefined
			&& this.props.login.isLogged)
            	this.props.history.push('/');
    }

	render() {
		const { username, password, submitted } = this.state;
		return (
			<div className="col-md-6 col-md-offset-3">
				{this.props.isIncorrect && <div className="alert alert-danger">Incorrect data</div>}
				<h2>Login</h2>
				<form name="form" onSubmit={this.handleSubmit}>
					<div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
						<label htmlFor="username">Username</label>
						<input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
						{submitted && !username &&
						<div className="alert alert-danger">Username is required</div>
						}
					</div>
					<div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
						<label htmlFor="password">Password</label>
						<input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
						{submitted && !password &&
						<div className="alert alert-danger">Password is required</div>
						}
					</div>
					<div className="form-group">
						<button className="btn btn-primary">Login</button>
						<Link to="/register" className="btn btn-link">Register</Link>
					</div>
				</form>
			</div>
		);
	}
}

function mapStateToProps({login}) {
	return {login};
}

export default connect(mapStateToProps, {login})(LoginPage);