import React from 'react'
import axios from 'axios';
import * as actionType from './actionTypes';


export const initLogin = () => {
    return dispatch =>{
        const details={
            username:'anand',
            password:'anand'
        };
        axios.post('http://127.0.0.1:8000/account/login/',details)
        // axios.post('https://clocean.herokuapp.com/admin/',details)
        .then(response =>{
            dispatch(setLogin(response.data));
            console.log('Click on >>>>>>>>>>>')
            console.log('Click on >>>>>>>>>>>')
            console.log('Click on >>>>>>>>>>>')
            console.log('Click on >>>>>>>>>>>')
            console.log(response.data);
        })
        .catch(error =>{
            dispatch(loginFailed(error.data))
        })
    }
}

export const loginFailed=(val) =>{
    return {
        type:actionType.FETCH_LOGIN_FAILED,
        val:val
    }
}


export const setLogin = (val) => {
    return {
        type: actionType.LOGIN,
        val:val
    }
}

// export const signup = (value) => {
//     return {
//         type: SIGNUP,
//         val:value
//     }
// }


// export const  logout= (value) => {
//     return {
//         type: LOGOUT,
//         val:value
//     }
// }

// export const  storeResult= (value) => {
//     return {
//         type:STORE_RESULT,
//         val:value
//     }
// }

// export const  removeResult= (value) => {
//     return {
//         type:REMOVE_RESULT,
//         val:value
//     }
// }


