import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Col,
    NavbarBrand,
    Nav,
    NavLink
} from 'reactstrap'

class NavigationTop extends Component
{
    render () {
        return (
            <Col sm="12" md="12" lg="12">
                <Nav expand="md">
                    <NavbarBrand tag={Link} to='/'>LEARN OFF</NavbarBrand>
                    <NavLink tag={Link} to='/'>Homepage</NavLink>
                    <NavLink tag={Link} to='/page-not-found'>Page not found</NavLink>
					{this.props.authReducer.isLogged &&
					<NavLink tag={Link} to='/logout'>Logout</NavLink>
					}
                    {this.props.authReducer.isLogged &&
                    <NavLink tag={Link} to='/allusers'>All Users</NavLink>
                    }
                    {this.props.authReducer.isLogged &&
                    <NavLink tag={Link} to='/add-post'>Add post</NavLink>
                    }

					{this.props.authReducer.isLogged !== undefined
					&& !this.props.authReducer.isLogged
					&&
					<NavLink tag={Link} to='/login'>Login</NavLink>
					}
					{this.props.authReducer.isLogged !== undefined
					&& !this.props.authReducer.isLogged
					&&
					<NavLink tag={Link} to='/register'>register</NavLink>
					}
                </Nav>
            </Col>
        );
    }
}


function mapStateToProps({authReducer}) {
	return {authReducer};
}

export default connect(mapStateToProps)(NavigationTop);
