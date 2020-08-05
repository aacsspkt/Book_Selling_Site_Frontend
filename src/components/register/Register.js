import React, {Component} from 'react'
import './Register.css'
export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
			firstName: '',
			lastName: '',
			address: {
				streetAddress: '',
				cityName: '',
				areaLocation: '',
			}
		}
	}

	handleChange = e => {
		this.setState({[e.target.name]: e.target.value})
	}

    render() {
        return (
            <div>
                <div>
                    <h1 id='login-h1'>Register to B-Share</h1>
                    <h4 id='login-h4'>Enter your details below</h4>
                    <form>
                        <label htmlFor='firstName'>First name</label>
                        <input type='text' id='firstName' name='firstName' onChange={this.handleChange}/>

                        <label htmlFor='lastName'>lastName</label>
                        <input type='text' id='lastName' name='lastName' onChange={this.handleChange}/>

                        <label htmlFor='streetAddress'>Street Address</label>
                        <input type='text' id='streetAddress' name='streetAddress'onChange={this.handleChange}/>

                        <label htmlFor='cityName'>City Name</label>
                        <input type='text' id='cityName' name='cityName'/>

                        <label htmlFor='areaLocation'>Area Location</label>
                        <input type='text' id='areaLocation' name='areaLocation' onChange={this.handleChange}/>

                        {/* <label htmlFor='mobileNo'>Mobile Number</label>
                        <input type='text' id='mobileNo' name='mobileNo'/>

                        <label htmlFor='phoneNo'>Phone No</label>
                        <input type='text' id='phoneNo' name='phoneNo'/>

						<label class="checkbox-container">Hide contacts
							<input type="checkbox"/>
							<span class="checkmark"></span>
						</label> */}
                        <div className='flex-center'>
                            <button className='btnMain'>Next</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
