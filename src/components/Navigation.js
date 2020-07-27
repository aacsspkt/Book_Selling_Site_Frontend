import React, {Component} from 'react'
import './Navigation.css';
import logo from './logo.png'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default class Navigation extends Component {
	constructor(props) {
        super(props)

        this.state = {
			activeNav: '',
			isHamburgerMenuActive: 'false'
		}	
	}

	makeResponsive = () => {

		let nav = document.getElementById("nav");
		if (nav.className === "nav") {
			nav.className += " responsive";
		} else {
			nav.className = "nav";
		}

		let main = document.querySelector('.main-content');
		if (this.state.isHamburgerMenuActive){
			main.style.marginTop="10px";
			this.state.isHamburgerMenuActive = !this.state.isHamburgerMenuActive;
			return;
		} 

		main.style.marginTop="70px";
		this.state.isHamburgerMenuActive = !this.state.isHamburgerMenuActive;
	
	}
    render() {
        return (
            <div>
                <div className='nav' id='nav'>
					<a className='logo'><img id='logo' src={logo} alt='B-Share' /></a>
                    <a className='active'>Home</a>
                    <a>News</a>
                    <a>Contact</a>
                    <a>About</a>
                    <a className='icon' onClick={this.makeResponsive}>
                     <FontAwesomeIcon icon={faBars} />
                    </a>
                </div>
            </div>
        )
    }
}
