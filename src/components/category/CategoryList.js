import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function CategoryList(props) {
	return (
		<div>
			<ul className='ul-list'>
				{
					props.categories.map(category => {
						return <div className='row'  key={category._id}>
									<li className='list'>{category.name}</li>
									<div className='icons'>
										<FontAwesomeIcon className='edit' onClick={() => props.editCategory(category._id)} icon={faEdit} />
										<FontAwesomeIcon onClick={() => props.handleDelete(category._id)} className='del' icon={faTimes} />
									</div>
								</div>
					})
				}
			</ul>
		</div>
	)
}
