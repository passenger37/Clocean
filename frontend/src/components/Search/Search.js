import './Search.css';
import React, { Component } from 'react';

// Components
import Button from '../../components/UI/Button/Button';

export class Search extends Component {
    
    SearchFormHandler=(event)=>{
        event.preventDefault();
    }

    render() {
        return (
            <div className="search">
                <form onSubmit={this.SearchFormHandler} >
                    <input type='search'  onChange={this.props.searchData} placeholder='Search product..'/>
                    <label>Search</label>
                </form>
            </div>
        )
    }
}

export default Search;
