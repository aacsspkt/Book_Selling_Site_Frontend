import React, {Component} from 'react'
import defaultImg from './profilepic.jpeg'
import './CreateProfile.css'
import Axios from 'axios'
// import BasicAutoSuggest from './BasicAutoSuggest'
import CreateProfileForm from './CreateProfileForm'

export default class ProfileSecond extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mobileNo: '',
            phoneNo: '',
            hideContact: false,
            filename: '',
            myFile: null,
            profileImg: defaultImg,
            streetAddress: '',
            cityName: '',
            areaLocation: '',
            firstName: '',
            lastName: '',
            isImageSelected: false,
			submitted: false,
			config:{
				headers: {'Authorization': localStorage.getItem('token')}
			},
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    getDistrictId = districtId => {
        this.setState({areaLocation: districtId});
    }

    handleImageChange = e => {
		this.setState(
			{
				myFile: e.target.files[0],
				profileImg: URL.createObjectURL(e.target.files[0]),
         	    isImageSelected: true}
			);
    };

    handleCheckChange = e => {
        this.setState({
            hideContact: !this.state.hideContact
        })
    }

    uploadImg = () => {
        if (!this.state.isImageSelected) 
            return;
        
        const formData = new FormData();
        formData.append('myFile', this.state.myFile);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        Axios.post('http://localhost:3001/api/uploads', formData, config).then((res) => {
            this.setState({filename: res.data.file.filename})
            console.log(res.data.file.filename);
        }).catch((err) => console.log(err));
    }

    handleSubmit = e => {
        e.preventDefault();
        this.uploadImg();
        // To wait for upload res which contains profilePhoto file name.
        setTimeout(() => {
            const data = {
                profilePhoto: this.state.filename,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                contact: {
                    mobileNo: this.state.mobileNo,
                    phoneNo: this.state.phoneNo,
                    hidePhone: this.state.hideContact
                },
                address: {
                    streetAddress: this.state.streetAddress,
                    cityName: this.state.cityName,
                    areaLocation: this.state.areaLocation
				},
				profile: this.state.profile
            }
            console.log(data);
            Axios.post('http://localhost:3001/api/profiles', data, this.state.config).then(res => {
                this.setState({submitted: true, _id: res.data._id});
                console.log(res.data);
			}).catch(err => console.log(err));
        }, 2000);
    }

    render() {
        if (this.state.submitted) {
			this.props.history.push(`/book`);
        }
        return (
            <div className='flex-center'>
                <div className='container'>
                    <h1 className='h1-center'>Register to B-Share</h1>
                    <h4 className='h4-center'>Enter your details below</h4>
					<CreateProfileForm 
						handleSubmit={this.handleSubmit}
						handleChange={this.handleChange}
						getDistrictId={this.getDistrictId} 
						handleImageChange={this.handleImageChange}
						profileImg={this.state.profileImg}
					/>
                </div>
            </div>
        )
    }
}
