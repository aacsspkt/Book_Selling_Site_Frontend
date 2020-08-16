import React, {Component} from 'react'
import './Navigation.css';
import logo from './logo.png'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Router, Switch, Link, NavLink, Route } from 'react-router-dom';

import Login from '../login/Login'

export default class Navigation extends Component {
	constructor(props) {
        super(props)

        this.state = {
			activeNav: '',
			toggle: 'false'
		}	
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
					{/* <a className='logo'><img id='logo' src={logo} alt='B-Share' /></a> */}

					<NavLink to='/' className='logo'><img id='logo' src={logo} alt='B-Share' /></NavLink>
					
					<NavLink to='/profile'>Profile</NavLink> 
					
					{/* <a>News</a>
					<a>Contact</a>
					<a>About</a>
					<a className='icon' onClick={this.toggleMenu}>
						<FontAwesomeIcon icon={faBars} />
					</a> */}
				</div>
				<Switch>
					<Route path='/login'></Route>
				</Switch>
			</div>
        )
    }
}
