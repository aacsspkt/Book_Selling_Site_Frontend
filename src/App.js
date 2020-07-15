import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login'

export default function App() {

	return (
		<div>
			<BrowserRouter>
				<Route path='/' exact component={Home} />
				<Route path='/register' component={Login} />
			</BrowserRouter>	
		</div>
	)
	
}
