import React, {Component} from 'react'
import Axios from 'axios'
import { Redirect, Link } from 'react-router-dom';
import './Login.css'

export default class LoginPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
			password: '',
			loggedIn: false
        }
    }
	handleChange = e => this.setState({[e.target.name]: e.target.value});
	
	handleLogin = e => {
		e.preventDefault();
		Axios.post('http://localhost:3001/api/users/login', this.state)
		.then(res => {
			console.log(res.data.token);
			localStorage.setItem('token', res.data.token);
			this.setState({ loggedIn: true});
		}).catch(err => console.log(err));		
	}

    render() {
		if (this.state.loggedIn) {
			return <Redirect to='/' />;
		}
        return (
            <div className="flex-center">
				<div className="container">
				
					<LoginForm 
						username={this.state.username}
						password={this.state.password}
						handleChange={this.handleChange}
						handleLogin={this.handleLogin}
					/>
					<SignUp/>
				
				</div>
            </div>
        )
    }
};

function SignUp() {
    return (
        <div>
            <p id='link-signUp'>Don't have an account? <Link to='/register'>Sign Up</Link></p>
            
        </div>
    )
}

function LoginForm(props) {
    return (
        <div>
            <h1 className='h1-center'>Login in to B-Share</h1>
            <h4 id='h4-center'>Enter your details below</h4>
            <form onSubmit={props.handleLogin}>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' name='username'
                    value={props.username}
                    onChange={props.handleChange}
					/>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password'
					value={props.password}
					onChange={props.handleChange}
					/>
				<div className="flex-center">
					<button className="btnMain">Login</button>
				</div>
            </form>
		
        </div>
    )
}
