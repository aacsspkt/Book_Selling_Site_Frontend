import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/login/Login'
import Navigation from './components/navigation/Navigation'
import Register from './components/register/Register'
import District from './components/district/District'


export default function App() {
	return (
		<div>
			<Navigation />
			<div className="main-content">		
				<BrowserRouter>
					<Route path='/' exact component={Home} />
					<Route path='/login' component={Login} />
					<Route path='/district' component={District} />
					<Route path='/register' component={Register} />
					

				</BrowserRouter>	
			</div>
		</div>
	)
	
}
