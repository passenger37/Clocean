import './Home.css';
import React, { Component } from 'react';
import axios from 'axios';

import Cards from '../../components/Cards/Cards';

// redux
import {connect} from 'react-redux';
import * as cartAction from '../../store/action/cart';
import * as productAction from '../../store/action/products';
class Home extends Component {

  constructor(props) {
    super(props);
    // const cartLoaded = this.props.cartIsLoaded;
    // const productLoaded = this.props.productsIsLoaded;
  }


  componentDidMount(){
    this.props.getProducts();
    this.props.getCart();
    console.log('HOME PAGE....')
    // console.log(this.props);
    // console.log(this.props.cart);
  }  

 

  
  
  render() {
    let Card;
    // if(this.props.productsIsLoaded && this.props.cartIsLoaded)
    if(this.props.productsIsLoaded ){
    Card=(<Cards data={this.props.products}/>);
    }
    else{
      Card= (<h1>Loading ....</h1>);
    }

    return (
      <div className='home'>
        {/* <h1>Poster</h1>
        <h2>offers</h2>
        <h5>Trending</h5>
        <h5>Mens</h5>
        <h5>WoMens</h5> */}
        <h1>Home PAge</h1>
        {Card}

        
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return{
    cart: state.home.cart,
    products: state.home.products,
    error:state.home.error,
    productsIsLoaded: state.home.productsIsLoaded,
    cartIsLoaded: state.home.cartIsLoaded,
  }
};

const mapDispatchToProps=(dispatch)=>{
  return{
    getCart:()=>{dispatch(cartAction.initCart())},
    getProducts:()=>{dispatch(productAction.initProducts())},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
