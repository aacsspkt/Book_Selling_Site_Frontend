import React, { Component } from 'react'
import Navigation from '../navigation/Navigation'
import { Link, useParams } from 'react-router-dom'
import Axios from 'axios';

export default function UserBookDetail(props) {
	let { bookId } = useParams();
	return (
		<div>
			<Main bookId={bookId} history={props.history} />
		</div>
	)
}

 class Main extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			bookId: props.bookId,
			title: '',
			author: '',
			publication: '',
			condition: '',
			deliveryArea: '',
			cost: null,
			category: '',
			image: '',
			firstName: '',
			lastName: '',
			numberOfActiveAds: '',
			hidePhone: '',
			mobileNo: '',
			phoneNo: '',
			district: '',
			cityName: '',
			streetAddress: '',
			config:{
				headers: {'Authorization': localStorage.getItem('token')}
			}, 
		}
	}

	componentDidMount() {
		Axios.get(`http://localhost:3001/api/books/${this.state.bookId}`)
		.then(res => {
			console.log(res.data);
			this.setState({
				title: res.data.title,
				author: res.data.author,
				publication: res.data.publication,
				image: res.data.image,
				condition: res.data.condition,
				deliveryArea: res.data.deliveryArea,
				cost: res.data.cost,
				category: res.data.category.name,
				firstName: res.data.owner.firstName,
				lastName: res.data.owner.lastName,
				numberOfActiveAds: res.data.owner.numberOfActiveAds,
				hidePhone: res.data.owner.contact.hidePhone,
				mobileNo: res.data.owner.contact.mobileNo,
				phoneNo: res.data.owner.contact.phoneNo,
				district: res.data.owner.address.areaLocation,
				cityName: res.data.owner.address.cityName,
				streetAddress: res.data.owner.address.streetAddress
			})
			Axios.get(`http://localhost:3001/api/districts/${this.state.district}`)
			.then(res => {
				console.log(res.data.name);
				this.setState({district: res.data.name});
			}).catch(err => console.log(err.response));
		}).catch(err => console.log(err.response));
	}

	handleDelete = () => {
		Axios.delete('http://localhost:3001/api/userbooks/' + this.state.bookId, this.state.config)
		.then(res => {
			this.props.history.push('/user-book');
		})
	}
	
	render() {
		return (
			<>
				<Navigation />
				<div id="mini-nav">
						<Link to='/book'>Book</Link> &gt; <span>{this.state.title}</span>
				</div>
				<div className='flex-center'>
					<div  className='book-detail-container'>
						<div id='top-book-panel'>
							<div id='left-book-panel'>
								<img id='book-detail-item-img' src={"http://localhost:3001/uploads/" + this.state.image} alt='Book-item' />
							</div>
							<div id='right-book-panel'>
								<button onClick={this.handleDelete}>Delete</button>
								<h3 id='book-detail-h3'>{this.state.title}</h3>
								<p id='book-detail-author'> by <span id='auth'>{this.state.author}</span></p>
								<div className='line' />
								<p id='book-cost'> Rs. {this.state.cost}</p>
								<BookSpec
									publication={this.state.publication}
									condition={this.state.condition}
									category={this.state.category}
									deliveryArea={this.state.deliveryArea}
								/>
							</div>
						</div>
					</div>
				</div>
			</>	
		)
	}
}

function BookSpec (props) {
	return (
		<div id='book-detail-panel'>
			<div className='label-row'>
				<p><span>Category: </span>{props.category}</p>
			</div>
			<div className='label-row'>
				<p><span>Publication: </span>{props.publication}</p>
			</div>
			<div className='label-row'>
				<p><span>Condition: </span>{props.condition}</p>
			</div>
			<div className='label-row'>
				<p><span>Delivery Area: </span>{props.deliveryArea}</p>
			</div>
		</div>
	)
}
