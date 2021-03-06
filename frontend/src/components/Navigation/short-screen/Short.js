import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './Short.css';

// img
import user from '../../../assests/user.png';
import cart from '../../../assests/cart.png';
import male from '../../../assests/male.png';
import female from '../../../assests/female.png';
import wishlist from '../../../assests/wishlist.png';
import wallet from '../../../assests/wallet.png';
import track from '../../../assests/track.png';
import blog from '../../../assests/blogs.png';
import traditional from '../../../assests/traditional.jpg';

export class short extends Component {
    render() {
        return (
            <div className={'short-nav '+this.props.class} onClick={this.props.clicked}>
                <div className='short_container1'>
                    <img src={user} />
                    <NavLink to="/login" >Login </NavLink>
                    <NavLink to="/signup" >New User ? </NavLink>
                </div>
                <div className='short_container2'>
                    <NavLink to="/cart" >
                        <div className='short-features'>
                            <img  src ={cart}/>
                            <small>Cart</small>
                        </div>
                    </NavLink>
                    <div className='short-features'>
                        <img  src ={male}/>
                        <small>Male</small>
                    </div>
                    <div className='short-features'>
                        <img  src ={female}/>
                        <small>Female</small>
                    </div>
                    <div className='short-features'>
                        <img  src ={traditional}/>
                        <small>Traditional</small>
                    </div>
                    <div className='short-features'>
                        <img  src ={wishlist}/>
                        <small>Wishlist</small>
                    </div>
                    <div className='short-features'>
                        <img  src ={track}/>
                        <small>Track Orders</small>
                    </div>
                    <div className='short-features'>
                        <img  src ={wallet}/>
                        <small>Wallet</small>
                    </div>
                    <div className='short-features'>
                        <img  src ={blog}/>
                        <small>Blogs</small>
                    </div>
                </div>
            </div>
        )
    }
}

export default short;
