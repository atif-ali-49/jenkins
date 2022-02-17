import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import './FooterStyles.scss';
import { FaBeer,FaFacebookF,FaFacebookSquare } from 'react-icons/fa';
import {AiFillTwitterSquare,AiFillFacebook,AiOutlineInstagram,AiOutlineTwitter,AiFillLinkedin } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

function Footer() {
    return (
        <>
           <section className="section footer-cover">
           <Container>
               <Row className="justify-content-center">
                   <Col md={3} xs={6}>
                    <h3 className="secondaryHeading mb-30">Company</h3>   

                   <NavLink exact to="/certification"><p className="paragraph">Peace Certifications</p></NavLink>
                   <NavLink exact to="/movement"><p className="paragraph">Join Peace Movement</p></NavLink> 
                    <a><p className="paragraph">Peacecoin Jewelry</p></a>
                    <NavLink exact to="/terms"><p className="paragraph">Terms & Conditions</p></NavLink> 
                   
                   </Col>

                   <Col md={3} xs={6}>
                    <h3 className="secondaryHeading mb-30">Support</h3>   
                    <NavLink exact to="/contact"><p className="paragraph">Contact Us</p></NavLink>
                    <NavLink exact to="/faq"><p className="paragraph">Faqs</p></NavLink>
                    <a><p className="paragraph">Live consultancy</p></a>
                    <div>
                   <a href="#"><AiOutlineTwitter/></a> 
                    <a href="#"><FaFacebookSquare/></a>
                   <a href="#"><AiOutlineInstagram/></a> 
                  <a href="#"><AiFillLinkedin/></a>  
                    </div>
                   </Col>
                   
                   <Col md={3} xs={6} className="about-sect">
                    <h3 className="secondaryHeading mb-30">About Us</h3>   
                    <a><p className="paragraph">Products</p></a>
                    <a><p className="paragraph">Apparel</p></a>
                    <NavLink exact to="/team"><p className="paragraph">Team</p></NavLink>
                    <NavLink exact to="/blog"><p className="paragraph">Blog</p></NavLink>
                    <a><p className="paragraph">Ceo Message</p></a>
                    
                   </Col>

                   <Col md={3} xs={6} className="follow-sect">
                       <Row>
                           <Col xs={6}>
                           <h2>1500k</h2>
                           <small>Clients</small>
                           </Col>
                           <Col xs={6}>
                           <h2>358k</h2>
                           <small>Total Users</small>
                            </Col>

                            <Col xs={6} className="mt-30">
                           <h2>185k</h2>
                           <small>Active Accounts</small>
                           </Col>
                           <Col xs={6} className="mt-30">
                           <h2>158k</h2>
                           <small>Supported Countries</small>
                            </Col>
                       </Row>
                   </Col>

                   <hr className=""/>
                   <Col lg={12} className="text-center">
                       <p>Copyright 2021 <a>Peacecoin Inc.</a> All Rights Reserved</p>
                   </Col>
               </Row>
           </Container>
           </section>
        </>
    );
}

export default Footer;