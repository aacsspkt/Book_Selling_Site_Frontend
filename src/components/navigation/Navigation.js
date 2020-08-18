import React, {Component} from 'react'
import './Navigation.css';
import logo from './logo.png'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

export default class Navigation extends Component {
	constructor(props) {
        super(props)

        this.state = {
			activeNav: '',
			toggle: 'false'
		}	
	}
	handleLogout = () => {
		localStorage.removeItem('token');
		this.props.history.push(`/`);
    }

	toggleMenu = () => {
		let nav = document.getElementById("nav");
		if (nav.className === "nav") {
			nav.className += " responsive";
		} else {
			nav.className = "nav";
		}

		let main = document.querySelector('.main-content');
		if (this.state.toggle){
			main.style.marginTop="10px";
			this.setState({toggle: !this.state.toggle});
			return;
		} 

		main.style.marginTop="70px";
		this.setState({toggle: !this.state.toggle});
	}
    render() {
        return (
			<div>
				<div className='nav' id='nav'>
					<NavLink to='/book' className='logo'><img id='logo' src={logo} alt='B-Share' /></NavLink>
					<NavLink to='/book'>Book</NavLink>
					<NavLink to='/register'>Sign Up</NavLink> 
					<NavLink to='/createprofile'>Profile</NavLink> 
					<NavLink to='/login'>Login</NavLink> 
					
					<div id='hamburger-menu' className='icon' href="#" onClick={this.toggleMenu}>
						<FontAwesomeIcon icon={faBars} />
					</div>
					<p onClick={this.handleLogout}>Logout</p>
				</div>
				
			</div>
        )
    }
}
