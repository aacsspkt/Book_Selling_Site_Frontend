import React from 'react'
import './ModalBox.css'


export default function ModalBox (props){

		return (
			<div>
				<div id='modal-box' class='modal'>
					<span onClick={props.hideModal} class='close' title='Close Modal'>&times;</span>
					<form class='modal-content'>
						<div class='modal-container'>
							<h1>Warning</h1>
							<p>You cannot undo this action. Click Yes to continue. </p>
							<div class='clearfix'>
								<button onClick={props.hideModal} type='button' class='modal-btn cancelbtn'>Cancel</button>
								<button onClick={props.handleDeleteAll} type='button' class='modal-btn deletebtn'>Yes</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	
}
