import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login'
import Navigation from './components/Navigation'



export default function App() {

	return (
		<div>
			<Navigation />
			<div id="main-content">

			</div>
			<BrowserRouter>
				<Route path='/' exact component={Home} />
				<Route path='/login' component={Login} />
			</BrowserRouter>	
		</div>
	)
	
}
