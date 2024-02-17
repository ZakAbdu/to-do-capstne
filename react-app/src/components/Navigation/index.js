import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import RightSideMenu from '../RightMenu';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='navigation-bar-container'>
			<div className='left-nav-group'>
				<li className='home-button'>
					<NavLink className='home-link' exact to='/'>To-Do</NavLink>
				</li>
			</div>
				<li className='profile-button-position'>
					<RightSideMenu />
				</li>
		</ul>
		
	);
}

export default Navigation;