import React, { Component } from 'react'

export default class Register extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 
		}
	}
	
	render() {
		return (
		
			<div className='flex-center'>
                <div className='container'>
                    <h1 className='h1-center'>Register to B-Share</h1>
                    <h4 className='h4-center'>Enter your details below</h4>
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

                        <div className='flex-center'>
                            <button className='btnMain'>Next</button>
                        </div>
                    </form>
                </div>
            </div>
		
		)
	}
}
