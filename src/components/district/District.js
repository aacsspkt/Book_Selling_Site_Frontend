import React, { Component } from 'react'
import axios from 'axios'
import './District.css'



export default class District extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			name:'',
			districts: [],
			config:{
				headers: {'Authorization': localStorage.getItem('token')}
			},
		}
	}

	handleChange = e => {
		this.setState({[e.target.name]: e.target.value})
	}

	handlePost = e => {
		e.preventDefault();
		axios.post('http://localhost:3001/api/districts', {name: this.state.name}, this.state.config)
		.then(res => {
			console.log(res);
		}).catch(err => console.log(err.response));
	}

	componentDidMount() {
		axios.get('http://localhost:3001/api/districts', this.state.config)
		.then(res => {
			console.log(res.data);
			this.setState({districts: res.data})
			
		})
	}
	
	render() {
		return (
			<div className='flex-center'>
				<div className='container'>
					<h1 id='district-h1'>Manage District</h1>
					<DistrictForm
					handlePost={this.handlePost}
					handleChange={this.handleChange}
					name={this.state.name}
					/>
					<DistrictList 
					districts={this.state.districts}
					/>
				</div>
			</div>
		)
	}
}


 function DistrictForm(props) {
	return (
		<form className='districtForm' onSubmit={props.handlePost}>
				<label htmlFor='name'>District Name</label>
				<input type='text' id='name' name='name'
				value={props.name}
				onChange={props.handleChange}/>
				<div className='flex-center'>
					<button className='btnMainWide'>Add</button>
				</div>
		</form>
	)
}

function DistrictList(props) {
	return(
		<div>
			<ul className='ul-list'>
				{
					props.districts.map(district => {
						return <div className='row'> <li className='list' key={district._id}>{district.name}</li> </div>
					})
				}
			</ul>
		</div>
	)
}

