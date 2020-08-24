import React, { Component } from 'react'
// import Axios from 'axios'
import './Book.css'
import BookItemGrid from './BookItemGrid'
import Navigation from '../navigation/Navigation'

export default function Book(props) {
	return (
		<>
			<Navigation />
			<div className='flex-center'>
				<div className='container'>
					<Jumbotron />
					<div className='line'></div>
					<div className='line'></div>
					<BookItemGrid history={props.history} fromBook={true} />
				</div>
			</div>
		</>
	)
}


 function Jumbotron() {
	return (
		<div id='jumbo'>
			<div id='container-jumbo-h1'>
				<h1 id='h1-jumbo'>Welcome to B-Share</h1>
			</div>
			<div id='container-jumbo-p'>
				<p><strong>bshare.com	</strong> is FREE online classified which enables individuals 
					as well as companies to list wide variety of new or old books online. 
					We at bshare.com believe that Internet is a great 
					communication channel for connecting buyers and sellers. bshare.com is perfect
					solution which helps to list your books for free. </p>
			</div>
		</div>
	)
 }

//  class BookItemGrid extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			books: [],
// 		}
// 	}

// 	handleClick = bookId => this.props.history.push(`/book/${bookId}`);
	
// 	componentDidMount() {
// 		Axios.get('http://localhost:3001/api/books')
// 		.then(res => {
// 			console.log(res.data);
// 			this.setState({books: res.data})
// 		}).catch(err => console.log(err.response));
// 	}
	
// 	render() {
// 		return (
// 			<div id='grid-container'>
// 				{
// 					this.state.books.map(book => {
// 						return  <div id="book-item-row" key={book._id} onClick={() => this.handleClick(book._id)}>
// 									<img id='book-item-img' src={"http://localhost:3001/uploads/" + book.image} alt='Book-item' />
// 									<h3>{book.title}</h3>
// 									<p> Rs. {book.cost}</p>
// 								</div>
// 					})
// 				}
// 			</div>
// 		)
// 	}
// }





