import React, { Component } from 'react'
import Axios from 'axios';
import { Redirect,  useParams } from 'react-router-dom';


export default function Register() {
	let { profileId } = useParams();
	return (
		<div>
			<RegisterMain profile={profileId}/>
		</div>
	)
}

 class RegisterMain extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 profile: '',
			 username: '',
			 password: '',
			 email: '',
			 submitted: false,
			 profile: props.profile,
		}
	}

	handleChange = e => {
		this.setState({[e.target.name]: e.target.value})
	}

	handleSubmit = e => {
		e.preventDefault();
		console.log("Profile: " + this.state.profile);
		Axios.post('http://localhost:3001/api/users/register', this.state)
			.then(res => {
				this.setState({submitted:true});
				console.log(res.data);	
			}).catch(err => console.log(err));
	}
	
	render() {
		if (this.state.submitted) {
			return <Redirect to='/login'/>;
		}
		return (
			<div className='flex-center'>
                <div className='container'>
                    <h1 className='h1-center'>Register to B-Share</h1>
                    <h4 className='h4-center'>Enter your details below</h4>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' name='username' onChange={this.handleChange}/>

                        <label htmlFor='email'>Email</label>
                        <input type='text' id='email' name='email' onChange={this.handleChange}/>

                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password'onChange={this.handleChange}/>

                        <div className='flex-center'>
                            <button className='btnMain'>Register</button>
                        </div>
                    </form>
                </div>
            </div>
		)
	}
}
