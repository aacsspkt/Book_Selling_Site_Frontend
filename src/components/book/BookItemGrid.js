import React, { Component } from 'react'
import Axios from 'axios'
import './BookItemGrid.css'

export default class BookItemGrid extends Component {
	constructor(props) {
		super(props)
		this.state = {
			books: [],
		}
	}

	handleClick = bookId => this.props.history.push(`/book/${bookId}`);
	
	componentDidMount() {
		Axios.get('http://localhost:3001/api/books')
		.then(res => {
			console.log(res.data);
			this.setState({books: res.data})
		}).catch(err => console.log(err.response));
	}
	
	render() {
		return (
			<div id='grid-container'>
				{
					this.state.books.map(book => {
						return  <div id="book-item-row" key={book._id} onClick={() => this.handleClick(book._id)}>
									<img id='book-item-img' src={"http://localhost:3001/uploads/" + book.image} alt='Book-item' />
									<h3>{book.title}</h3>
									<p> Rs. {book.cost}</p>
								</div>
					})
				}
			</div>
		)
	}
}
