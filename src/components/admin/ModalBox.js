import React from 'react'
import './ModalBox.css'


export default function ModalBox (props){

		return (
			<div>
				<div id='modal-box' className='modal'>
					<span onClick={props.hideModal} className='close' title='Close Modal'>&times;</span>
					<form className='modal-content'>
						<div className='modal-container'>
							<h1>Warning</h1>
							<p>You cannot undo this action. Click Yes to continue. </p>
							<div className='clearfix'>
								<button onClick={props.hideModal} type='button' className='modal-btn cancelbtn'>Cancel</button>
								<button onClick={props.handleDeleteAll} type='button' className='modal-btn deletebtn'>Yes</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	
}
