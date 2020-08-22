import React, { Component } from 'react'
import BasicAutoSuggest from './BasicAutoSuggest'
import './CreateProfile.css'
import defaultImg from './profilepic.jpeg'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'


export default class CreateProfileForm extends Component {
	constructor(props) {
        super(props)

        this.state = {
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
		this.setState(
			{
				myFile: e.target.files[0],
				profileImg: URL.createObjectURL(e.target.files[0]),
         	    isImageSelected: true}
			);
    };

    handleCheckChange = e => {
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

    handleSubmit = e => {
        e.preventDefault();
        this.uploadImg();
        // To wait for upload res which contains profilePhoto file name.
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
                    areaLocation: this.state.areaLocation
				},
				profile: this.state.profile
            }
            console.log(data);
            Axios.post('http://localhost:3001/api/profiles', data, this.state.config).then(res => {
                this.setState({submitted: true, _id: res.data._id});
                console.log(res.data);
			}).catch(err => console.log(err));
        }, 2000);
	}

	render() {
		if (this.state.submitted) {
			localStorage.removeItem('token');
			return <Redirect to='/login' />
		}
		return (
			<div className='flex-center'>
				<div className='container'>
					<h1 className='h1-center'>Create your profile</h1>
					<h4 className='h4-center'>Enter your details below</h4>
					<form onSubmit={e => this.handleSubmit(e)}>
						<div id='profile'>
							<label htmlFor='firstName'>First name</label>
							<input type='text' id='firstName' name='firstName'onChange={this.handleChange}/>
							<label htmlFor='lastName'>lastName</label>
							<input type='text' id='lastName' name='lastName'onChange={this.handleChange}/>
							<label htmlFor='streetAddress'>Street Address</label>
							<input type='text' id='streetAddress' name='streetAddress' onChange={this.handleChange}/>
							<label htmlFor='cityName'>City Name</label>
							<input type='text' id='cityName' name='cityName' onChange={this.handleChange} />
							<label htmlFor='areaLocation'>District</label>
							<BasicAutoSuggest getDistrictId={this.getDistrictId}/>
							<div id='profile-image-cp'>
								<label id='profile-img-label' htmlFor='profile-img'>Profile Picture</label>
								<div>
									<img id='profile-img' src={this.state.profileImg} alt='Profile'/>
									<div className='upload-btn-wrapper'>
										<button className='btnFile'>Upload a file</button>
										<input type='file' name='myfile'onChange={this.handleImageChange}/>
									</div>
								</div>
							</div>
						</div>
						<label htmlFor='mobileNo'>Mobile Number</label>
						<input type='text'id='mobileNo' name='mobileNo'onChange={this.handleChange}/>
						<label htmlFor='phoneNo'>Phone No</label>
						<input value={this.phoneNo} type='text'name='phoneNo' onChange={ this.handleChange } />
						<label htmlFor='hideContact' className='checkbox-container'>
							<input id='hideContact' type='checkbox'value={this.hideContact} onChange={ this.handleCheckChange }/>
							<span className='checkmark'/>
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
