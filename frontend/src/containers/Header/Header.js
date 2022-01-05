import './Header.css';
import React, { Component ,Fragment } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

// img
import logo from '../../assests/favicon.png';

// redux
// import {connect} from 'react-redux';
// import * as register from '../../store/action/register';

// Components
import Search from  '../../components/Search/Search';
import Short from '../../components/Navigation/short-screen/Short';
import FullScreen from '../../components/Navigation/web-screen/Web';

class Header extends Component {

    state={
        fabarClassName:'',
        sidePanel:'hide',
        searchResults:'',
        typingTimeout: 0,
        typing:false,
    }

    toggleFabar =(e)=>{ 
        console.log('Click on fabar');
        if (this.state.fabarClassName==''){
            this.setState({fabarClassName:'change',
                            sidePanel:''})
            console.log('Click on fabar changeeee');
        }
        else{
            this.setState({fabarClassName:'',
                            sidePanel:'hide'})
            console.log('Click on fabar <<<<<<<<<<<');
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
                    <Search searchData={this.searchData} saearchResult={this.state.searchResults}/>
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

export default Header;
