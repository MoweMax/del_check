import React, {Component} from 'react';
import Homepage from './components/Homepage';
import AddPost from './components/AddPost';
import AllUsers from './components/AllUsers';
import Logout from './components/Logout';
import Login from './components/Login';
import Register from './components/Register';
import PageNotFound from './components/common/PageNotFound';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect,
} from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path='/' component={Homepage}/>
					<Route path='/add-post' exact={true} component={AddPost}/>
					<Route path='/allusers' exact={true} component={AllUsers}/>
					<Route path='/logout' exact={true} component={Logout}/>
					<Route path='/login' exact={true} component={Login}/>
					<Route path='/register' exact={true} component={Register}/>
					<Route path='/page-not-found' exact={true} component={PageNotFound}/>
					<Redirect from='*' to='/page-not-found'/>
				</Switch>
			</Router>
		);
	}
}

export default App;
