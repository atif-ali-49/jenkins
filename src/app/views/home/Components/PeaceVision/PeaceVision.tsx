import React from 'react'
import { Col, Container, Row,Tabs,Tab } from 'react-bootstrap'
import PeaceTabs from '../PeaceVision/PeaceTabs'
import '../PeaceVision/PeaceVision.scss';
import {GiArcheryTarget} from 'react-icons/gi'
import {IoMdRocket} from 'react-icons/io'
import {BsClipboardData} from 'react-icons/bs' 
import {DiStreamline} from 'react-icons/di'


function PeaceVision() {
    return (
       <section className="section bgLight noncrypto-peacevision" >
           <Container>
               <Row>
                   <Col lg={12} className="text-center">
                    <h1 className="noncrypto-heading">Peace Vision</h1>
                    <h1 className="subheading">Peace Vision</h1>
                   </Col>
               </Row>
            
    <div className="row justify-content-center">
    <ul className="nav nav-tabs mt-50" role="tablist">
	<li className="nav-item text-center">
		<a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">
      <DiStreamline className="vert-move"/>
        <h3 className="secondaryHeading">Our Vision</h3>
        
        </a>
	</li>
	<li className="nav-item ">
		<a className="nav-link text-center" data-toggle="tab" href="#tabs-2" role="tab"> 
         <IoMdRocket className="vert-move"/>                 
         <h3 className="secondaryHeading">Our Mission</h3>
         </a>
        
	</li>
	<li className="nav-item ">
		<a className="nav-link text-center" data-toggle="tab" href="#tabs-3" role="tab">   
        <BsClipboardData className="vert-move"/> 
        <h3 className="secondaryHeading">Our Plan</h3>
        </a>
	</li>
    <li className="nav-item ">
		<a className="nav-link text-center" data-toggle="tab" href="#tabs-4" role="tab">   
        <GiArcheryTarget className="vert-move"/>
        <h3 className="secondaryHeading">Our Purpose</h3>
        </a>
	</li>
</ul>
</div>
<div className="tab-content mt-50">
	<div className="tab-pane active" id="tabs-1" role="tabpanel">
    <PeaceTabs head="Our Vision" paragraph="We envision a world where everything is equal. Peacecoin's aim is to eradicate poverty and homelessness." image={'img/vision.jpg'} />
	</div>
	<div className="tab-pane" id="tabs-2" role="tabpanel">
    <PeaceTabs head="Our Mission" paragraph="Peacecoin's mission is to rebuild the wasted urban cities in America and war torn countries, globally. Peacecoin stands for peace and harmony and that is what we want to achieve." image={'img/mission.jpg'} />
	</div>
	<div className="tab-pane" id="tabs-3" role="tabpanel">
    <PeaceTabs head="Our Plan" paragraph="We will start in the United States of America by building construction trade schools everywhere, which will be dedicated to teach the 17 Trades of Construction to the underserved communities." image={'img/plan.jpg'} />
	</div>
    <div className="tab-pane" id="tabs-4" role="tabpanel">
    <PeaceTabs head="Our Purpose" paragraph="To shed light on the true meaning of peace, redefine its context internationally and to bring people together." image={'img/purpose.jpg'} />
	</div>
</div>
                
        </Container>

       </section>
    )
}

export default PeaceVision
