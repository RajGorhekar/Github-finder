import React, { Component, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class User extends Component {
	componentDidMount() {
		console.log(`${this.props.match.params.login}`);
		this.props.getUser(this.props.match.params.login);
		this.props.getUserRepos(this.props.match.params.login);
	}

	static propTypes = {
		user: PropTypes.object.isRequired,
        loading: PropTypes.bool,
        repos :PropTypes.array.isRequired,
		getuser: PropTypes.func.isRequired,
		getUserRepos : PropTypes.func.isRequired
	};

	render() {
		const {
			name,
			company,
			avatar_url,
			location,
			bio,
			blog,
			login,
			html_url,
			followers,
			following,
			public_repos,
			public_gists,
			hireable
		} = this.props.user;

		const { loading,repos } = this.props;
		console.log(this.props);
		if (loading) return <Spinner />;
		return (
			<div>
				<Link to='/' className='btn btn-light'>
					Back to search
				</Link>
				Hireable : {' '}
				{hireable ? (
					<i className='fas fa-check text-success' />
				) : (
					<i className='fas fa-times-circle text-danger' />
				)}
				<div className='card grid-2'>
					<div className='all-center'>
						<img src={avatar_url} className='round-img' alt='' style={{ width: '150px' }} />
						<h1>{name}</h1>
						<p>Location : {location}</p>
					</div>
					<div>
						{bio && (
							<Fragment>
								<h3>Bio</h3>
								<p>{bio}</p>
							</Fragment>
						)}
						<a href={html_url} className='btn btn-dark my-1'>
							Visit Github Profile
						</a>
						<ul>
							<li>
								{login && (
									<Fragment>
										<strong>Username :</strong> {login}
									</Fragment>
								)}
							</li>
							<li>
								{company && (
									<Fragment>
										<strong>Company :</strong> {company}
									</Fragment>
								)}
							</li>
							<li>
								{blog && (
									<Fragment>
										<strong>Website :</strong> {blog}
									</Fragment>
								)}
							</li>
						</ul>
					</div>
				</div>
				<div className='card text-center'>
					<div className='badge badge-primary'>Followers : {followers}</div>
					<div className='badge badge-success'>Following : {following}</div>
					<div className='badge badge-danger'>Public Repos : {public_repos}</div>
					<div className='badge badge-dark'>Publlic Gists : {public_gists}</div>
				</div>
                <Repos repos={repos}/>
                <br></br>
			</div>
		);
	}
}

export default User;
