import React, { Component } from 'react'
import axios from 'axios'
import './District.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
			this.setState({
				districts: [... this.state.districts, res.data],
				name: ''
			})
		}).catch(err => console.log(err.response));
	}
	handleDelete = districtId => {
		axios.delete(`http://localhost:3001/api/districts/${districtId}`, this.state.config)
		.then(res => {
			console.log(res.data);
			const filteredDistrict = this.state.districts.filter(district => {
				return district._id !== districtId;
			});
			console.log(filteredDistrict);
			this.setState({
				districts: filteredDistrict
			});
		})
	}

	componentDidMount() {
		axios.get('http://localhost:3001/api/districts', this.state.config)
		.then(res => {
			console.log(res.data);
			this.setState({districts: res.data})
		}).catch(err => console.log(err.response));
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
					handleDelete={this.handleDelete}
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
						return <div className='row'  key={district._id}>
									<li className='list'>{district.name}</li>
									<FontAwesomeIcon onClick={() => props.handleDelete(district._id)} className='del' icon={faTimes} />
							   </div>
					})
				}
			</ul>
		</div>
	)
}

