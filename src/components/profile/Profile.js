import React, {Component} from 'react'
import './Profile.css'
import { Redirect} from 'react-router-dom';
import BasicAutoSuggest from './BasicAutoSuggest'
export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
			firstName: '',
			lastName: '',
			streetAddress: '',
			cityName: '',
			areaLocation: '',
			submit: false
		}
	}

	handleChange = e => {
		this.setState({[e.target.name]: e.target.value})
	}

	getDistrictId = (districtId) => {
		this.setState({areaLocation: districtId});
	}

	setCookie = (name, value) => {
		var today = new Date();
		var expiry = new Date(today.getTime() + 1 * 24 * 3600 * 1000); 
	  
		document.cookie=name + "=" + escape(value) + "; path=/; expires=" + expiry.toGMTString() + "; secure";

	}

	storeValues = (e) => {
	  e.preventDefault();
	  this.setCookie("firstName", this.state.firstName);
	  this.setCookie("lastName", this.state.lastName);
	  this.setCookie("streetAddress", this.state.streetAddress);
	  this.setCookie("cityName", this.state.cityName);
	  this.setCookie("areaLocation", this.state.areaLocation);
	  this.setState({submit: true})
	}

    render() {
		if (this.state.submit) {
			return <Redirect to='/profileContd' />;
		}
        return (
            <div className='flex-center'>
                <div className='container'>
                    <h1 className='h1-center'>Profile</h1>
                    <h4 className='h4-center'>Let's create profile first ...</h4>
                    <form onSubmit={this.storeValues}>
                        <label htmlFor='firstName'>First name</label>
                        <input type='text' id='firstName' name='firstName' onChange={this.handleChange}/>

                        <label htmlFor='lastName'>lastName</label>
                        <input type='text' id='lastName' name='lastName' onChange={this.handleChange}/>

                        <label htmlFor='streetAddress'>Street Address</label>
                        <input type='text' id='streetAddress' name='streetAddress'onChange={this.handleChange}/>

                        <label htmlFor='cityName'>City Name</label>
                        <input type='text' id='cityName' name='cityName' onChange={this.handleChange} />

                        <label htmlFor='areaLocation'>District</label>

						<BasicAutoSuggest 
							getDistrictId={this.getDistrictId}
						/>
                        <div className='flex-center'>
                            <button className='btnMain'>Next</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
