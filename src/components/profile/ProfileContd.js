import React, { Component } from 'react'
import defaultImg from './profilepic.jpeg'
import './ProfileContd.css'
import Axios from 'axios'
export default class ProfileSecond extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 mobileNo: '',
			 phoneNo: '',
			 hideContact: false,
			 filename: '',
			 myFile: null,
			 profileImg: defaultImg,


		}
	}

	handlChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleImageChange = e => {
		this.setState({myFile:e.target.files[0]});
		console.log(e.target.files[0]);
		this.setState({
			profileImg: URL.createObjectURL(e.target.files[0])
		})
	};

	handleCheckChange = e => {
		this.setState({hideContact: !this.state.hideContact})
	}

	handleSubmit = e => {
		e.preventDefault();
		const formData = new FormData();
        formData.append('myFile', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
		};
		
        Axios.post('http://localhost:3001/api/uploads',formData ,config)
            .then((res) => {
				this.setState({
					filename: res.data.file.filename
				})
				console.log(res);
            }).catch((err) => console.log(err));
    }
		
	render() {
		return (
			<div className='flex-center'>
                <div className='container'>
                    <h1 className='h1-center'>Register to B-Share</h1>
                    <h4 className='h4-center'>Enter your details below</h4>

                    <form onSubmit={this.handleSubmit}>	
						<div>
							<img id='profile-img' src={this.state.profileImg} alt="Profile" />
							<input type="file" id="myFile" name="filename" onChange={this.handleImageChange} />
						</div>
						
						<label htmlFor='mobileNo'>Mobile Number</label>
						<input value={this.state.mobileNo} name='mobileNo' type='text' onChange={this.handlChange} />

						<label htmlFor='phoneNo'>Phone No</label>
						<input value={this.state.phoneNo} type='text' name='phoneNo' onChange={this.handlChange}/>

						<label htmlFor='hideContact' className="checkbox-container">Hide contacts
							<input id='hideContact' type="checkbox" value={this.state.hideContact} onChange={this.handleCheckChange}/>
							<span className="checkmark" />
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
