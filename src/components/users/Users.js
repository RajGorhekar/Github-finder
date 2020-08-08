import React from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Users = ({ users, loading }) => {
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

Users.propTypes = {
	users: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
};

const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3,1fr)',
	gridGap: '1rem'
};

export default Users;
