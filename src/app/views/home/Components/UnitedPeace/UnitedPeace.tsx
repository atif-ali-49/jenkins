import React from 'react'
import { Container,Row,Col, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './UnitedPeace.scss';

function UnitedPeace() {
    return (
        <section className="section noncrypto-united-peace">
         <Container>
             <Row className="align-items-center justify-content-between">
                 <Col lg={12}  className="text-center">
                     <h1 className="noncrypto-heading">PEACECOIN GIVES</h1>
                     <h3 className="subheading">CHARITY & CAUSE</h3>
                 </Col>
                 <Col lg={12} className="text-center">
                   
                    <div className="mt-30 mb-30 paragraph">
                    <p className="paragraph px-10">Peacecoin believes empowering its community outside of the Peacecoin Movement and Peacecoin Mission to build Technology and Construction Trade Schools around the world. Peacecoin Inc. is proud to represent its involvement to charities that truly make a difference.</p>
                    <NavLink exact to="/donate"><button className="btn primaryButton mt-3">See more</button></NavLink> 
                   
                    </div>
                 </Col>
             </Row>
         </Container>
        </section>
    )
}

export default UnitedPeace
