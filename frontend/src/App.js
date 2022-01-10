import './App.css';
import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

//pages
import Home from './pages/Home/Home';
import Checkout from './pages/Checkout/Checkout';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
// import Registration from './containers/Registration';


// Components
import Header from './containers/Header/Header';
import Footer from './components/Footer/Footer';
import Detail from './pages/DetailsPage/DetailPage';

class App extends React.Component {

  render() {

    return (
      <div className="App">
      {/* <Home/> */}
      <Router>
          <Header/>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/product/:id' component={Detail}/>
              <Route exact path='/checkout' component={Checkout}/>
              <Route exact path='/cart' component={Cart}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/Signup' component={Signup}/>
            </Switch>
          <Footer/>
      </Router>
    </div>
  );
}

}
export default App;
