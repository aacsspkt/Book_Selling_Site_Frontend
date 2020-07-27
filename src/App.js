import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login'
import Navigation from './components/Navigation'
import Register from './components/Register'



export default function App() {

	return (
		<div>
			<Navigation />
			<div class="main-content">		
				<BrowserRouter>
					<Route path='/' exact component={Home} />
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />


               
				</BrowserRouter>	
			</div>
		</div>
	)
	
}
