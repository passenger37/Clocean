import './Input.css';
import React from 'react'

const Input=(props)=> {
    let inputElement=null;
    const inputClasses = ['form_input'];
    
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('invalid');
    }

    switch (props.elementType) {
        case ('input'):
            inputElement=(<input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.change}
            />);
            break;
        case ('password'):
            inputElement=(<input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.change}
            />);
            break;
    
        default:
            inputElement = (<input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.change} />);
            break;
    }

    return (
        <div className='form_group'>
            {inputElement}
            <label>{props.elementConfig.placeholder}</label>
        </div>
    )
}


export default Input;