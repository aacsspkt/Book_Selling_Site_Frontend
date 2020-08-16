import React, { Component } from 'react'
import Axios from 'axios'
import '../district/District.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import ModalBox from '../modalbox/ModalBox';


export default class Category extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			name:'',
			categories: [], //created for get req.
			config:{
				headers: {'Authorization': localStorage.getItem('token')}
			},
			categoryId: '', //created for update
			isEdit: false
		}
	}

	handleChange = e => {
		this.setState({[e.target.name]: e.target.value})
	}

	handlePost = e => {
		if (!this.state.isEdit) {
			e.preventDefault();
			Axios.post('http://localhost:3001/api/categories', {name: this.state.name}, this.state.config)
			.then(res => {
				this.setState({
					categories: [...this.state.categories, res.data],
					name: ''
				})
			}).catch(err => console.log(err.response));
		} else {
			e.preventDefault();
			Axios.put(`http://localhost:3001/api/categories/${this.state.categoryId}`, {name: this.state.name}, this.state.config)
			.then(res => {
				const updatedCategory = this.state.categories.map(category => {
					if (this.state.categoryId === category._id) {
						category.name = this.state.name
					}
					return category;
				})
				this.setState({
					categories: updatedCategory,
					name: '',
					isEdit: 'false',
					categoryId: ''
				})
			}).catch(err => console.log(err.response));
		}
	}

	editCategory = categoryId => {
		console.log(categoryId);
		this.setState({
			name: this.state.categories.find(category => {
				return category._id === categoryId;
			}).name,
			categoryId: categoryId,
			isEdit: true
		});
	}

	handleDelete = categoryId => {
		Axios.delete(`http://localhost:3001/api/categories/${categoryId}`, this.state.config)
		.then(res => {
			console.log(res.data);
			const filteredCategory = this.state.categories.filter(category => {
				return category._id !== categoryId;
			});
			console.log(filteredCategory);
			this.setState({
				categories: filteredCategory
			});
		}).catch(err => console.log(err));
	}

	handleDeleteAll = () => {
		Axios.delete('http://localhost:3001/api/categories/', this.state.config)
		.then(res => {
			console.log(res.data);
			this.setState({
				categories: []
			});
			this.hideModal()
		}).catch(err => console.log(err));
	}

	clearForm = e => {
		e.preventDefault();
		this.setState({
			name: '',
			isEdit: false,
			categoryId: ''
		});
	};
		
	displayModal = () => {
		document.getElementById("modal-box").style.display="block"
	};

	hideModal = () => {
		document.getElementById("modal-box").style.display="none";
	};

	componentDidMount() {
		Axios.get('http://localhost:3001/api/categories', this.state.config)
		.then(res => {
			console.log(res.data);
			this.setState({categories: res.data})
		}).catch(err => console.log(err.response));
	}
	
	render() {
		return (
			<div className='flex-center'>
				<div className='container'>
					 <ModalBox 
					 	displayModal={this.displayModal}
						 hideModal={this.hideModal}
						 handleDeleteAll={this.handleDeleteAll}/>
					<div id='top'>
						<h1 id='district-h1'>Manage Categories</h1>
						<button id="btnDeleteAll" className='btnWarning' onClick={this.displayModal}>
							Delete All</button>
					</div>
				
					<CategoryForm
					handlePost={this.handlePost}
					handleChange={this.handleChange}
					name={this.state.name}
					clearText={this.clearForm}
					isEdit={this.state.isEdit}
					/>
					<CategoryList 
					categories={this.state.categories}
					handleDelete={this.handleDelete}
					editCategory={this.editCategory}
					/>
				</div>
			</div>
		)
	}
}

 function CategoryForm(props) {
	return (
		<form id='districtForm'>
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

function CategoryList(props) {
	return(
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

