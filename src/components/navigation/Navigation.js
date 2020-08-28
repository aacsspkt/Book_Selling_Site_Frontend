import React, {Component} from 'react'
import './Navigation.css';
import logo from './logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import jwtDecode from 'jwt-decode';


export default class Navigation extends Component {
	constructor(props) {
        super(props)

        this.state = {
			toggle: true,
			LoggedIn: false,
			token: null
		}	
	}

	handleLogout = () => {
		localStorage.removeItem('token');
		this.setState({token: null, LoggedIn: false});
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
			console.log(true)
			main.style.marginTop="0px";
			this.setState({toggle: !this.state.toggle});
			return;
		} else if (!this.state.toggle){
			console.log(false)
			main.style.marginTop="70px";
			this.setState({toggle: !this.state.toggle});
		}
		
	}

	handleMenuClick = () => {
		let main = document.querySelector('.main-content');
		main.style.marginTop="70px";
	}

	componentDidMount = () => {
		try {
			this.setState( {token: jwtDecode(localStorage.getItem('token')), LoggedIn: true} ); 
		} catch (error) {
		}
	}	

    render() {
		if (this.state.LoggedIn) {
			return (
				<LoggedInNavigation 
					toggleMenu={this.toggleMenu}
					handleLogout={this.handleLogout}
					handleMenuClick={this.handleMenuClick}
				/>
			)
		} else if (!this.state.LoggedIn) {
			return (
				<LoggedOutNavigation 
					toggleMenu={this.toggleMenu}
					handleLogout={this.handleLogout}
					handleMenuClick={this.handleMenuClick}
				/>	
			)
		}
	}
}


function LoggedOutNavigation(props) {
	return (
		<div>
			<div>
				<div className='nav' id='nav'>
					<NavLink to='/book' className='logo'><img id='logo' src={logo} alt='B-Share' /></NavLink>
					<NavLink to='/book' onClick={props.handleMenuClick}>Book</NavLink>
					<NavLink to='/register' onClick={props.handleMenuClick}>Sign Up</NavLink> 
					<NavLink to='/login' onClick={props.handleMenuClick}>Login</NavLink> 
					<div id='hamburger-menu' className='icon' href="#" onClick={props.toggleMenu}>
						<FontAwesomeIcon icon={faBars} />
					</div>
				</div>
			</div>
		</div>
	)
}

function LoggedInNavigation(props) {
	return (
		<div>
			<div className='nav' id='nav'>
				<NavLink to='/book'  className='logo'><img id='logo' src={logo} alt='B-Share' /></NavLink>
				<NavLink to='/book' onClick={props.handleMenuClick} >Books</NavLink>
				<NavLink to='/profile' onClick={props.handleMenuClick}>Profile</NavLink> 
				<NavLink to='/user-book' onClick={props.handleMenuClick}>Your Books</NavLink>
				<div id='hamburger-menu' className='icon' href="#" onClick={props.toggleMenu}>
					<FontAwesomeIcon icon={faBars} />
				</div>
				<NavLink to='/book' onClick={props.handleLogout}>Logout</NavLink>
			</div>
		</div>
	)
}


