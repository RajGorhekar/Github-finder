import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Users = () => {
	const githubContext = useContext(GithubContext);
	const { users, loading } = githubContext;
	if (loading) {
		return <Spinner />;
	} else if (users.length === 0) {
		return (
			<div>
				<br />
				<br />
				<div className='card my-2'>
					<h1>No Users to show Search for an Username or Try improving your search</h1>
				</div>
			</div>
		);
	} else {
		return <div style={userStyle}>{users.map((user) => <UserItem key={user.id} user={user} />)}</div>;
	}
};

const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3,1fr)',
	gridGap: '1rem'
};

export default Users;
