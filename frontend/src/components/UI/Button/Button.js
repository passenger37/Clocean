import './Button.css';
import React from 'react';

const Button=(props)=>{
    return(
        <button 
        disabled={props.disabled} 
        type={props.btnType}
        onClick={props.clicked}
        className={props.class}>
        {props.children}{props.clicked}</button>
    );
}

export default Button;
