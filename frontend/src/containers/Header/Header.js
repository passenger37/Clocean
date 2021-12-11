import './Header.css';
import React, { Component ,Fragment } from 'react';

// img
import logo from '../../assests/favicon.png';

// redux
// import {connect} from 'react-redux';
// import * as register from '../../store/action/register';

// Components
import Search from '../../components/Search/Search';
import Registration from '../Registration/Registration';
import Short from '../../components/short-screen/Short';

class Header extends Component {

    state={
        fabarClassName:'',
        sidePanel:'hide'
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

    render() {


        return (
            <Fragment>
                <div className='header'>
                    <img  src ={logo} alt='icon' className='header_img'/>
                    <Search/>
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

                {/* TODO:web screen */}
                <Short class={this.state.sidePanel} clicked={this.toggleFabar} />
                <Registration />
            </Fragment>
        )
    }
}

export default Header;
