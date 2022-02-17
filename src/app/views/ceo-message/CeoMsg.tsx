import React from 'react'
import './CeoMsg.scss'
import { Container, Row, Col, Card, Image } from 'react-bootstrap'

function CeoMsg() {


	return (
		<section id="ceomsg">
			<div className="background">
				<Container>
					<Row>
						<Col lg={12}>
							<div className="float-right my-5">
								<h2 className="text-light text-uppercase font-weight-lighter">CEO Message</h2>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<Container>
				<Row className="pb-3">
					<Col lg={5} className="negative-top">
						<Image src="/img/tonynew.png" className="mx-auto d-block" fluid />
						<div className="tony-caption p-1 text-center">
							<h5>ABDUL MALIK SAYYID MUHAMMAD</h5>
							<p className="paragraph pt-10">CO FOUNDER</p>
						</div>
					</Col>
					<Col lg={7}>
						<h3 className="mt-5">About CEO</h3>
						<p className="paragraph mt-30 text-justify">
							American businessman and philanthropist Minister Abdul Malik Sayyid Muhammad is the Co-Founder of the United in Peace Foundation a non-profit organization &amp; Now The Peacecoin Inc Movement. He has been promoting Peace for over 30 years and community service across the country, reaching and touching people globally. Mr. Abdul Malik has won Proclamations, Award & Commendations from individuals, from businesses, major cities, City Councilman and Councilwoman, even up to members of State level Congress.
						</p>
						<p className="mb-0">Mr. Tony Muhammad, known by many, in 2020 Co-Founded and together with an amazing group of people and launched a Global Peace Movement initiative bringing LOVE, EQUALITY, AND OPPORTUNITY together in a unique and one platform ecosystem called PEACECOIN. Peacecoin touches on the sales of manufacturing of precious valuable metals known to mankind since the inception of time. It touches on a grassroots movement bringing the messages and many more of the United in Peace Movement to mainstream Worldwide. It touches on Opportunity and Equality through the engagement of commerce both home based, and small business based opportunities through a powerful Third Party Sales and P2P sales and affiliate models. It touches on Technology in low and high tech. Most of all, it touches the human kindness side BRINGING THE LOVE & MESSAGE OF PEACE TO PEOPLE AROUND THE WORLD.</p>
					</Col>
					<Col lg={12}>
						<p className="paragraph mt-40 text-justify">
							<b>PEACECOIN INTENDS, AND WILL BUILD TRADE & TECHNOLOGY CENTERS AROUND THE WORLD HELPING THE UNDERPRIVILEGED BECOME PRODUCTIVE AND THE PRODUCTIVE BECOME TYCOONS AND FOR BOTH, PROUD MEMBERS OF SOCIETY.</b>
						</p>

						<div className="float-right signature my-50">
							<p>	ABDUL MALIK SAYYID MUHAMMAD </p>
							<p>CO FOUNDER,</p>
							<p>PEACECOIN INC.</p>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
		// <div className="text-center section container">
		// 	<div className="row ErrorBoundary d-flex align-items-center">
		// 		<div className="col-lg-5"><img src="/img/client-dashboard/404robot.png"/></div>
		// 		<div className="col-lg-7"><h2 className="my-30" >Something went wrong & its from our end, we will fix it soon! Please click the below button and refresh page again</h2></div>
		// 	</div>	  
		//   <a className="text-dark mt-3" onClick={()=>window.open('/', '_self')} href="javascript:void(0);"><BiArrowBack className="f-24"/> Go To Home</a><br/><br/>
	
		// </div>
	)
}
export default CeoMsg
