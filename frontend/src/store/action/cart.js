import axios from 'axios';
import * as actionType from './actionTypes';


export const initCart=()=>{ 

    return dispatch=>{
        console.log('Cart Loading...')
        const token = JSON.parse(sessionStorage.getItem('data'));
        // console.log('TOKEN >>>',token.access)
        axios.get('http://127.0.0.1:8000/api/cart/cart/',
            { headers: {'Authorization' : `Bearer ${token.access}`}}
        )
        // axios.post('https://clocean.herokuapp.com/admin/',details)
        .then(response =>{
            console.log('FETCHED CART')
            dispatch(setCart(response.data));
            dispatch(cartIsLoaded(true));
        })
        .catch(error =>{
          console.log('FETCHING CART FAILED ')
          dispatch(fetchCartFailed(response.data));
        })
    }
}


const setCart=(val)=>{
    return{
        type:actionType.CART,
        val:val
    }
}

const fetchCartFailed=(val)=>{
    return{
        type:actionType.FETCH_CART_FAILED,
        val:val
    }
}

const cartIsLoaded=(val)=>{
    return{
        type: actionType.CART_IS_LOADED,
        val: val
    }
}