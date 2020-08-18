import React from 'react'
import BasicAutoSuggest from './BasicAutoSuggest'


export default function CreateProfileForm(props) {
	return (
		<div>
			 <form onSubmit={(e) => props.handleSubmit(e)}>
				<div id='profile'>
					<label htmlFor='firstName'>First name</label>
					<input type='text' id='firstName' name='firstName'onChange={props.handleChange}/>
					<label htmlFor='lastName'>lastName</label>
					<input type='text' id='lastName' name='lastName'onChange={props.handleChange}/>
					<label htmlFor='streetAddress'>Street Address</label>
					<input type='text' id='streetAddress' name='streetAddress' onChange={props.handleChange}/>
					<label htmlFor='cityName'>City Name</label>
					<input type='text' id='cityName' name='cityName' onChange={props.handleChange} />
					<label htmlFor='areaLocation'>District</label>
					<BasicAutoSuggest getDistrictId={props.getDistrictId}/>
					<img id='profile-img' src={props.profileImg} alt='Profile'/>
					<div className='upload-btn-wrapper'>
						<button className='btnFile'>Upload a file</button>
						<input type='file' name='myfile'onChange={props.handleImageChange}/>
					</div>
				</div>
				<label htmlFor='mobileNo'>Mobile Number</label>
				<input 
					type='text'
					id='mobileNo'
					name='mobileNo'
					onChange={props.handleChange}
				/>
				<label htmlFor='phoneNo'>Phone No</label>
				<input 
					value={props.phoneNo}
					type='text'
					name='phoneNo'
					onChange={ props.handleChange } />

				<label htmlFor='hideContact' className='checkbox-container'>
					<input id='hideContact' type='checkbox'
						value={ props.hideContact }
						onChange={ props.handleCheckChange }/>
					<span className='checkmark'/>
					Hide contacts
				</label>
				<div className='flex-center'>
					<button className='btnMain'>Create</button>
				</div>
			</form>
		</div>
	)
}
