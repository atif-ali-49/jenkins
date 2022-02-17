import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import GetTouchCard from './GetTouchCard'
import {VscCommentDiscussion } from 'react-icons/vsc';
import {RiArticleLine} from 'react-icons/ri'; 
import {FaQuestionCircle} from 'react-icons/fa'; 
import { NavLink } from 'react-router-dom';


function GetInTouch() {
    return (
        <section className="section">
            <Container>
                <Row>
                    <Col lg={12} className="text-center">
                    <h1 className="noncrypto-heading">Get In Touch With PEACECOIN</h1>
                    <h4 className="subheading">Our Evolution</h4>
                    </Col>
                    <Col lg={4}>
                        {/* <NavLink exact href="https://unitedinpeace.org/"><GetTouchCard image={<VscCommentDiscussion/>} text="Our Community"/></NavLink> */}
                        <NavLink exact to="/donate"> <GetTouchCard image={<VscCommentDiscussion/>} text="Our Community"/></NavLink>
                    </Col>
                    <Col lg={4}>
                    <NavLink exact to="/faq"> <GetTouchCard image={<FaQuestionCircle/>} text="Faqs"/></NavLink>
                    </Col>

                    <Col lg={4}>
                    <NavLink exact to="/blog"><GetTouchCard image={<RiArticleLine/>} text="Blog"/></NavLink>
                    </Col>
                </Row>
            </Container>
          
        </section>
    )
}

export default GetInTouch
