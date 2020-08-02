import React, { Component } from 'react'
import axios from 'axios'
import './District.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

export default class District extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			name:'',
			districts: [], //created for get req.
			config:{
				headers: {'Authorization': localStorage.getItem('token')}
			},
			districtId: '', //created for update
			isEdit: false
		}
	}

	handleChange = e => {
		this.setState({[e.target.name]: e.target.value})
	}

	handlePost = e => {
		if (!this.state.isEdit) {
			e.preventDefault();
			axios.post('http://localhost:3001/api/districts', {name: this.state.name}, this.state.config)
			.then(res => {
				this.setState({
					districts: [... this.state.districts, res.data],
					name: ''
				})
			}).catch(err => console.log(err.response));
		} else {
			e.preventDefault();
			axios.put(`http://localhost:3001/api/districts/${this.state.districtId}`, {name: this.state.name}, this.state.config)
			.then(res => {
				const updatedDistrict = this.state.districts.map(district => {
					if (this.state.districtId === district._id) {
						district.name = this.state.name
					}
					return district;
				})
				this.setState({
					districts: updatedDistrict,
					name: '',
					isEdit: 'false',
					districtId: ''
				})
			}).catch(err => console.log(err.response));
		}
	
	}

	editDistrict = districtId => {
		console.log(districtId);
		this.setState({
			name: this.state.districts.find(district => {
				return district._id === districtId;
			}).name,
			districtId: districtId,
			isEdit: true
		});
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

	clearText = e => {
		e.preventDefault();
		this.setState({
			name: '',
			isEdit: false,
			districtId: ''
		});
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
					clearText={this.clearText}
					isEdit={this.state.isEdit}
					/>
					<DistrictList 
					districts={this.state.districts}
					handleDelete={this.handleDelete}
					editDistrict={this.editDistrict}
					/>
				</div>
			</div>
		)
	}
}


 function DistrictForm(props) {
	return (
		<form className='districtForm'>
				<label htmlFor='name'>District Name</label>
				<input type='text' id='name' name='name'
				value={props.name}
				onChange={props.handleChange}/>
					
				{
					props.isEdit ? (
						<div className='flex-center'> 
							<button className='btnJoin' onClick={props.handlePost}>Update</button>
							<button id='btnCancel' className='btnJoin' onClick={props.clearText}>Cancel</button>
						</div>
					) : (	
						<div className='flex-center'>
							<button className='btnJoin' onClick={props.handlePost}>Add</button>
							<button id='btnCancel' className='btnJoin' onClick={props.clearText}>Clear</button>
						</div>
					) 
				}
				
				
								
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
									<div className='icons'>
									<FontAwesomeIcon className='edit' onClick={() => props.editDistrict(district._id)} icon={faEdit} />
									<FontAwesomeIcon onClick={() => props.handleDelete(district._id)} className='del' icon={faTimes} />
									</div>
							   </div>
					})
				}
			</ul>
		</div>
	)
}

