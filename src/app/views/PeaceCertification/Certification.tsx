import React from 'react'
import { Container, Image, Row,Col } from 'react-bootstrap'
import './Certification.scss'

function Certification() {
    return (
        <section id="cards" className="section">
        <Container>
            <Row>
                <Col sm={12} className="text-center">
                    <div className="card-text-cover">
                        <h1 className="noncrypto-heading">Peace Movement Certifications</h1>
                        <h3 className="my-4">What Local and State Leaders are Saying
                        </h3>
                        <p className="paragraph">For the past 8 years almost every month the Peace Movement has taken its Peace rallies to the
                            streets of Los Angeles and across the United States promoting the message of unity, peace,
                            and prosperity. Leaders around the and across cities have recognized this tremendous service
                            to the People and backed their support.</p>
                    </div>
                    <Image src="https://media.peacecoin.io/card4.png" fluid/>
                </Col>
            </Row>
        </Container>
    </section>
    )
}
export default Certification
