import React, {Component} from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {

    onChangeInput = (e) => {
        this.props.onChangeSearchText(e.target.value);
    };

    render() {
        const searchText = 'Type here to search';
        return (
            <input 
                className="form-control search-input"
                placeholder={searchText}
                onChange={(e) => this.onChangeInput(e)}/>
        )
    }
}