import './Home.css';
import React, { Component } from 'react';
import axios from 'axios';

// components
import Cards from '../../components/Cards/Cards';
import Search from '../../components/Search/Search';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';



// redux
import {connect} from 'react-redux';
import * as cartAction from '../../store/action/cart';
import * as productAction from '../../store/action/products';
class Home extends Component {

  constructor(props) {
    super(props);
    // this.hideClassName=''
    this.state={
      fabarClassName:'',
      hideClassName:'',
      // sidePanel:'hide',
      searchResults:'',
      typingTimeout: 0,
      typing:false,
  }
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

 
  searchData=(event)=>{
        if(this.state.typingTimeout) clearTimeout(this.state.typingTimeout);
        if(event.target.value.length ==0 || event.target.value==' '){
        this.setState({hideClassName:''});
        console.log('DATA >>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log(event.target.value)
          this.setState({
              searchResults: [],
            });
        }
        else{

          this.state.typingTimeout= setTimeout(() => {
            axios.get(`http://127.0.0.1:8000/api/search/search/?search=${event.target.value}`)
            .then(res=>{
              console.log('Search Reesult >>>>>>>>>>>>>>>>>>>>>>>>>');
              console.log(res.data);
              this.setState({
                searchResults: res.data,
              })
            }) 
            .catch(err=>{
              console.log(err);
            }) 
          }, 300);
          this.setState({typing:true});
          if(this.state.typing){
            // this.hideClassName='hide';
            this.setState({hideClassName:'hide'});
          }
        }
}
  
  
  render() {
    let Card;
    if(this.props.productsIsLoaded ){
    Card=(<Cards class={this.state.hideClassName} data={this.props.products}/>);
    }
    else{
      Card= (
        <div>
          <Skeleton /> 
          <Skeleton count={5} /> 
        </div>
      );
    }

    return (
      <div className='home'>
        <Search searchData={this.searchData} searchResult={this.state.searchResults}/>
        {/* <h1>Poster</h1> */}
        <h1 className={this.state.hideClassName}>Trends</h1>
        {Card}
        <h1 className={this.state.hideClassName}>Males</h1>
        {Card}
        <h1 className={this.state.hideClassName}>Females</h1>
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
