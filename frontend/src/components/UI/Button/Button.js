import './Button.css';
import React from 'react';

const Button=(props)=>{
    return(
        <button 
        className={props.class}
        disabled={props.disabled} 
        type={props.btnType}
        onClick={props.clicked}
        className={props.class}>
        {props.name}</button>
    );
}

export default Button;
