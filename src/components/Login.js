import React, { Component } from 'react'

export default class Login extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 username: '',
			 password: '',
		}
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value});
	
	render() {
		return (
			<div>
				<FeaturePanel />
				<LoginPanel 
				username={this.state.username}
				password={this.state.password}
				handleChange={this.handleChange}
				/>
			</div>
		)
	}
}

function FeaturePanel() {
	return (
	  <div>
		<h1>B-Share</h1>
		<p>Peer to Peer Book Sharing System</p>
	  </div>
	)
  };

  function LoginPanel(props) {
	return (
		<div>
			<SignUp />
			<LoginForm />
		</div>
	)
  };

  function SignUp() {
	  return(
		  <div>
			<p>Don't have an account?</p>
			<button>Sign Up</button>
		  </div>
	  )
  }

  function LoginForm(props) {
	return(
	<div>
		<h1>Login in to B-Share</h1>
		<h4>Enter your details below</h4>
		<form >
			<label for='username'>Username</label>
			<input type='text' id='username' name='username' value={props.state.username} onChange={props.handleChange} />
			<label for='password'>Password</label>
			<input type='password' id='password' name='password' value={props.state.password} onChange={props.handleChange} />
			<button>Login</button>

		</form>
	</div>	  
	  )
}
  
  
