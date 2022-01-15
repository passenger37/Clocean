import * as actionTypes from '../action/actionTypes';

const initialState ={
    checkoutData:'',
    checkoutIsLoaded:false,
    error:''
}

const checkout=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.CHECKOUT:
            return{
                ...state,
                checkoutData: action.val
            }
        case actionTypes.CHECKOUT_IS_LOADED:
            return{
                ...state,
                checkoutIsLoaded: action.val
            }
        case actionTypes.FETCHED_CHECKOUT_FAILED:
            return{
                ...state,
                error: action.val
            }
        default:
            return state;
    }
}

export default checkout;