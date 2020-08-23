import React, { Component } from 'react'
import District from '../district/District'
import Category from '../category/Category'
import { Switch, Link, Route } from 'react-router-dom';
import Navigation from '../navigation/Navigation';

export default class AdminDash extends Component {
	render() {
		return (
			<div>
				<Navigation />
				<ul>
					<Link to='/admin/district'><li>District</li></Link>
					<Link to='/admin/category'><li>Categories</li></Link>
				</ul>
				<Switch>
					<Route path='/admin/district' component={District}></Route>
					<Route path='/admin/category' component={Category}></Route>
				</Switch>
			</div>
		)
	}
}
