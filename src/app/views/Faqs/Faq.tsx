import React, {useState} from 'react'
import { Container, Row,Col, Card, Image } from 'react-bootstrap'
import FaqsComponent from './FaqsComponent'
import './Faq.scss'

function Faq() {
    return (
        <section id="faqs" className="">        
            <Container fluid className="faqs-background">
                <Row className="align-items-center d-flex h-100">
                    <Col xs={12} className="text-center">
                        <h1 className="noncrypto-heading text-center text-light">FAQS</h1>
                        <h3 className="section-title text-light">Frequently Asked Questions</h3>
                    </Col>
                </Row>            
            </Container>

            <Container className="py-3">    
               <FaqsComponent/>
            </Container>
    </section>
    )
}

export default Faq
