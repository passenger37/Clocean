import React  from 'react';
import './Details.css';
import axios from 'axios';

// components
import SingleCard from '../../components/SingleCard/SingleCard';
import Button from '../../components/UI/Button/Button';

class DetailPage extends React.Component {
    
    constructor(props) {
        // console.log(props)
        super(props);
        this.state={
            productId:parseInt(this.props.match.params.id),
            productDetail:[],
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
        console.log(this.state.token)
        axios.post('http://127.0.0.1:8000/api/cart/cart/',data,
        { headers: {'Authorization':`Bearer ${this.state.token.access}`}}
        )
        .then(response =>{
            console.log('>>>>>>>>>>>>>>>> Details Value')
            // this.setState({
            //   products: response.data
            // })
            console.log(response.data);
        })
        .catch(error =>{
          console.log('>>>>>>>>>>>>> Details Error ')
          console.log(error)
        })

    }

render() {
    return(

        <div className='details'>
            <SingleCard
                key={this.state.passedState.id}
                title={this.state.passedState.title}
                overview={this.state.passedState.description}
                // rating={this.state.passedState.vote_average}
                // type={this.state.passedState.media_type}
                price={this.state.passedState.price}
                poster={this.state.passedState.image} 
                />
            <Button clicked={this.saveInCart} class='btn1' name='ADD'/>
        </div>
    )
}
}



// function DetailPage() {

//     const { id } = useParams();
//     console.log(id);


//     return (
//             <div className="details">
//                 <h1>Details</h1>
//             </div>
//     )
// }


export default DetailPage;