import React from 'react'
import {Container,Row,Col,Image} from 'react-bootstrap'
import '../Features/Feature.scss';
import FeatureCard from '../Features/FeatureCard'
import {GiRoyalLove,GiThreeFriends,GiFreedomDove,GiTopPaw} from 'react-icons/gi'
import {ImHappy2} from 'react-icons/im'
import {FaEquals} from 'react-icons/fa'
import {AiFillHeart} from 'react-icons/ai'



function Feature() {
    return (
        <section className="section noncrypto-feature-background">
        <Container>
            <Row>
            <Col lg={12}>
             <h1 className="noncrypto-heading text-light text-center">Our Features</h1>
             <h4 className="subheading text-center mb-40">Top Qualities</h4>
                </Col>
                <Col lg={4}>
              <FeatureCard icons={<AiFillHeart className="redheart"/>}  head="LOVE" para="I LOVE YOU"/>
                </Col>
                <Col lg={4}>
                <FeatureCard icons={<ImHappy2/>}  head="HAPPINESS" para="FLOURISH &amp; PROSPER"/>
                </Col>
                <Col lg={4}>
                <FeatureCard icons={<GiThreeFriends/>}  head="FRIENDSHIP" para="FRIENDS ARE THE SIBLINGS GOD NEVER GAVE US"/>
                </Col>

                <Col lg={4}>
                <FeatureCard icons={<FaEquals/>}  head="EQUALITY" para="ALL MEN ARE CREATED EQUAL"/>
                </Col>
                <Col lg={4}>
                <FeatureCard icons={<img src="/img/freedom1.png" className="icon-img img-fluid"></img>}  head="FREEDOM" para="DREAM BIG"/>
                </Col>
                <Col lg={4}>
                <FeatureCard icons={<img src="/img/oppor.png" className="icon-img img-fluid"></img>}   head="OPPORTUNITY" para="BUILDING TECHNOLOGY AND CONSTRUCTION CAMPUSES"/>
                </Col>
            </Row>
        </Container>
        </section>
    )
}

export default Feature
