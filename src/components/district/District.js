import React, { Component } from 'react'
import axios from 'axios'

export default class District extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			name:'',
			config:{
				headers: {'Authorization': localStorage.getItem('token')}
			}
		}
	}

	handleChange = e => {
		this.setState({[e.target.name]: e.target.value})
	}

	handlePost = e => {
		e.preventDefault();
		console.log(this.state.name);
		console.log(this.state.config);
		axios.post('http://localhost:3001/api/districts', {name: this.state.name}, this.state.config)
		.then(res => {
			console.log(res);
		}).catch(err => console.log(err.response));
	}
	
	render() {
		return (
			<div>
				<form onSubmit={this.handlePost}>
					<label htmlFor='name'>District Name</label>
					<input type='text' id='name' name='name'
					value={this.state.name}
					onChange={this.handleChange}/>
					<button>Add</button>
				</form>
			</div>
		)
	}
}
