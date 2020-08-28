import React, { Component } from 'react'
import District from './District'
import Category from './Category'
import { Switch, Link, Route } from 'react-router-dom'
import Navigation from '../navigation/Navigation'
import './AdminDash.css'

export default class AdminDash extends Component {
	render() {
		return (
			<div>
				<Navigation />
				<div className='flex-center'>
					<div className='container'>
						<div id='dash-panel'>
							<h1>Welcome Admin !</h1>
							<ul>
								<Link className='list-ad' to='/admin/district'><li>District</li></Link>
								<Link className='list-ad'  to='/admin/category'><li>Categories</li></Link>
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
