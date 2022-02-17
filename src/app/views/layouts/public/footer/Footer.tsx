import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AiFillLinkedin, AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { FaFacebookSquare } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './FooterStyles.scss';
import StarRateIcon from '@material-ui/icons/StarRate';

function Footer() {
    return (
        <>
            <section className="section noncrypto-footer-cover">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={3} xs={6}>
                            <h3 className="secondaryHeading mb-30">Company</h3>                           
                            <p className="paragraph"> <NavLink  exact to={{ pathname: "https://peacecoinjewelry.com/" }} target="_blank"> Peacecoin Jewelry</NavLink></p>   
                            <p  className="paragraph"><NavLink  exact to="/terms">Terms &amp; Conditions</NavLink></p> 
                            <p className="paragraph"><NavLink  exact to="/privacy-policy">Privacy Policy</NavLink></p> 
                              {/* <li><NavLink exact to="/certification"><p className="paragraph">Peace Certifications</p></NavLink> </li> */}
                                                                                                                                                                                  
                        </Col>

                        <Col md={3} xs={6}>
                            <h3 className="secondaryHeading mb-30">Support</h3>
                            <p className="paragraph"><NavLink exact to="/faq">FAQS</NavLink></p>
                            <p className="paragraph"><NavLink exact to="/contact">Contact Us</NavLink></p>
                            <p className="paragraph"><a>Live Consultancy</a></p>
                           
                            <div>
                                <a href="#"><AiOutlineTwitter /></a>
                                <a href="#"><FaFacebookSquare /></a>
                                <a href="#"><AiOutlineInstagram /></a>
                                <a href="#"><AiFillLinkedin /></a>
                            </div>                          
                            <a><div id="google_translate_element"></div></a>
                          
                        </Col>

                        <Col md={3} xs={6} className="about-sect">
                            <h3 className="secondaryHeading mb-30">About Us</h3>
                             <p className="paragraph"><NavLink exact to="/ceo-message">CEO MESSAGE</NavLink></p>
                            <p className="paragraph">  <NavLink exact to="/team">TEAM</NavLink></p>
                            <p className="paragraph">  <NavLink exact to="/product">Products</NavLink></p>
                            <p className="paragraph">  <NavLink exact to="/apparel">Apparel</NavLink>  </p>                        
                            <p className="paragraph">  <NavLink exact to="/blog">Blog</NavLink></p>
                            <p className="paragraph">  <NavLink exact to="/business-promotion"><div className="d-flex align-items-center">Business Training Package <StarRateIcon className="colorChangeAnimation" /></div></NavLink></p>
                        </Col>
                        
                        <Col md={3} xs={6}>
                            <h3 className="secondaryHeading mb-30">Donate</h3>
                          {/* <p className="paragraph">   <NavLink exact to={{ pathname: "https://www.unitedinpeace.org" }} target="_blank"> Donate to United In Peace Foundation</NavLink></p> */}
                           <p className="paragraph">  <NavLink exact to={{ pathname: "https://morrisbrown.edu/give/" }} target="_blank"> Donate to Morris Brown College Foundation</NavLink></p>
                          <p className="paragraph">   <NavLink exact to={{ pathname: "https://support.woundedwarriorproject.org/Default.aspx?tsid=10043" }} target="_blank"> Donate to Wounded Warrior Project</NavLink></p>
                        </Col>
                        <Col md={3} xs={6} className="follow-sect mt-4">
                            <Row>
                                <Col xs={6}>
                                    <h2>3000</h2>
                                    <small>Clients</small>
                                </Col>
                                <Col xs={6}>
                                    <h2>3000</h2>
                                    <small>Total Users</small>
                                </Col>

                                <Col xs={6} className="mt-30">
                                    <h2>700</h2>
                                    <small>Active Accounts</small>
                                </Col>
                                <Col xs={6} className="mt-30">
                                    <h2>150</h2>
                                    <small>Supported Countries</small>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={4}  className="mt-20">
                            <h6 className="text-light mb-20 text-center font-weight-light">Supported Payment Methods</h6>
                            <img src="/img/noncryptoCard.png" className="img-fluid mx-auto d-block mb-20" />
                        </Col>

                        <hr className="" />
                        <Col lg={12} className="text-center">
                            <p>Copyright {new Date().getFullYear()} Peacecoin Inc. All Rights Reserved.</p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Footer;