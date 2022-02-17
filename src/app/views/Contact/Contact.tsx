import React from 'react'
import { Col, Container, Form, Image, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './Contact.scss'
import { FaBeer,FaFacebookF,FaFacebookSquare } from 'react-icons/fa';
import {HiOutlineLocationMarker,HiPhoneOutgoing} from 'react-icons/hi'
import {AiOutlineMail} from 'react-icons/ai'

function Contact() {
    return (
        <section id="contact" className="section">
        <Container>
            <Row className="align-items-center justify-content-center">
                <Col lg={12} className="text-center">
                    <h1 className="noncrypto-heading">CONTACT US</h1>
                    <p className="py-2 paragraph">Want to get in touch? We'd love to hear from you. Here's how you can reach us...</p>
                </Col>

                <Col lg={6} className="contact-cover">
                    <h1 className="text-center text-light my-3">CONTACT US</h1>
                    <Image src="https://media.peacecoin.io/logow.png" className="img-fluid mx-auto d-block mt-3"/>
                    <Form className="mt-3">
                        <Row>
                            <Col lg={6}>
                                <Form.Group>
                                    <Form.Control type="name" className="shadow-none" id="exampleInputname"
                                        aria-describedby="" placeholder="Your Name"/>
                                    <hr className="line"/>
                                </Form.Group>
                            </Col>
                            <Col lg={6} className="float-right">
                                <Form.Group>
                                    <Form.Control type="email" className="shadow-none" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" placeholder="Your Email"/>
                                    <hr className="line"/>
                                </Form.Group>
                            </Col>
                            <Col lg={12}>
                                <Form.Group>
                                    <Form.Control type="name" className="shadow-none" id="subject" aria-describedby=""
                                        placeholder="Subject"/>
                                    <hr className="line"/>
                                </Form.Group>
                            </Col>
                            <Col lg={12} className="mt-4">
                                <Form.Group>
                                    <Form.Control as="textarea" className="shadow-none" id="exampleFormControlTextarea1"
                                        placeholder="Message"></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                <NavLink exact to=""><button className="btn primaryButton mx-auto d-block my-3">Send</button></NavLink>
                </Col>
                <Col lg={6}>
                    <div className="contact-detail d-flex align-items-center">
                       <HiOutlineLocationMarker/>

                        <h3 className="f-12 line-height-normal">Location:<br/>131 N El Molino Ave Suite 310,<br/> Pasadena, CA 91101</h3>
                    </div>

                    <div className="contact-detail">
                        <AiOutlineMail/>
                        <h3 className="">Email:<br/>hi@peacecoin.com</h3>
                    </div>

                    <div className="contact-detail">
                        <a href="tel:+14247322326"><HiPhoneOutgoing/></a>
                        <h3 className="">Call:<br/><span className="footnum">(424) 732-2326</span>
                        </h3>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
    )
}

export default Contact
