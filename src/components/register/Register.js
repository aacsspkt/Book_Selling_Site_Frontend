import React, {Component} from 'react'

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    render() {
        return (
            <div>
                <div>
                    <h1 id='login-h1'>Register to B-Share</h1>
                    <h4 id='login-h4'>Enter your details below</h4>
                    <form>
                        <label htmlFor='firstName'>First name</label>
                        <input type='text' id='firstName' name='firstName'/>

                        <label htmlFor='lastName'>lastName</label>
                        <input type='text' id='lastName' name='lastName'/>

                        <label htmlFor='streetAddress'>Street Address</label>
                        <input type='text' id='streetAddress' name='streetAddress'/>

                        <label htmlFor='cityName'>City Name</label>
                        <input type='text' id='cityName' name='cityName'/>

                        <label htmlFor='areaLocation'>Area Location</label>
                        <input type='text' id='areaLocation' name='areaLocation'/>

                        <label htmlFor='mobileNo'>Mobile Number</label>
                        <input type='text' id='mobileNo' name='mobileNo'/>

                        <label htmlFor='phoneNo'>Phone No</label>
                        <input type='text' id='phoneNo' name='phoneNo'/>

						<label htmlFor='hideContacts'>Hide contacts</label>
                        <input type='text' id='hideContacts' name='hideContacts'/>
{/* https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_custom_checkbox */}
						<label htmlFor='profilePicture'>Profile Picture</label>
                        <input type='text' id='profilePicture' name='profilePicture'/>

                        <div className='flex-center'>
                            <button className='btnMain'>Next</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
