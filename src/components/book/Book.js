import React, { Component } from 'react'
import Jumbotron from './Jumbotron'
import './Book.css'
import './BookItemGrid'
import BookGrid from './BookItemGrid'

export default class Book extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 
		}
	}
	
	render() {
		return (
			<div className='flex-center'>
				<div className='container'>
					<Jumbotron />
					<div className='line'></div>
					<div className='line'></div>
					<BookGrid />


				</div>
			</div>
		)
	}
}
