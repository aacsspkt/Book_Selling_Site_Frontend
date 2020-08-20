import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/login/Login'
import Navigation from './components/navigation/Navigation'
import Profile from './components/profile/Profile'
import District from './components/district/District'
import Book from './components/book/Book'
import Register from './components/register/Register'
import NoMatch from './components/NoMatch'
import AdminDash from'./components/admin/AdminDash'
import AdminRoute from './components/AdminRoute'
import BookDetail from './components/book/BookDetail'


export default function App() {
	return (
		<div>
			<BrowserRouter>
			<Navigation />
			<div className="main-content">		
				<Switch>
					<Route path='/book' exact component={Book} />
					<Route path='/book/:bookId' exact component={BookDetail} />
					<Route path='/register/' component={Register} />
					<Route path='/login' component={Login} />
					<Route path='/district' component={District} />
					<Route path='/profile' component={Profile} />
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
