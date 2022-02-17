import React from 'react';
import './CrptoFooter.scss'
import { NavLink } from 'react-router-dom'
function CryptoFooter(props: any) {
    return (
        <footer id="footer">
            <div className="footer-newsletter">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mobfooter mt-5">
                            <h4 className="text-warning">Our Newsletter</h4>
                            <p>Subscribe to our monthly Peacecoin opportunity newsletter</p>
                        </div>
                        <div className="col-lg-6 mobfooter mt-5">
                            <form id="subscriberFrom">
                                <input type="email" name="email" id="subscriber_email" autoComplete="off"
                                    placeholder="Enter Email"></input>
                                <input type="button" value="Subscribe" className="subscriber_button"></input>
                            </form>
                            <small className="text-danger text-center d-none  errortext">Email Field is Required...</small>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-top mobfooter">
                <div className="container">
                    <div className="row justify-content-center">

                        <div className="col-lg-2 col-md-6 footer-links">
                            <h4 className="text-warning">Useful Links</h4>
                            <ul>
                                <li><i className="fa fa-angle-right"></i> <NavLink to="/crypto/home">Home</NavLink></li>
                                <li><i className="fa fa-angle-right"></i> <NavLink to="/crypto/about">About Us</NavLink></li>
                                <li><i className="fa fa-angle-right"></i> <NavLink to="/crypto/services">Services</NavLink>
                                </li>
                                <li><i className="fa fa-angle-right"></i> <NavLink to="/crypto/terms">Terms
                                    &
                                    Refund Policy</NavLink></li>
                                <li><i className="fa fa-angle-right"></i> <NavLink to="/crypto/privacy-policy">Privacy
                                    Policy</NavLink></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4 className="text-warning">Our Services</h4>
                            <ul>
                                <li>
                                    <i className="fa fa-angle-right"></i>
                                    <NavLink exact to={{ pathname: "https://peacecoinjewelry.com/" }} target="_blank">Peacecoin Jewelry</NavLink>
                                </li>
                                <li>
                                    <i className="fa fa-angle-right"></i>
                                    <NavLink to="/crypto/services">Cryptocurrency</NavLink>
                                </li>
                                <li>
                                    <i className="fa fa-angle-right"></i>
                                    <NavLink to="/crypto/services">Club Membership</NavLink>
                                </li>
                                <li>
                                    <i className="fa fa-angle-right"></i>
                                    <NavLink to="/crypto/services">Exclusive Membership</NavLink>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-contact">
                            <h4 className="text-warning">Contact Us</h4>
                            <p>
                                <strong>Peacecoin Inc. </strong> <br></br>
                                LOS ANGELES, CALIFORNIA <span className="footnum">90005</span>
                                <br></br>
                                <br></br>
                                <strong>Phone:</strong> <a href="tel:+14247322326" className="text-white"><span
                                    className="footnum">(424) </span> PEACECOIN</a> <br></br>
                                <strong>Email:</strong> hi@peacecoin.com<br></br>
                            </p>

                        </div>

                        <div className="col-lg-4 col-md-6 footer-info">
                            <h3 className="text-warning">Stay In Touch</h3>
                            <hr />
                            <div className="mt-2">
                                <a className="" target="_blank" role="button">
                                    <i className="fa fa-twitter" aria-hidden="true"></i>

                                </a>
                                <a className="" target="_blank" role="button">
                                    <i className="fa fa-facebook"></i>
                                </a>
                                <a className="" target="_blank" role="button">
                                    <i className="fa fa-instagram"></i>
                                </a>
                                <a className="" target="_blank" role="button">
                                    <i className="fa fa-linkedin"></i>
                                </a>
                                <a className="" href="https://unitedinpeace.org/" target="_blank" role="button">
                                    <i className="fa fa-handshake-o"></i>
                                </a>
                            </div>
                            <div className="mt-20">
                                <h6 className="text-light mb-20 text-center font-weight-light">Supported Payment Methods</h6>                       
                                <img src="/img/cryptoCard.png" className="img-fluid mx-auto d-block"/>                              
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="copyright text-warning text-center" style={{ position: 'relative' }}>
                                &copy; {new Date().getFullYear()} Copyright <strong><span><NavLink to="/crypto/home" className="primary-text">Peacecoin Inc.</NavLink></span></strong> All
                                Rights Reserved
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default CryptoFooter;