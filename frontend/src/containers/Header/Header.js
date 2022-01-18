import './Header.css';
import React, { Component ,Fragment } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

// img
import logo from '../../assests/favicon.png';

// redux
// import {connect} from 'react-redux';
// import * as cartAction from '../../store/action/cart';
// import * as productAction from '../../store/action/products';

// Components
// import Search from  '../../components/Search/Search';
import Short from '../../components/Navigation/short-screen/Short';
import FullScreen from '../../components/Navigation/web-screen/Web';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state={
            fabarClassName:'',
            sidePanel:'hide',
            searchResults:'',
            typingTimeout: 0,
            typing:false,
        }
    
    }

    // componentDidMount() {
    // this.props.getProducts();
    // this.props.getCart();
    // }

    toggleFabar =(e)=>{ 
        // console.log('Click on fabar');
        if (this.state.fabarClassName==''){
            this.setState({fabarClassName:'change',
                            sidePanel:''})
        }
        else{
            this.setState({fabarClassName:'',
                            sidePanel:'hide'})
        }
    }

    searchData=(event)=>{
        if(this.state.typingTimeout) clearTimeout(this.state.typingTimeout);
        this.state.typingTimeout= setTimeout(() => {
          axios.get(`http://127.0.0.1:8000/api/search/search/?search=${event.target.value}`)
          .then(res=>{
              console.log('Searcg Reesult >>>>>>>>>>>>>>>>>>>>>>>>>');
              console.log(res.data);
              this.setState({
                  searchResults: res.data.results,
                })
            }) 
            .catch(err=>{
                console.log('Search Error >>>>>>>>>>>>>>>>>>>>>>>>>');
                console.log(err);
            }) 
        }, 300);
        if(event.target.value.length ==0){
            this.setState({
                searchResults: [],
              });
        }
    }

    render() {


        return (
            <Fragment>
                <div className='header'>
                    <NavLink to="/" ><img  src ={logo} alt='icon' className='header_img'/></NavLink>
                    {/* <Search searchData={this.searchData} saearchResult={this.state.searchResults}/> */}
                    <FullScreen/>
                    <div className="header_nav">
                        <input type="checkbox" name="checkbox" id="checkbtn" />
                        <label htmlFor="checkbtn" onClick={this.toggleFabar}>
                            <div id="container" className={'container ' + this.state.fabarClassName} >
                                <div className="bar1"></div>
                                <div className="bar2"></div>
                                <div className="bar3"></div>
                            </div>
                        </label>
                    </div>
                </div>
                <Short class={this.state.sidePanel} clicked={this.toggleFabar} />
            </Fragment>
        )
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
      getCart:()=>{dispatch(cartAction.initCart())},
      getProducts:()=>{dispatch(productAction.initProducts())},
    }
  }
  
  const mapStateToProps=(state)=>{
    return{
      cart: state.cart,
      products: state.products,
      error:state.error,
    }
  };

//   export default connect(mapStateToProps,mapDispatchToProps)(Header);
  export default Header;
