import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import './App.css';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';
import axios from 'axios';

const App = () => {
	const [ users, setUsers ] = useState([]);
	const [ user, setUser ] = useState({});
	const [ loading, setLoading ] = useState(false);
	const [ repos, setRepos ] = useState([]);
	const [ alert, setAlert ] = useState(null);

	// async componentDidMount() {
	// 	console.log(`${process.env.REACT_APP_GITHUB_CLIENT_ID}`);
	// 	setState({ loading: true });
	// 	const res = await axios.get(
	// 		`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process
	// 			.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	// 	);
	// 	// console.log(res.data);
	// 	setState({ loading: false, users: res.data });
	// }

	const searchUsers = async (text) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		// console.log(res.data);
		if(res.data.items.length === 0){
			showAlert('No users Found','danger')
		}
		setUsers(res.data.items);
		setLoading(false);
	};

	const getUser = async (username) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${username}?&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		// console.log(res.data);
		setUser(res.data);
		setLoading(false);
	};

	const getUserRepos = async (username) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		// console.log(res.data);
		setRepos(res.data);
		setLoading(false);
	};

	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	const showAlert = (msg, type) => {
		setAlert({ msg, type });
		setTimeout(() => {
			setAlert(null);
		}, 3000);
	};

	return (
		<Router>
			<div className='App'>
				<Navbar />
				<div className='container'>
					<Alert alert={alert} />
					<Switch>
						<Route
							exact
							path='/'
							render={(props) => (
								<Fragment>
									<Search
										searchUsers={searchUsers}
										clearUsers={clearUsers}
										showClear={users.length > 0 ? true : false}
										setAlert={showAlert}
									/>
									<Users loading={loading} users={users} />
								</Fragment>
							)}
						/>
						<Route exact path='/about' component={About} />
						<Route
							exact
							path='/user/:login'
							render={(props) => (
								<User
									{...props}
									getUser={getUser}
									getUserRepos={getUserRepos}
									user={user}
									repos={repos}
									loading={loading}
								/>
							)}
						/>
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;
