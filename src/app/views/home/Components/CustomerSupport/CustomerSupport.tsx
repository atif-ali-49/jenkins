import React from 'react'
import { Container, Row,Col,Image } from 'react-bootstrap'
import './CustomerSupport.scss'

function CustomerSupport() {
    return (
        <section className="customersupport">
         <Container fluid>
             <Row className="align-items-center">
                 <Col lg={6} className="px-0">
                 <Image src={'img/customersupport.jpg'} fluid></Image> 
                 </Col>
                 <Col lg={6} className="text-center">
                     <h1 className="noncrypto-heading my-40 text-light">24/7 Customer Support</h1>
               <p className="paragraph text-light">Live Customer Service around the clock & around the globe 24/7 Representatives on Standby to assist you with any account and order questions. Simply dial (424) 732-2326 . Stay tuned for Live Chat services. You may also submit any support questions by email at support@peacecoin.com</p>
                 </Col>
             </Row>
         </Container>
        </section>
    )
}

export default CustomerSupport
