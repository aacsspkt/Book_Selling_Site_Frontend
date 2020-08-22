import React from 'react'

export default function CategoryForm(props) {
	return (
		<form id='categoryForm'>
				<label htmlFor='name'>Category Name</label>
				<input type='text' id='name' name='name'
				value={props.name}
				onChange={props.handleChange}/>
				{
					props.isEdit ? (
						<div className='flex-center'> 
							<button className='btnJoin' onClick={props.handlePost}>Update</button>
							<button id='btnCancel' className='btnJoin' onClick={props.clearText}>Cancel</button>
						</div>
					) : (	
						<div className='flex-center'>
							<button className='btnJoin' onClick={props.handlePost}>Add</button>
							<button id='btnCancel' className='btnJoin' onClick={props.clearText}>Clear</button>
						</div>
					) 
				}			
		</form>
	)
}