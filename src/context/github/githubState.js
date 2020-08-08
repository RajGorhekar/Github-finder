import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS, GET_USER, CLEAR_USERS, GET_REPOS, SET_LOADING} from '../types';

const GithubState = props => {
    const initialState = {
        users : [],
        user : {},
        repos : [],
        loading : false
    }

    const [state ,dispatch] = useReducer(GithubReducer ,initialState)

    const searchUsers = async (text) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		if (res.data.items.length === 0) {
			// showAlert('No users Found', 'danger');
        }
        dispatch({
            type :SEARCH_USERS,
            payload : res.data.items 
        })
		// setUsers(res.data.items);
		// setLoading(false);
    };

    const getUser = async (username) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${username}?&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        dispatch({
            type :GET_USER,
            payload : res.data 
        })
		// setUser(res.data);
		// setLoading(false);
    };
    
    const getUserRepos = async (username) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
        // console.log(res.data);
        dispatch({
            type :GET_REPOS,
            payload : res.data 
        })
		// setRepos(res.data);
		// setLoading(false);
	};
    
    const clearUsers = () => dispatch({type : CLEAR_USERS})
    
    const setLoading = () => dispatch({type : SET_LOADING})


    return <GithubContext.Provider 
        value = {{
            users : state.users,
            user : state.user,
            repos : state.repos,
            loading : state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos,
        }}
    >
        {props.children }
    </GithubContext.Provider>

}

export default GithubState;