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
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' name='username' onChange={this.handleChange}/>

                        <label htmlFor='email'>Email</label>
                        <input type='text' id='email' name='email' onChange={this.handleChange}/>

                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password'onChange={this.handleChange}/>

                        <div className='flex-center'>
                            <button className='btnMain'>Next</button>
                        </div>
                    </form>
                </div>
            </div>
		
		)
	}
}
