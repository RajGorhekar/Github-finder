import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home.js'
import User from './components/users/User';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

import './App.css';

import GithubState from './context/github/githubState';
import AlertState from './context/alert/alertState';

const App = () => {
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

	return (
		<GithubState>
			<AlertState>
				<Router>
					<div className='App'>
						<Navbar />
						<div className='container'>
							<Alert />
							<Switch>
								<Route exact path='/' component={Home} />
								<Route exact path='/about' component={About} />
								<Route exact path='/user/:login' component={User} />
								<Route component={NotFound} />
							</Switch>
						</div>
					</div>
				</Router>
			</AlertState>
		</GithubState>
	);
};

export default App;
