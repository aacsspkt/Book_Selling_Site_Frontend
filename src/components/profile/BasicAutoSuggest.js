import React from 'react';
import Autosuggest from 'react-autosuggest';
import './BasicAutoSuggest.css';
import Axios from 'axios';
import District from '../district/District';

class BasicAutoSuggest extends React.Component {
    constructor(props) {
        super(props);

        //Define state for value and suggestion collection
        this.state = {
			id: '',
            value: '',
			suggestions: [],
			districts: []
		};
    }

    // Filter logic
    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.state.districts.filter(dist =>
            dist.name.toLowerCase().slice(0, inputLength) === inputValue
        );
	};
	

    // Trigger suggestions
    getSuggestionValue = suggestion => suggestion.name;

    // Render Each Option
    renderSuggestion = suggestion => (
        <div>
            {suggestion.name}
        </div>
    );

    // OnChange event handler
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Suggestion rerender when user types
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
			suggestions: this.getSuggestions(value),
			
		});
    };

    // Triggered on clear
    onSuggestionsClearRequested = () => {
        this.setState({
			suggestions: [],
			
        });
	};
	
	onSuggestionSelected = (e, {suggestion, method}) => {
		if (method ==='enter') {
			e.preventDefault();
		}
		this.setState({
			id: suggestion._id
		});
		this.getId(suggestion._id);
	}
	

	componentDidMount() {
		Axios.get('http://localhost:3001/api/districts')
		.then(res => {
			console.log(res.data);
			this.setState({districts: res.data});
		}).catch(err => console.log(err));
	};

	getId(id) {
		this.props.getDistrictId(id);
	}

    render() {
        const { value, suggestions } = this.state;

        // Option props
        const inputProps = {
            placeholder: 'Type name of district',
            value,
            onChange: this.onChange
        };

        // Adding AutoSuggest component
        return (
            <Autosuggest

                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
				inputProps={inputProps}
				onSuggestionSelected={this.onSuggestionSelected}
				
            />
        );
    }
}

export default BasicAutoSuggest;