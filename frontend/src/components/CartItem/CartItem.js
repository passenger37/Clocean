import './CartItem';
import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

// Components
import Button from '../../components/UI/Button/Button';

// redux
import {connect} from 'react-redux';
import * as cartAction from '../../store/action/cart';

class CartItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        // console.log('CART ITEM...')
        // console.log(this.props.product);
    }
    

    addItem=()=>{
        console.log('Added Item in Cart');
        console.log(this.props.id);
        const token = JSON.parse(sessionStorage.getItem('data'));
        const data ={
            quantity: this.props.quantity+1
        }
        axios.put(
            `http://127.0.0.1:8000/api/cart/cartitem/${this.props.id}/`,
            data,
            { headers: {'Authorization' : `Bearer ${token.access}`}}
        )
        .then(res=>{
            console.log('RUNNING ADD ITEM');
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    removeItem=()=>{
        console.log('Remove Item in Cart')
        console.log(this.props.id);
        const token = JSON.parse(sessionStorage.getItem('data'));
        axios.delete(
            `http://127.0.0.1:8000/api/cart/cartitem/${this.props.id}/`,
            { headers: {'Authorization' : `Bearer ${token.access}`}}
        )
        .then(res=>{
            console.log('DELETED ITEM')
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
   
    }

    subItem=()=>{
        console.log('SUB Item in Cart')
        console.log('Added Item in Cart');
        console.log(this.props.id);
        const token = JSON.parse(sessionStorage.getItem('data'));
        const data ={
            quantity: this.props.quantity-1
        }
        axios.put(
            `http://127.0.0.1:8000/api/cart/cartitem/${this.props.id}/`,
            data,
            { headers: {'Authorization' : `Bearer ${token.access}`}}
        )
        .then(res=>{
            console.log('RUNNING ADD ITEM');
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
        
    }
    
    render(){
        // if(this.props.quantity<=0){
        //     this.removeItem()
        // }
        // let val;
        let subBtn=this.props.quantity>1?false:true;
        return(
            <div className='cartitem'>
                <h1>CartItem</h1>
                <NavLink exact 
                            to={{
                                pathname:'/product/'+this.props.product.id, 
                                state:{val:this.props.product}
                                }}
                            key={this.props.product.id}>
                        <img src={`${this.props.product.image}`}/><br/>
                        <strong>{this.props.product.title}</strong><br/>
                        <strong>{this.props.quantity}</strong><br/>
                </NavLink>
                <Button  class='btn1' clicked={this.addItem} name='+'/>
                <Button  class='btn1' disabled={this.subBtn} clicked={this.subItem} name='-'/>
                <Button  class='btn1' clicked={this.removeItem} name='REMOVE'/>
            </div>
        )
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        getCart:()=>{ dispatch(cartAction.initCart())}
    }
}

export default connect(mapDispatchToProps)(CartItem)
// export default CartItem;