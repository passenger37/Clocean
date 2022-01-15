import React, { Component } from 'react';
import './Checkout.css';

// Components
import Address from '../../components/Address/Address';

// redux
import {connect} from 'react-redux';
import * as checkoutAction from '../../store/action/checkout';

class Checkout extends Component {
// constructor(props){
//     super(props);
//     this.isPrime=false;
// }
    componentDidMount(){
        console.log('CHECKOUT LOADING...');
        this.props.checkout();
    }

    addressHandler=(e)=>{
        let isPrime = e.target.checked;
        console.log('isPrime...',isPrime)

    } 


    render() {
        console.log(this.props)

        let checkout;
        if(this.props.checkoutIsLoaded){
         checkout=(
            <div>
                {this.props.checkoutData.address.map(val=>(
                    <Address
                    key={val.id}
                    id={val.id}
                    primary={val.primary}
                    city={val.city}
                    district={val.district}
                    street_address={val.street_address}
                    postal_code={val.postal_code}
                    building_number={val.building_number}
                    apartment_number={val.apartment_number}
                    onchange={this.addressHandler}
                    />))}
            </div>);
        }
        else{
            checkout=(<h1>Checkout is Loading...</h1>)
        }
    
        return (
            <div className="checkout">
                <h1>TOTAL--{this.props.checkoutData.total}</h1>
                {checkout}
                <h1>Type of Payment</h1>
            </div>
        )
    }
}


const mapStateToProps=(state) => {
    return{
        checkoutData:state.checkout.checkoutData,
        checkoutIsLoaded:state.checkout.checkoutIsLoaded,
        error:state.checkout.error
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        checkout:()=>{dispatch(checkoutAction.initCheckout())}
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
