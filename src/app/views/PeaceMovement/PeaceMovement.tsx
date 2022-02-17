import React from 'react'
import { Container,Row,Col, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './PeaceMovement.scss'

function PeaceMovement() {
    return (
        <section id="join" className="section">
        <Container>
            <Row className="align-items-center">
                <Col xs={12}>
                    <h1 className="text-center noncrypto-heading">Join the Peacecoin Movement
                    </h1>
                </Col>
                <Col lg={6}>
                    <div className="hover-img">
                        <Image src="https://media.peacecoin.io/tony2.png"  alt="" fluid/>
                    </div>
                </Col>
                <Col lg={6}>
                    <h2 className="join-text secondaryHeading">How we do it? Bringing people out of their homes and sharing the way to
                        happiness and helping them flourish and prosper!</h2>
                    <p className="mt-5 join-text paragraph">The Peacecoin Movement is all about the people and all about enhancing
                        people’s financial lives. For the first time ever an organized movement has mobilized with the
                        help of community, leadership, and technology both from the ground and the cloud combining both
                        worlds with the element of Precious Metal (Silver, Gold, Platinum) Jewelry sales.</p>
                    <Link to="/register"><button className="mx-auto d-block btn primaryButton">Join Us</button></Link>
                </Col>
            </Row>
        </Container>
    </section>
    )
}

export default PeaceMovement
