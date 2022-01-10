import axios from 'axios';
import * as actionType from './actionTypes';

export const initProducts=()=>{ 
    return dispatch=>{
        const token = JSON.parse(sessionStorage.getItem('data'));
        // console.log('TOKEN >>>',token)
        axios.get('http://127.0.0.1:8000/api/products/products/',
            // { headers: {'Authorization' : `Bearer ${token}`}}
        )
        // axios.post('https://clocean.herokuapp.com/admin/',details)
        .then(response =>{
            console.log('FETCHED PRODUCTS...');
            // console.log(response.data);
            dispatch(setProducts(response.data));
            dispatch(productIsLoaded(true));
        })
        .catch(error =>{
            console.log('FETCHED PRODUCTS Failed...')
            dispatch(fetchProductFailed(response.data));
        })
    }
}

const setProducts=(val)=>{
    return{
        type: actionType.PRODUCTS,
        val: val
    }
}

const fetchProductFailed=(val)=>{
    return{
        type: actionType.FETCH_PRODUCTS_FAILED,
        val: val
    }
}

const productIsLoaded=(val)=>{
    return{
        type: actionType.PRODUCT_IS_LOADED,
        val: val
    }
}