import React, { Component } from 'react'
import defaultImg from './profilepic.jpeg'
import './ProfileDetail.css'
import Axios from 'axios'
import { Redirect  } from 'react-router-dom';
import {setCookie ,getCookie} from '../../cookie'

export default class ProfileSecond extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			_id: '',
			 mobileNo: '',
			 phoneNo: '',
			 hideContact: false,
			 filename: '',
			 myFile: null,
			 profileImg: defaultImg,
		     streetAddress: '',
			 cityName: '',
			 areaLocation: '',
			 firstName: '',
			 lastName: '',
			 isImageSelected: false,
			 submitted: false
		}
	}

	getCookieValue = cname => getCookie(cname);

	setCookieValue = (name, value) => setCookie(name, value);

	handlChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleImageChange = e => {
		this.setState({myFile:e.target.files[0]});
		//Change image src to new Image
		this.setState({
			profileImg: URL.createObjectURL(e.target.files[0]),
			isImageSelected: true
		})
	};

	handleCheckChange = e => {
		this.setState({hideContact: !this.state.hideContact})
	}

	uploadImg = () => {
		if (!this.state.isImageSelected) return;
		const formData = new FormData();
		formData.append('myFile', this.state.myFile);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
		};
		
        Axios.post('http://localhost:3001/api/uploads',formData ,config)
            .then((res) => {
				this.setState({
					filename: res.data.file.filename,
				})
				console.log(res.data.file.filename);
			}).catch((err) => console.log(err));
	}

	handleSubmit = e => {
		e.preventDefault();
		this.uploadImg();
		//To wait for upload res which contains profilePhoto file name.
		setTimeout(() => {
			const data = {
				profilePhoto: this.state.filename,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				contact: {
					mobileNo: this.state.mobileNo,
					phoneNo: this.state.phoneNo,
					hidePhone: this.state.hideContact,
				},
				address: {
					streetAddress: this.state.streetAddress,
					cityName: this.state.cityName,
					areaLocation: this.state.areaLocation,
				}	
			}
			console.log(data);
			Axios.post('http://localhost:3001/api/profiles', data)
			.then(res => {
				this.setState({submitted:true, _id: res.data._id});
				console.log(res.data);	
			}).catch(err => console.log(err));
		}, 2000);
	}
	
	componentDidMount() {
		this.setState({
			firstName: this.getCookieValue('firstName'),
			lastName: this.getCookieValue('lastName'),
			streetAddress: this.getCookieValue('streetAddress'),
			cityName: this.getCookieValue('cityName'),
			areaLocation: this.getCookieValue('areaLocation'),
		})
	}
		
	render() {
		if (this.state.submitted) {
			setCookie("profileId", this.state._id);
			return <Redirect to='/register'/>;
		} 
		return (
			<div className='flex-center'>
                <div className='container'>
                    <h1 className='h1-center'>Register to B-Share</h1>
                    <h4 className='h4-center'>Enter your details below</h4>
                    <form onSubmit={this.handleSubmit}>	
						<div id='profile'>
							<img id='profile-img' src={this.state.profileImg} alt='Profile' />
							{/* <input type='file' id='myFile' name='filename' onChange={this.handleImageChange} /> */}
							<div className='upload-btn-wrapper' onChange={this.handleImageChange}>
  								<button className='btnFile' onChange={this.handleImageChange}>Upload a file</button>
 								<input type='file' name='myfile' onChange={this.handleImageChange}/>
							</div>
						</div>
						
						<label htmlFor='mobileNo'>Mobile Number</label>
						<input value={this.state.mobileNo} name='mobileNo' type='text' onChange={this.handlChange} />

						<label htmlFor='phoneNo'>Phone No</label>
						<input value={this.state.phoneNo} type='text' name='phoneNo' onChange={this.handlChange}/>

						<label htmlFor='hideContact' className='checkbox-container'>
							<input id='hideContact' type='checkbox' value={this.state.hideContact} onChange={this.handleCheckChange}/>
							<span className='checkmark' />
							Hide contacts
						</label>

						<div className='flex-center'>
							<button className='btnMain'>Create</button>
						</div>
                    </form>
                </div>
            </div>
		)
	}
}
