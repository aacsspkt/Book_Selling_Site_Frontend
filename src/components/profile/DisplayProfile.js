import React, { Component } from 'react'
import Axios from 'axios'
import './DisplayProfile.css'

export default class DisplayProfile extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			token: this.props.token,
			mobileNo: '',
            phoneNo: '',
            hidePhone: '',
            streetAddress: '',
            cityName: '',
            areaLocation: '',
            firstName: '',
            lastName: '',
			config:{
				headers: {'Authorization': localStorage.getItem('token')}
			}, 
		}
	}

	componentDidMount = () => {
		console.log(this.state.token.profileId);
		Axios.get(`http://localhost:3001/api/profiles/${this.state.token.profileId}`)
		.then(res => {
			if (res.data.contact.hidePhone) {
				this.setState({
					mobileNo: "Hidden",
					phoneNo: "Hidden"
				})
			} else {
				this.setState({
					mobileNo: res.data.contact.mobileNo,
					phoneNo: res.data.contact.phoneNo,
				})
			}

			this.setState({
				hidePhone: res.data.contact.hidePhone,
				streetAddress: res.data.address.streetAddress,
				cityName: res.data.address.cityName,
				areaLocation: res.data.address.areaLocation.name,
				firstName: res.data.firstName,
				lastName: res.data.lastName,
				profilePhoto: res.data.profilePhoto
			})
		}).catch(error => console.log(error));
	}

	handleUpdateBtnClick = profileId => {
		console.log(profileId+ " profileId Display Profile");
		this.props.history.push(`/profile-update/${profileId}`);
	}
	
	render() {		
		return (
			<div className='flex-center'>
				<div id='dp' className='container'>
					<div id='head-dp'>
						<h1 id='h1-dp'>Profile</h1>
						<button onClick={() => this.handleUpdateBtnClick(this.state.token.profileId)} id='btn-dp'>Update Profile</button>
					</div>
					<div id='main-panel-dp'>
						<div id='left-panel-dp'>
							{/* To avoid accessing to public/uploads before state.image is defined */}
							{
								this.state.profilePhoto === undefined ? (
									<img id='profile-img-dp' alt='Book-item' />
								) : (
									<img id='profile-img-dp' src={"http://localhost:3001/uploads/" + this.state.profilePhoto} alt='Book-item' />
								)
							}
							<div className='label-row'>
								<p><span>First Name: </span>{this.state.firstName}</p>
							</div>
							<div className='label-row'>
								<p><span>Last Name: </span>{this.state.lastName}</p>
							</div>
						</div>
						<div id='right-panel-dp'>
							<div id='contact-panel-dp'>
								<h3>Contact</h3>
								<div className='line' />
								<div className='label-row'>
									<p><span>Phone No: </span>{this.state.phoneNo}</p>
								</div>
								<div className='label-row'>
									<p><span>Mobile No: </span>{this.state.mobileNo}</p>
								</div>
							</div>
							<div id='address-panel-dp'>
								<h3>Address</h3>
								<div className='line' />
								<div className='label-row'>
									<p><span>Street Address: </span>{this.state.streetAddress}</p>
								</div>
								<div className='label-row'>
									<p><span>City Name: </span>{this.state.cityName}</p>
								</div>
								<div className='label-row'>
									<p><span>Area Location: </span>{this.state.areaLocation}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
