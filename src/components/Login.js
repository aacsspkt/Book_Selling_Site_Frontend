import React, {Component} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';

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
		console.log("handleLogin: " + this.state.username + " " + this.state.password);
		axios.post('http://localhost:3001/api/users/login', this.state)
		.then(res => {
			console.log(res);
			localStorage.setItem('token', res.data.token);
			this.setState({ loggedIn: true});
		}).catch(err => console.log(err));		
	}

    render() {
		if (this.state.loggedIn) {
			return <Redirect to='/' />;
		}
        return (
            <div className='main-content flex-center'>
				<div>
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
            <p>Don't have an account?</p>
            <button className="btnOpt">Sign Up</button>
        </div>
    )
}

function LoginForm(props) {
    return (
        <div>
            <h1>Login in to B-Share</h1>
            <h4>Enter your details below</h4>
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
