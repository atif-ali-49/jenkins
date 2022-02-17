import React from 'react'
import { Container,Row,Col, Image } from 'react-bootstrap';
import './DonationStyle.scss';
import {NavLink} from 'react-router-dom'

function DetailDonation() {
    return (
		    <section className="detail-donation-page">
				<div className="background">
					<Container>
						<Row className="align-items-center">
							<Col lg={12}>
								<div className="my-5 float-right">
									<h1 className="noncrypto-heading">PEACECOIN GIVES</h1>
                     				<h3 className="text-center">CHARITY &amp; CAUSE</h3>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
				<Container>
				 <Row>
					 <Col lg={12} className="laptop-screen-cover">
								<div className="mt-3 text-center">
									<h1 className="noncrypto-heading">PEACECOIN GIVES</h1>
                     				<h3 className="text-center">CHARITY &amp; CAUSE</h3>
								</div>
							</Col>
					 <Col lg={12} className="my-40">
						<p className="paragraph px-10 text-justify">Peacecoin believes empowering its community outside of the Peacecoin Movement and Peacecoin Mission to build Technology and Construction Trade Schools around the world. Peacecoin Inc. is proud to represent its involvement to charities that truly make a difference.</p>
						<p className="paragraph px-10 text-justify">As a startup, Peacecoin Inc has wasted no time to contribute to major charities and causes such as the Morris Brown College of Atlanta, Georgia. Morris Brown is a leading institution helping historically young black men and women find higher education and trade skills in the academic subjects such as literature, philosophy, mathematics, and social and physical sciences. Morris Brown excels in highest education standards of today’s premier private Christian colleges. Finally, Peacecoin Inc. is super proud to have made a substantial donation and will continue its commitment to the men and women who have served and for our nation through the United States veterans fund known as the WOUNDED WARRIOR PROJECT. Peacecoin Inc. and the entire Peacecoin Inc. management and team stands beside the men and women who have sacrificed and fought for Freedom so we can all have an opportunity to flourish and prosper.</p>
						<p className="paragraph px-10 text-justify">We at Peacecoin Inc. are proud of our association with these tremendous nonprofit institutions and we will do our level best to help them achieve their goals.</p>
						<div className="d-flex flex-wrap justify-content-center">
							{/* <NavLink exact to={{ pathname: "https://www.unitedinpeace.org" }} target="_blank" ><button type="button" className="btn  btn-outline-success mf-10">Donate to United In Peace</button></NavLink> */}
							<NavLink exact  to={{ pathname: "https://morrisbrown.edu/give/" }} target="_blank"><button type="button" className="btn  btn-outline-success mf-10">Donate to Morris Brown College</button></NavLink>
							<NavLink exact to={{ pathname: "https://support.woundedwarriorproject.org/Default.aspx?tsid=10043" }} target="_blank" ><button type="button" className="btn  btn-outline-success mf-10">Donate to Wounded Warrior</button></NavLink>
						</div>
					 </Col>
				 </Row>
				</Container>
					
			</section>
    )
}

export default DetailDonation
