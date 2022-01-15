import './Cart.css';
import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

// Components
import CartItem from '../../components/CartItem/CartItem';
import Button from '../../components/UI/Button/Button';

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
        <div>
            {this.props.cart.map(val=>(
                <CartItem
                    key={val.id}
                    id={val.id}
                    cartId={val.cart}
                    product={val.product}
                    quantity={val.quantity}/>))}
        </div>);
    }
    else{
        cartItem=(<h1>Cart is Loading...</h1>)
    }

    return (
        <div className='cart'>
            <h1>Cart</h1>
            {cartItem}
            <NavLink exact to='/checkout'><Button class='btn1' name='CHECKOUT'/></NavLink>
        </div>
    )
}
}


const mapStateToProps=(state)=>{
    return{
        cart:state.home.cart,
        cartIsLoaded: state.home.cartIsLoaded,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        getCart:()=>{ dispatch(cartAction.initCart())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Cart);