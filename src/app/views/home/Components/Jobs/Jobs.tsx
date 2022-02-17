import React from 'react'
import { Row,Container,Col,Image, Button } from 'react-bootstrap';
import '../Jobs/Job.scss';
import {AiOutlineBarChart} from 'react-icons/ai';
import {FaUserSecret} from 'react-icons/fa';
import {GrDocumentPerformance} from 'react-icons/gr';
import { NavLink } from 'react-router-dom';

function Jobs() {
    return (
       <section className="section noncrypto-jobs">
           <Container>
               <Row className="justify-content-center">
                   <Col lg={12} className="text-center">
                       <h1 className="noncrypto-heading">Peace Jobs</h1>
                       <h4 className="subheading">For You</h4>
                   </Col>
                    <ul className="nav nav-tabs mt-30" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#tabs-6" role="tab">Low Tech</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " data-toggle="tab" href="#tabs-7" role="tab">High Tech</a>
                        </li>
                    </ul>
               </Row>

                <div className="tab-content mt-30 ">
                    <div className="tab-pane active" id="tabs-6" role="tabpanel">
                    <Row className="align-items-center">
                    <Col lg={6}>
                    <Image src={'img/lowjobs.png'}  className="mx-auto d-block" fluid/>
                    </Col>
                    <Col lg={6}>
                        <h2 className="f-32 my-30">Low Tech</h2>
                    <h3 className="secondaryHeading">BUILDING CONSTRUCTION TRADE CAMPUSES AROUND THE WORLD</h3>
                    <p className="paragraph fWeight-500 my-30"> The Peacecoin Movement (PCM) strongly believes in building communities, inner cities, and providing job opportunities for both men and women where it matters the most – infrastructure development. PCM through its dedicated efforts intends to make it possible for central city men and women to attain remunerative job opportunities in the field of construction trades – The 17 Construction Trades & Tools.</p>
                    <p className="paragraph">By making true efforts to provide opportunities to men and women to flourish and prosper in a level paying field, everlasting difference is possible!  And Peacecoin is the right platform to do so!!</p>
                    
                    <div className="d-flex justify-content-center my-50">
                    <div className="job-detail d-flex">
                    <AiOutlineBarChart/>
                    <div className="ml-20">
                    <p className="f-28 mb-0">1</p>
                    <small> Years</small>
                    </div>
                    
                    </div>
                    <div className="job-detail d-flex">
                    <img src='/img/services.png' className='services-img mt-1'></img>
                    <div className="ml-20">
                    <p className="f-28 mb-0">17</p>
                    <small>Services</small>
                    </div>
                
                    </div>
                    <div className="job-detail d-flex">
                    <GrDocumentPerformance/>
                    <div className="ml-20">
                    <p className="f-28 mb-0">1</p>
                    <small>Completed</small>
                    </div>
                
                    </div>
                    </div>

                    <NavLink exact to="/register"><Button className="btn primaryButton px-30 mx-auto d-block">Start</Button></NavLink>
                    </Col>

                    </Row>
                    </div>
                    <div className="tab-pane  " id="tabs-7" role="tabpanel">
                    <Row className="align-items-center">
                    <Col lg={6} className="order-md-1 order-lg-2">
                    <h2 className="f-32 my-30">HIGH TECH</h2>
                    <h3 className="secondaryHeading">BUILDING TECHNOLOGY CAMPUSES AROUND THE WORLD</h3>
                    <p className="paragraph fWeight-500 my-30"> VISTA TECHNOLOGIES from Silicon Valley and the PEACECOIN MOVEMENT have teamed up to bring to inner cities everywhere JOBS in the exciting technology domain.</p>
                    <p className="paragraph">From Low Tech Learning to High Tech Learning Curriculums and Trade in the real world of today’s fast moving and exciting technologies. Hardware learning, Software development, Computer and AI Learning, Blockchain curriculums are just some of the many learnings and skill sets that we will focus on. Brining the best and cutting-edge high paying opportunities for the first time ever to the inner-city youths and young adults.</p>
                    
                    <div className="d-flex justify-content-center my-50">
                    <div className="job-detail d-flex">
                    <AiOutlineBarChart/>
                    <div className="ml-20">
                    <p className="f-28 mb-0">1</p>
                    <small> Years</small>
                    </div>
                
                    </div>
                    <div className="job-detail d-flex">
                     <img src='/img/services.png' className='services-img mt-1'></img>
                    <div className="ml-20">
                    <p className="f-28 mb-0">9</p>
                    <small>Services</small>
                    </div>
                
                    </div>
                    <div className="job-detail d-flex">
                    <GrDocumentPerformance/>
                    <div className="ml-20">
                    <p className="f-28 mb-0">1</p>
                    <small>Completed</small>
                    </div>
                
                    </div>
                    </div>

                    <NavLink exact to="/register"><Button className="btn primaryButton px-30 mx-auto d-block">Start</Button></NavLink>
                    </Col>
                    <Col lg={6} className="order-md-1 order-lg-2">
                    <Image src={'img/highjobs.png'} className="mx-auto d-block" fluid/>
                    </Col>
                    </Row>
                    </div>

                </div>

           </Container>
          

       </section>
    )
}

export default Jobs
