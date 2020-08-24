import React, { Component } from 'react'
import BookItemGrid from './BookItemGrid'
import Navigation from '../navigation/Navigation'
import { Link } from 'react-router-dom'

export default function UserBook(props){
	return (
		<>
			<Navigation />
			<div className='flex-center'>
				<div className='container'>
					<div id='top-ub'>
						<h1>Your posted books ...</h1>
						<Link to='add-book'><button className='btnMain'>Add new book</button></Link>
					</div>
					<BookItemGrid history={props.history} fromUserBook={true}/>
				</div>
			</div>
		</>
	)
}
