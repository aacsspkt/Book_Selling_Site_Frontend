import React from 'react'
import Jumbotron from './Jumbotron'
import './Book.css'
import './BookItemGrid'

import BookItemGrid from './BookItemGrid'

export default function Book(props) {
	return (
		<div className='flex-center'>
			<div className='container'>
				<Jumbotron />
				<div className='line'></div>
				<div className='line'></div>
				<BookItemGrid history={props.history} />
			</div>
		</div>
	)
}




