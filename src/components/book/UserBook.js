import React, { Component } from 'react'
import BookItemGrid from './BookItemGrid'
import Navigation from '../navigation/Navigation'

export default class UserBook extends Component {
	render() {
		return (
			<>
				<Navigation />
				<div className='flex-center'>
					<div className='container'>
						<div id='top-ub'>
							<h1>Your posted books ...</h1>
							<button className='btnMain'>Add new book</button>
						</div>
						<BookItemGrid fromUserBook={true}/>
					</div>
				</div>
			</>
		)
	}
}
