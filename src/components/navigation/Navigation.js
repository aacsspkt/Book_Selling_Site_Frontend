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
			activeNav: '',
			toggle: 'false',
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
			main.style.marginTop="10px";
			this.setState({toggle: !this.state.toggle});
			return;
		} 

		main.style.marginTop="70px";
		this.setState({toggle: !this.state.toggle});
	}



	componentDidMount = () => {
		try {
			this.setState( {token: jwtDecode(localStorage.getItem('token')), LoggedIn: true} ); 
		} catch (error) {
			console.log(error);
		}
	}	

    render() {
		if (this.state.LoggedIn) {
			return (
				<LoggedInNavigation 
					toggleMenu={this.toggleMenu}
					handleLogout={this.handleLogout}
				/>
			)
		} else if (!this.state.LoggedIn) {
			return (
				<LoggedOutNavigation 
					toggleMenu={this.toggleMenu}
					handleLogout={this.handleLogout}
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
					<NavLink to='/book'>Book</NavLink>
					<NavLink to='/register'>Sign Up</NavLink> 
					<NavLink to='/login'>Login</NavLink> 
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
				<NavLink to='/book' className='logo'><img id='logo' src={logo} alt='B-Share' /></NavLink>
				<NavLink to='/book'>Book</NavLink>
				<NavLink to='/profile'>Profile</NavLink> 
				<div id='hamburger-menu' className='icon' href="#" onClick={props.toggleMenu}>
					<FontAwesomeIcon icon={faBars} />
				</div>
				<NavLink to='/book' onClick={props.handleLogout}>Logout</NavLink>
			</div>
		</div>
	)
}


