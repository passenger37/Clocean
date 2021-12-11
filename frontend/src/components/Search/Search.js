import './Search.css';
import React, { Component } from 'react';

// Components
import Button from '../UI/Button/Button';

export class Search extends Component {
    render() {
        return (
            <div className="search">
                <form >
                    <input type='search' placeholder='Search product..'/>
                    <label>Search</label>
                </form>
            </div>
        )
    }
}

export default Search;
