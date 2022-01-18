import React  from 'react';
import './Details.css';
import axios from 'axios';

// components
// import SingleCard from '../../components/SingleCard/SingleCard';
import Button from '../../components/UI/Button/Button';

class DetailPage extends React.Component {
    
    constructor(props) {
        // console.log(props)
        super(props);
        this.state={
            productId:parseInt(this.props.match.params.id),
            productAdded:[],
            passedState:this.props.location.state.val|| 'Unknown',
            token:JSON.parse(sessionStorage.getItem('data'))
        };
    }

    componentDidMount () {
        console.log('DETAILS PAGE');
    }

    saveInCart=(event)=>{
       const data ={
            product:this.state.productId,
            quantity: 1
        }
        console.log('GETTING CART .....',data)
        // console.log(this.state.token)
        axios.post('http://127.0.0.1:8000/api/cart/cart/',data,
        { headers: {'Authorization':`Bearer ${this.state.token.access}`}}
        )
        .then(response =>{
            // console.log('>>>>>>>>>>>>>>>> Details Value')
            this.setState({
              productAdded: response.data
            })
            console.log(response.data);
        })
        .catch(error =>{
        //   console.log('>>>>>>>>>>>>> Details Error ')
          console.log(error)
        })

    }

render() {
    console.log(this.state.passedState)
    return(

        <div className='detail'>
            <img className='detail-image' src={this.state.passedState.image} alt="" />
            <h1 className='detail-name'>{this.state.passedState.title}</h1>
            <small className='detail-description'>{this.state.passedState.description}</small>
            <small className='detail-category'>{this.state.passedState.category}</small>
            <strong className='detail-price'>{this.state.passedState.price}</strong> 
            <strong className='detail-type'>{this.state.passedState.type}</strong> 
            <Button clicked={this.saveInCart} class='btn1' name='ADD'/>
        </div>
    )
}
}


export default DetailPage;