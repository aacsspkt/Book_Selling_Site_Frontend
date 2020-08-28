import React, { Component } from 'react'
import District from './District'
import Category from './Category'
import { Switch, Route } from 'react-router-dom'
import Navigation from '../navigation/Navigation'
import './AdminDash.css'

export default class AdminDash extends Component {
	constructor(props) {
		super(props)
	}
	
	handleClick = (route)  => {
		this.props.history.push('/admin/' + route);
	}
	render() {
		return (
			<div>
				<Navigation />
				<div className='flex-center'>
					<div className='container'>
						<div id='dash-panel'>
							<div id='welcome'>
								<h1>Welcome Admin !</h1>
							</div>
							<ul>
								<li onClick={() => this.handleClick('district')}>District</li>
								<li onClick={() => this.handleClick('category')}>Categories</li>
							</ul>
						</div>
					</div>
				</div>

				<Switch>
					<Route path='/admin/district' component={District}></Route>
					<Route path='/admin/category' component={Category}></Route>
				</Switch>
			</div>
		)
	}
}
