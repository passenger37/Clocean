import axios from 'axios';
import * as actionTypes from './actionTypes';

export const initCheckout=()=>{
    return dispatch=>{
        const token = JSON.parse(sessionStorage.getItem('data'));
        // console.log(token.access);
        axios.get('http://127.0.0.1:8000/api/checkout/checkout/',
        { headers: {'Authorization' : `Bearer ${token.access}`}})
        .then(response =>{
            // console.log(response);
            dispatch(checkoutLoaded(response.data));
            dispatch(checkoutIsLoaded(true));
        })
        .catch(error =>{
            console.log(error);
            dispatch(checkoutFailed(error))
        })
    }
}

const checkoutFailed=(val)=>{
    return{
        type:actionTypes.FETCHED_CHECKOUT_FAILED,
        val:val
    }
}

const checkoutLoaded=(val)=>{
    return{
        type:actionTypes.CHECKOUT,
        val:val
    }
}

const checkoutIsLoaded=(val)=>{
    return{
        type:actionTypes.CHECKOUT_IS_LOADED,
        val:val
    }
}
