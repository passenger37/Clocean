import React, { Component } from 'react';
import axios from 'axios';
class Home extends Component {

  constructor(props) {
    
    super(props);
    this.state={
      products: [],
    }
  
  }



  componentDidMount(){
    axios.get('http://127.0.0.1:8000/api/products/products/',)
    // axios.post('https://clocean.herokuapp.com/admin/',details)
    .then(response =>{
        console.log('>>>>>>>>>>>>>>>> Form Value')
        this.setState({
          producs: response.data
        })
        console.log(this.state.producs);
    })
    .catch(error =>{
      console.log('>>>>>>>>>>>>> Form Error ')
      console.log(error)
    })

  }

  render() {
    
    return (
      <div>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>
        <h1>Home Page</h1>

      </div>
    );
  }
}

export default Home;
