import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/login/Login'
import Navigation from './components/navigation/Navigation'
import Profile from './components/profile/Profile'
import ProfileDetail from './components/profile/ProfileDetail'
import District from './components/district/District'
import Book from './components/book/Book'
import Register from './components/register/Register'
import PrivateRoute from './components/PrivateRoute'
import NoMatch from './components/NoMatch'
import AdminDash from'./components/admin/AdminDash'
import AdminRoute from './components/AdminRoute'



export default function App() {
	return (
		<div>
			<BrowserRouter>
			<Navigation />
			<div className="main-content">		
				<Switch>
					<Route path='/' exact component={Book} />
					<Route path='/register' component={Register} />
					<Route path='/login' component={Login} />
					<Route path='/district' component={District} />
					<Route path='/profile' component={Profile} />
					<Route path='/profiledetail' component={ProfileDetail} />
					<AdminRoute path='/admin' component={AdminDash} />
					<Route>
						<NoMatch />
					</Route>
				</Switch>
			</div>
			</BrowserRouter>	
		</div>
	)
	
}
