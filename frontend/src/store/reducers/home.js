import * as actionTypes from '../action/actionTypes';

const initialState ={
    cartIsLoaded:false,
    productsIsLoaded:false,
    cart:'',
    products:'',
    productError:'',
    cartError:''
}

const home =(state=initialState,action) =>{
    switch(action.type){
        case actionTypes.CART:
            return{
                ...state,
                cart: action.val
            }
        case actionTypes.PRODUCTS:
            return{
                ...state,
                products: action.val
            }
        case actionTypes.PRODUCT_IS_LOADED:
            return{
                ...state,
                productsIsLoaded: action.val
            }
        case actionTypes.CART_IS_LOADED:
            return{
                ...state,
                cartIsLoaded: action.val
            }
        case actionTypes.FETCH_CART_FAILED:
            return{
                ...state,
                cartError: action.val
            }
        case actionTypes.FETCH_PRODUCTS_FAILED:
            return{
                ...state,
                productError: action.val
            }
        default:
            return state;
    }
}


export default home;