import './Search.css';
import React, { Component } from 'react';

// Components
// import Button from '../../components/UI/Button/Button';
import SingleCard from '../../components/SingleCard/SingleCard';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

// Redux
import {NavLink} from 'react-router-dom';

export class Search extends Component {
    constructor(props) {
        super(props);
    }
    
    SearchFormHandler=(event)=>{
        event.preventDefault();
    }

    render() {

        console.log('SEARCH COMPONENT')
        // console.log(this.props.searchResult)
        let Card;
        if(this.props.searchResult){
             Card=(
                <div >
                    {
                      this.props.searchResult.map(val=>{
                            return( 
                                <NavLink exact to={{ 
                                    pathname:'/product/'+val.id, 
                                    state:{val:val}} }>
                                    <SingleCard
                                    key={val.id}
                                    title={val.title}
                                    overview={val.description}
                                    // rating={val.vote_average}
                                    // type={val.media_type}
                                    price={val.price}
                                    poster={val.image} />
                                </NavLink>)
                        })
                    }
                </div>
            );
        }
        // else{
        //   Card= (
        //     <div>
        //       {/* <Skeleton /> 
        //       <Skeleton count={5} />  */}
        //     </div>
        //   );}

        return (
            <div className="search">
                <form onSubmit={this.SearchFormHandler} >
                    <input type='search'  onChange={this.props.searchData} placeholder='Search product..'/>
                    <label>Search</label>
                </form>
                {Card}
            </div>
        )
    }
}

export default Search;
