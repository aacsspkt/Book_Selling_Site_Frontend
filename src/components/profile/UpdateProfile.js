import React, { Component } from 'react'
import Navigation from '../navigation/Navigation'
import Axios from 'axios'
import { useParams } from 'react-router-dom'

export default function UpdateProfile (props) {
	let { profileId } = useParams();

	return (
		<Main id={profileId} history={props.history} />
	)
}

 class Main extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			districts:[],
			profileId: props.id,
			mobileNo: '',
            phoneNo: '',
            hideContact: false,
            filename: '',
            myFile: null,
            profileImg: '',
            streetAddress: '',
            cityName: '',
            areaLocation: '',
            firstName: '',
            lastName: '',
            isImageSelected: false,
			submitted: false,
			config:{
				headers: {'Authorization': localStorage.getItem('token')}
			}, 
			 
		}
	}

	handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    getDistrictId = districtId => {
        this.setState({areaLocation: districtId});
    }

    handleImageChange = e => {
		this.setState({
			myFile: e.target.files[0],
			profileImg: URL.createObjectURL(e.target.files[0]),
			isImageSelected: true
		});
    };

    handleCheckChange = () => {
        this.setState({
            hideContact: !this.state.hideContact
        })
    }

    uploadImg = () => {
		if (!this.state.isImageSelected)  return;
		
        const formData = new FormData();
        formData.append('myFile', this.state.myFile);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        Axios.post('http://localhost:3001/api/uploads', formData, config).then((res) => {
            this.setState({filename: res.data.file.filename})
            console.log(res.data.file.filename);
        }).catch((err) => console.log(err));
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		this.uploadImg();

		setTimeout(() => {
			const data = {
				profilePhoto: this.state.filename,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				contact: {
					mobileNo: this.state.mobileNo,
					phoneNo: this.state.phoneNo,
					hidePhone: this.state.hideContact
				},
				address: {
					streetAddress: this.state.streetAddress,
					cityName: this.state.cityName,
					areaLocation: this.state.district
				},
				profile: this.state.profile
			}
			Axios.put(`http://localhost:3001/api/profiles/${this.state.profileId}`, data)
			.then(res => {
				console.log(res.data);
				this.props.history.push('/profile');
			})
		}, 2000);
		
	}
	componentDidMount = () => {
		Axios.get(`http://localhost:3001/api/profiles/${this.state.profileId}`)
		.then(res => {
			console.log(res.data);
			this.setState({
				mobileNo: res.data.contact.mobileNo,
				phoneNo: res.data.contact.phoneNo,
				hideContact: res.data.contact.hideContact,
				streetAddress: res.data.address.streetAddress,
				cityName: res.data.address.cityName,
				firstName: res.data.firstName,
				lastName: res.data.lastName,
				profileImg: "http://localhost:3001/uploads/" + res.data.profilePhoto
			})
			Axios.get('http://localhost:3001/api/districts')
			.then(res => {
				console.log(res.data);
				this.setState({districts: res.data});
			}).catch(err => console.log(err));
		});
	
	}
	
	render() {
		return (
			<>
				<Navigation />
				<div className='flex-center'>
					<div className='container'>
						<h1 className='h1-center'>Update Profile</h1>
						<form onSubmit={e => this.handleSubmit(e)}>
							<div id='profile'>
								<label htmlFor='firstName'>First name</label>
								<input type='text' id='firstName' name='firstName'onChange={this.handleChange} value={this.state.firstName}/>
								<label htmlFor='lastName'>lastName</label>
								<input type='text' id='lastName' name='lastName'onChange={this.handleChange} value={this.state.lastName}/>
								<label htmlFor='streetAddress'>Street Address</label>
								<input type='text' id='streetAddress' name='streetAddress' onChange={this.handleChange} value={this.state.streetAddress}/>
								<label htmlFor='cityName'>City Name</label>
								<input type='text' id='cityName' name='cityName' onChange={this.handleChange} value={this.state.cityName} />
								<div id='profile-image-cp'>
									<label id='profile-img-label' htmlFor='profile-img'>Profile Picture</label>
									<div>
										<img id='profile-img' src= { this.state.profileImg } alt='Profile'/>
										<div className='upload-btn-wrapper'>
											<button className='btnFile'>Update pic</button>
											<input type='file' name='myfile' onChange={this.handleImageChange}/>
										</div>
									</div>
								</div>
							</div>
							<label htmlFor='mobileNo'>Mobile Number</label>
							<input type='text'id='mobileNo' name='mobileNo'onChange={this.handleChange} value={this.state.mobileNo} />
							<label htmlFor='phoneNo'>Phone No</label>
							<input type='text'name='phoneNo' onChange={ this.handleChange } value={this.state.phoneNo} />
							<label htmlFor='hideContact' className='checkbox-container'>
								<input id='hideContacts' type='checkbox' onChange={ this.handleCheckChange } value={this.state.hideContact} />
								<span className='checkmark'/>
								Hide contacts
							</label>
							<label htmlFor='areaLocation'>District</label>
							<div className="select">
								<select name="district" id="district" onChange={this.handleChange}>
									<option defaultValue="Choose district">Choose an option</option>
									{
										this.state.districts.map(district => {
										return <option key={district._id} value={district._id}>{district.name}</option>
										})
									}
								</select>
							</div>
							<div className='flex-center'>
								<button className='btnMain'>Create</button>
							</div>

						</form>
					</div>
				</div>
			</>
		)
	}
}
