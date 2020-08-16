import React, { Component } from 'react'
import District from '../district/District'
import { Switch, Link, Route } from 'react-router-dom';


export default class AdminDash extends Component {
	render() {
		return (
			<div>
				<ul>
					<Link to='/admin/district'><li>District</li></Link>
					<Link to='/admin/category'><li>Categories</li></Link>
				</ul>
				<Switch>
					<Route path='/admin/district' component={District}></Route>
				</Switch>
				
			</div>
		)
	}
}
