import './SingleCard.css'
import React from 'react';

function SingleCard(props) {


    return (
        <div className="product-card">
            {/* <h1>Single Cards</h1> */}
            <img src={`${props.poster}`} alt="product pic" width="180" height="250"/> <br/>
            <strong>{props.title}</strong> <br />
            <small>{props.discription}</small>
        </div>
    )
}


export default SingleCard;