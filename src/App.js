import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/login/Login'
import Navigation from './components/navigation/Navigation'
import Profile from './components/profile/Profile'
import ProfileContd from './components/profile/ProfileContd'
import District from './components/district/District'
import Book from './components/book/Book'


export default function App() {
	return (
		<div>
			<Navigation />
			<div className="main-content">		
				<BrowserRouter>
					<Route path='/' exact component={Home} />
					<Route path='/login' component={Login} />
					<Route path='/district' component={District} />
					<Route path='/profile' component={Profile} />
					<Route path='/profilecontd' component={ProfileContd} />
					<Route path='/book' component={Book} />
					
				</BrowserRouter>	
			</div>
		</div>
	)
	
}
