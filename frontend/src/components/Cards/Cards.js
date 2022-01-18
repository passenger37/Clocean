import './Cards.css';
import React from 'react';
import {NavLink} from 'react-router-dom';
import SingleCard from '../SingleCard/SingleCard';

export default function Cards(props) {

    const Cards=(
                <div className="slide-cards">
                {
                    props.data.map(val=>{
                        return( 
                            <NavLink exact to={{ 
                                pathname:'/product/'+val.id, 
                                state:{val:val}
                                }}
                                key={val.id}>
                                <SingleCard
                                    key={val.id}
                                    title={val.title}
                                    overview={val.description}
                                    // rating={val.vote_average}
                                    // type={val.media_type}
                                    price={val.price}
                                    poster={val.image} 
                                    />
                            </NavLink>
                            )
                        })
                }
                </div>
                );

    return (
        
        <div className={props.class}>
            {Cards}
        </div>
    )
}
