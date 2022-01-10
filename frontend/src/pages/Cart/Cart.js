import './Cart.css';
import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

// Components
import CartItem from '../../components/CartItem/CartItem';

//redux
import {connect} from 'react-redux';
import * as cartAction from '../../store/action/cart';





class Cart extends React.Component{

    componentDidMount() {
        this.props.getCart();   
    }

    render(){
    console.log('CART ...');

    let cartItem;
    if(this.props.cartIsLoaded){
     cartItem=(
        <div>{
            this.props.cart.map(val=>{
                console.log('VALUE in CART',val.cart);
                return(
                    <NavLink exact to={{
                        pathname:'/product/'+val.product.id, 
                        state:{val:val.product}
                    }}
                    key={val.product.id}>
                        <CartItem
                        key={val.id}
                        id={val.id}
                        cartId={val.cart}
                        product={val.product}
                        quantity={val.quantity}/>
                    </NavLink>
                )
            })}
        </div>
    );}
    else{
        cartItem=(<h1>Cart is Loading...</h1>)
    }

    return (
        <div className='cart'>
            <h1>Cart</h1>
            {cartItem}
        </div>
    )
}
}


const mapStateToProps=(state)=>{
    return{
        cart:state.cart,
        cartIsLoaded: state.cartIsLoaded,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        getCart:()=>{ dispatch(cartAction.initCart())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Cart);