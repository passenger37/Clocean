import React from 'react';
import {NavLink} from 'react-router-dom';
import './Web.css';

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

export default function web() {
    return (
        <div className='web-nav'>
            <div className='web_container2'>
                <div className='web-features'>
                    <img  src ={cart}/>
                    <small>Cart</small>
                </div>
                <div className='web-features'>
                    <img  src ={male}/>
                    <small>Male</small>
                </div>
                <div className='web-features'>
                    <img  src ={female}/>
                    <small>Female</small>
                </div>
                <div className='web-features'>
                    <img  src ={traditional}/>
                    <small>Traditional</small>
                </div>
                <div className='web-features'>
                    <img  src ={wishlist}/>
                    <small>Wishlist</small>
                </div>
                <div className='web-features'>
                    <img  src ={track}/>
                    <small>Track Orders</small>
                </div>
                <div className='web-features'>
                    <img  src ={wallet}/>
                    <small>Wallet</small>
                </div>
                <div className='web-features'>
                    <img  src ={blog}/>
                    <small>Blogs</small>
                </div>
            </div>
            <div className='web_container1'>
                <NavLink to="/login" ><img src={user} /></NavLink>
                {/* <NavLink to="/signup" >New User ? </NavLink> */}
            </div>
        </div>
    )
}
