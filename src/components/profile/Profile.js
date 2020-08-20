import React, {Component} from 'react'
import jwtDecode from 'jwt-decode';
import CreateProfile from './CreateProfile'
import DisplayProfile from './DisplayProfile';

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
			token: null
        }
    }

	getUserCredentialFromToken = () => {
		try {
			this.setState( {token: jwtDecode(localStorage.getItem('token'))} ); 
		} catch (error) {
			console.log(error);
		}
	}

	componentDidMount = () => {
		this.getUserCredentialFromToken();
	}

    render() {
		//if user has not logged in
		if(this.state.token === null || this.state.token === undefined) {
			return <h1>Login to view or create your profile</h1>
		}
		// if user has logged in but has not profile CreateProfileForm will be returned.
		if (this.state.token.profileId === null || this.state.token.profileId === undefined) {
			return <CreateProfile />
		}
		//if user has logged in and has profile, view profile is returned.
        return (
            <DisplayProfile token={this.state.token} />
        )
    }
}
