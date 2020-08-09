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
			 address: {
				 firstname: '',
				 lastname: '',
				 streetAddress: '',
				 cityName: '',
				 areaLocation: ''
			 }


		}
	}

	getCookieValue = (cname) =>  {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {
			c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	handlChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
		this.getCookieValue();

	}

	handleImageChange = e => {
		this.setState({myFile:e.target.files[0]});
		// console.log(e.target.files[0]);

		//Change image src to new Image
		this.setState({
			profileImg: URL.createObjectURL(e.target.files[0])
		})
	};

	handleCheckChange = e => {
		this.setState({hideContact: !this.state.hideContact})
	}

	uploadImg = () => {
		const formData = new FormData();
		formData.append('myFile', this.state.myFile);
		console.log(this.state.myFile);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
		};
		
        Axios.post('http://localhost:3001/api/uploads',formData ,config)
            .then((res) => {
				console.log(res);

				this.setState({
					filename: res.data.file.filename
				})
			}).catch((err) => console.log(err));
	}


	handleSubmit = e => {
		e.preventDefault();
		this.uploadImg();

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
