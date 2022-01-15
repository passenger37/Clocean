import React from 'react';
import './Address.css';

// Component
// import Input from  '../UI/Input/Input';

const Address=(props)=>{
    return(
        <div className="address">
                <small>ApartmentNumber :- {props.apartment_number}</small><br />
                <small>Builder No.- {props.building_number}</small><br />
                <small>Street Number:-{props.street_address}</small><br />
                <small>City :-{props.city}</small><br />
                <small>District :-{props.district}</small><br />
                <small>Postal Code:-{props.postal_code}</small><br />
                <input type="checkbox" name={props.id}   onChange={props.onchange}/>

        </div>
    )
}

export default Address;