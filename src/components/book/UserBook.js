import React from 'react'
import BookItemGrid from './BookItemGrid'
import Navigation from '../navigation/Navigation'
import { Link } from 'react-router-dom'
import './UserBook.css' 

export default function UserBook(props){
	return (
		<>
			<Navigation />
			<div className='flex-center'>
				<div className='container'>
					<div id='top-ub'>
						<h1 id='h1-ub'>Your books ...</h1>
						<Link to='add-book'><button className='btnMain'>Add new book</button></Link>
					</div>
					<BookItemGrid history={props.history} fromUserBook={true}/>
				</div>
			</div>
		</>
	)
}
