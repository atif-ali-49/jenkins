import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import '../PeaceMovement/PeaceMovement.scss';

function PeaceMovement() {
    return (
        <section className="section noncrypto-movement">
        <Container>
            <Row className="align-items-centr">
                <Col lg={12}>
                <h1 className="noncrypto-heading text-center">Peace Movement</h1>
                <h4 className="subheading text-center">Preface</h4>
                </Col>

                <Col xl={6} className="mt-30">
                <p className="paragraph">Peacecoin aims to unite the masses and their intentions for the betterment of humanity. It emerges to bring all economies and ethnicities together. Peacecoin is a selfless project executed to help others. Being a complete paradigm shift in a peace movement world, Peacecoin intends binding people as one.</p>
             
              <div className="detail-movement pl-30">
               <h3 className="secondaryHeading f-24 pl-10 mt-20">PEACECOIN GOAL</h3>
               <p className="paragraph fWeight-700 pl-10">Born in 2020, an era of hard times for our planet,  humanity and for ourselves .Peacecoin urges to revive the time for reflection and forgiveness  ,sustain the right of freedom and establish unity and justice to prevail love and equality around the globe.</p>
                  <p className="pl-5 paragraph fWeight-700">The Peacecoin Project! uniting and connecting the world together in peace.</p>
              </div>
                </Col>

                <Col xl={6} className="mt-20" >
                <div className="laptop-cover">
                <video playsInline controls muted >
                <source src="https://s3.us-east-2.amazonaws.com/b.peacecoin.io/sizzle_videos/english.mp4" type="video/mp4"/>
                </video>
                </div>

                </Col>
            </Row>
        </Container>
        </section>
        
    )
}

export default PeaceMovement
