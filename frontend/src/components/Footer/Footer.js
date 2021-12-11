import './Footer.css';
import React, { Component } from 'react';
import icon from '../../assests/favicon.png';

class Footer extends Component {
    render() {
        return (
            <div className='footer'>
                <div className='footer-container1'>
                    <img  className='footer_img'src={icon}/>
                    <h4>Clocean</h4>
                </div>
                <div className='footer-container2'>
                    <div className="footer-containers">
                        <strong>Customer Care</strong>
                        <small>Track Orders</small>
                        <small>Orders</small> <br/>
                        <small>Contact us</small>
                    </div>
                    <div className="footer-containers">
                        <strong>Company</strong>
                        <small>About us</small>
                        <small>Jobs</small>
                        <small>Terms and Conditions</small>
                        <small>Privacy and Policy</small>
                        <small>Blogs</small>
                        <small>Social Responsibility</small>
                    </div>    
                    <div className="footer-containers">
                    <strong>Connect</strong>
                        <small>Facebook</small>
                        <small>Twitter</small>
                        <small>Instagram</small> <br/>
                        <small>Linekdin</small>
                    </div>
                    <div className="footer-containers">
                        <strong>Stay Updated</strong>
                        <input type="text" placeholder="enter value.."/>
                    </div>      

                </div>
            </div>
        )
    }
}

export default Footer
