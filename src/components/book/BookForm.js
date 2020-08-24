import React, { Component } from 'react'
import defaultImg from './book-default.png'
import './BookForm.css'
import Axios from 'axios'
import Navigation from '../navigation/Navigation'
import { Redirect } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

export default class AddBook extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			token: null,
			title: '',
			author: '',
			publication: '',
			image: defaultImg,
			condition: 'New',
			deliveryArea: 'Within city',
			cost: null,
			category: '',
			categories: [],
			config:{
				headers: {'Authorization': localStorage.getItem('token')}
			}, 
			submitted: false,
			isUpdate: this.props.location.isUpdate,
			bookId: this.props.location.bookId
		}
	}

	handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
	
	handleImageChange = e => {
		this.setState({
			myFile: e.target.files[0],
			image: URL.createObjectURL(e.target.files[0]),
			isImageSelected: true
		});
	};
	
	uploadImg = () => {
        if (!this.state.isImageSelected)  return;
        const formData = new FormData();
        formData.append('myFile', this.state.myFile);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

		Axios.post('http://localhost:3001/api/uploads', formData, config)
		.then((res) => {
            this.setState({image: res.data.file.filename})
            console.log(res.data.file.filename);
        }).catch((err) => console.log(err));
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.uploadImg();

		if (this.state.category === '') 
			this.setState({category: this.state.categories[1]._id});

		if (this.state.isUpdate) {
			setTimeout(() => {
				Axios.put('http://localhost:3001/api/userbooks/' + this.state.bookId, this.state, this.state.config)
				.then(res => {
					this.setState({submitted: true});
					console.log(res.data);
				}).catch(err => console.log(err));
			}, 1000);
		} else {
			setTimeout(() => {
				Axios.post('http://localhost:3001/api/userbooks/', this.state, this.state.config)
				.then(res => {
					this.setState({submitted: true});
					console.log(res.data);
				}).catch(err => console.log(err));
			}, 1000);
		}
	}
	
	componentDidMount = () => {
		try {
			this.setState( {token: jwtDecode(localStorage.getItem('token'))} ); 
		} catch (error) {console.log(error)}

		Axios.get('http://localhost:3001/api/categories')
		.then(res => {
			console.log(res)
			this.setState({categories: res.data});
			if (this.state.isUpdate) {
				Axios.get('http://localhost:3001/api/books/' + this.state.bookId)
				.then(res =>{
					console.log(res);
					this.setState({
						title: res.data.title,
						author: res.data.author,
						image: res.data.image,
						condition: res.data.condition,
						cost: res.data.cost,
						category: res.data.category,
						publication: res.data.publication
					})
				});
			}
		}).catch(error => console.log(error));
	}

	render() {
		if (this.state.submitted) {
			return <Redirect to='/book' />
		}
		if (this.state.token === null || this.state.token === undefined) {
			return (
				<>
					<Navigation />
					<h1>Please create user account ...</h1>
				</>
			)
		}
		if (this.state.token.profileId === null || this.state.token.profileId === undefined) {
			return(
				<>
					<Navigation />
					<h1>Please create a profile to add book ...</h1>
				</>
			)
		}
		return (
			<>
				<Navigation />
				<div className='flex-center'>
					<div className='container'>
						<h1 className='h1-center'>Post your book ad ...</h1>
						<h4 className='h4-center'>Enter book details below</h4>
						<form onSubmit={e => this.handleSubmit(e)}>
							<div id='addBook'>
								<label htmlFor='title'>Title of book</label>
								<input type='text' id='title' name='title' value={this.state.title} onChange={this.handleChange}/>
								<label htmlFor='lastName'>Author of book</label>
								<input type='text' id='author' name='author' value={this.state.author} onChange={this.handleChange}/>
								<label htmlFor='publication'>Publication</label>
								<input type='text' id='publication' name='publication' value={this.state.publication} onChange={this.handleChange}/>
								<label htmlFor='cost'>Cost</label>
								<input type='text' id='cost' name='cost' value={this.state.cost} onChange={this.handleChange} />
								<label htmlFor='category'>Category</label>
								<div className="select">
									<select name="category" id="category" onChange={this.handleChange}>
										<option defaultValue disabled>Choose an option</option>
										{
											this.state.categories.map(category => {
											return <option value={category._id}>{category.name}</option>
											})
										}
									</select>
								</div>
								
							<label htmlFor='deliveryArea'>Delivery Area</label>
							<div className="select">
								<select name="deliveryArea" id="slct" onChange={this.handleChange} >
									<option defaultValue disabled>Choose an option</option>
									<option value="Within city">Within city</option>
									<option value="Near my area">Near my area</option>
									<option value="All over Nepal">All over Nepal</option>
								</select>
							</div>
							<label htmlFor='condition'>Condition of book</label>
							<div className="select">
								<select name="condition" id="slct" onChange={this.handleChange} >
									<option defaultValue disabled>Choose an option</option>
									<option value="New">New</option>
									<option value="Old">Old</option>
								</select>
							</div>
							<div id='book-image-ab'>
									<label id='book-img-label' htmlFor='book-img'>Book Picture</label>
									<div>
										<img id='image' src={this.state.image} alt='Book'/>
										<div className='upload-btn-wrapper'>
											<button className='btnFile'>Upload a pic</button>
											<input type='file' name='myfile' onChange={this.handleImageChange}/>
										</div>
									</div>
								</div>
							</div>
							
							<div className='flex-center'>
								<button className='btnMain'>Post</button>
							</div>
						</form>
						
					</div>
				</div>
			</>
		)
	}
}




