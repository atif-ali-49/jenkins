import React from 'react';
import {NavLink} from 'react-router-dom';
import './Blitz.scss';
import { Container, Row,Col } from 'react-bootstrap'
function Blitz(props:any) {
    return (
  
        <section id="mb-1 ">
            <div className=" py-5 ">
                <Container fluid>
                    <Row className="align-items-center bg_code p-3">
                        <Col lg={6} className="paddingX-axis ">
                        <div className='d-flex align-items-center justify-content-center'>
                           <div>
                                <h3  className='code_head mt-5'>WELCOME TO</h3>
                                <h3 className='code_head mt-0'>INVEX EXCHANGE</h3>
                                <p className='text-justify mt-4'>
                                Looking forward to trade in Cryptocurrency at a secure platform? </p>
                               <p className="mt-2"> Your'e at the right place!</p>
                                <p className="text-justify mt-2">Invex Exchange is one of the top Crypto Exchanges in the world; where you can send, 
                                    receive and store your digital assets. Invex Exchange let's you perish the safest transactions
                                     powered by cutting edge technology.
                                     Invex Exchange is emerging to be the world's top Cryptocurrency Exchange.</p>
                                     <p className="text-justify mt-2"><b>The world's changing!</b></p>
                            </div>
                        </div>
                        </Col>

                        <Col lg={6} className="video-column text-center  mt-4 p-5">
                            <video width="80%" controls poster="/img/tumbnail_2.png">
                                <source src="https://media.peacecoin.io/sizzle_videos/exchangeintro.mp4" type="video/mp4" />                   
                                Your browser does not support the video tag.
                            </video>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="container">
                <div className="row">
                    {/* <div className="col-12 mt-5 text-center">
                       <NavLink exact to="/business-promotion" target="_blank"><img src="/img/summit-event1.jpg" className="img-fluid"></img></NavLink> 
                     </div> */}

                    <div className="col-12 mt-5 text-center">
                        <img src="https://s3.us-east-2.amazonaws.com/b.peacecoin.io/frontend/images/title.png" className="img-fluid"></img>
                         <NavLink exact to="/crypto/register" className="btn primaryButton mx-auto mt-3">Join Us</NavLink>
                     </div>

                    <div className="col-12 mt-5">
                        <video controls preload="none" loop muted  width="100%" className="player" poster="https://media.peacecoin.io/marketposter.png">
                            <source src="https://s3.us-east-2.amazonaws.com/b.peacecoin.io/sizzle_videos/fb_ad.mp4" type="video/mp4"></source>
                        </video>
                    </div>

                    <div className="col-12 mt-3">
                        <h1 className="text-center my-4">Peacecoin Explainer Video</h1>
                        <video controls preload="none" loop muted  width="100%" className="player" poster="https://media.peacecoin.io/compen.png">
                            <source src="https://media.peacecoin.io/peacecoin2_videos/pc_whiteboard.mp4" type="video/mp4"></source>
                            
                        </video>
                    </div>
                    {/* <div className="col-12 mt-3">
                        <h1 className="text-center my-4">Peacecoin Opportunity Call (Blitz)</h1>
                        <video controls preload="none" loop muted  width="100%" className="player" poster="https://media.peacecoin.io/peacecoin-blitz-thumnailll.png">
                            <source src="https://media.peacecoin.io/videos/PEACECOIN_OPPURTUNITY_CALL_(BLITZ).mp4" type="video/mp4"></source>
                        </video>
                    </div> */}

                </div>
            </div>
        </section>
    );
}

export default Blitz;