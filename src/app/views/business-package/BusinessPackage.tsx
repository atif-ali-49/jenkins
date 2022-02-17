import React,{useEffect,useState} from 'react'
import { Row, Container, Col, Image, Button } from 'react-bootstrap';
import './BusinessPackage.scss';
import {useHistory} from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { GiConsoleController } from 'react-icons/gi';
function BusinessPackage() {
	const history = useHistory();
	const[businessTrainingSessionData,setBusinessTrainingSessionData] = useState<null | any>({});
	const[endDate,setEndDate] = useState(true);
	const[loading,setLoading] = useState(true);
	const[ticketStock,setTicketStock] = useState(false);
    const businessTraining = (data) =>{
		localStorage.setItem('businessTraining',JSON.stringify(data));
		history.push('/business/training/checkout');
    }
	const baseurl = process.env.REACT_APP_API_END_POINT;
	const getBusinessTrainingSession =  async () =>{
		// show_permanent_user_lottery
		await axios.get(baseurl + '/show_guest_user_opportunity')
			.then(function (response) {
				if (response.data.code === 200) {
					setBusinessTrainingSessionData(response.data.opportunity[0])
				}
			})
			.catch(function (error) {
				console.log(error)
			})
			.then(()=> setLoading(false))
	}
	useEffect(()=>{
		getBusinessTrainingSession();
	},[]);

     useEffect(()=>{
		if(businessTrainingSessionData?.id){
			let   date2 = new Date();
			let   time1 = moment(businessTrainingSessionData?.end_date).format('YYYY-MM-DD');
			let   time2 = moment(date2).format('YYYY-MM-DD');
			let   finalResult = moment(time2).isSame(time1); // true
			console.log('finalResult', finalResult)
			if(finalResult === true){
				setEndDate(true)
				setLoading(false);

				console.log('inside if')
			}else{
				setEndDate(false);
				setLoading(false);
				console.log('else')
			}
			//for check stock of tickets
			if(businessTrainingSessionData?.max_limit < 1){
				setTicketStock(true);
			}
		}
	 },[businessTrainingSessionData])

	 const LoadingComponent = ()=>{
		 return(
			<Container className="py-50">
				<Row className="align-items-center justify-content-center">
					<Col lg={6} className={"mx-auto mt-20"}>
						<div className="spinner-border text-warning" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</Col>
				</Row>
			</Container>
		 )
	 };
	 
	 const PurchasingClosed = ()=> {
		 return(
			<section className="business-promotion">
				{
					<Container className="py-50">
						<Row className="align-items-center justify-content-center">
							<Col lg={6} className={"mx-auto mt-20"}>
								{
									businessTrainingSessionData?.id ?
									<div className="alert alert-info"><b>Opps!</b> No more tickets available. Training Session will be held on <b>{businessTrainingSessionData?.id && moment(businessTrainingSessionData?.draw_date).format('Do MMM  YYYY')}</b> </div>
									  :
										<div className="alert alert-info"><b>Opps!</b> No more tickets available.</div>
								}
							</Col>
						</Row>
					</Container>
				}
			</section>
		 )
	 };

	return (
		
		<section className="business-promotion">
			{
				loading ?
					<LoadingComponent />
				:

				<>
					<div className="myContainer">
						<Container className="h-100 d-flex">
							<Row className="align-items-center justify-content-center">
								<Col lg={12}>
									<h1 className="text-light">
										{
											(businessTrainingSessionData && businessTrainingSessionData.title) ?
											
											businessTrainingSessionData.title
											:
											'1-S Business Seminar Package'
										}
									</h1>
									{/* <p className="text-light">JOIN COACH KENNY AND THE ENTIRE PEACECOIN LEADERSHIP AT THE PRESTIGOUS HILTON HOTEL GLENDALE NORTH &amp; LATER THAT EVENING AT THE ELEGANT BRANDVIEW BALLROOM AT THE AMERICANA IN GLENDALE CALIFORNIA – BY RSVP ONLY</p> */}
								</Col>
							</Row>
						</Container>
					</div>
					{
					   
					   (!endDate && !ticketStock) ?	
						<>
							<Container className="py-50">
								<Row className="align-items-center custmBulletsWithTickMark">
									<Col lg={6}>
										<div dangerouslySetInnerHTML={{ __html: businessTrainingSessionData?.intro }}></div>
										<div dangerouslySetInnerHTML={{ __html: businessTrainingSessionData?.desc }}></div>
										
										<Button className="btn businessDetailBtn mt-30 " data-toggle="modal" data-target="#staticBackdrop">Join</Button>
									</Col>

									<Col lg={6}>
										<Image src='/img/business-promotion.png' className="img-fluid"></Image>
									</Col>
								</Row>
							</Container>	
							<div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false"
							aria-labelledby="staticBackdropLabel" aria-hidden="true">
							<div className="modal-dialog modal-dialog-scrollable modal-lg">
								<div className="modal-content">
									<div className="modal-header">
										<h6 className="modal-title"
											id="staticBackdropLabel">PEACECOIN BUSINESS SEMINAR HILTON HOTELS GLENDALE NORTH</h6>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
									</div>
									<div className="modal-body">
										<p className="f-18"><b>COVID-19 DISCLAIMER</b></p>
										<p className="mb-0">Before you proceed further, please read the following terms and conditions.</p>
										<p>To prevent the spread of <b>COVID-19:</b></p>
										<ol className="f-14">
											<li>Maintain a safe distance from others, even if they don’t appear to be sick.</li>
											<li>Wear a mask in the Business Training Session especially indoors or when physical distancing is not possible and also during the Peace Ride outdoors.</li>
											<li>Avoid touching your eyes, nose, and mouth with unwashed hands.</li>
											<li>Choose open, well-ventilated spaces over closed ones. </li>
											<li>Clean your hands often. Use soap and water, or an alcohol-based hand rub.</li>
											<li>Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze.</li>
											<li>Stay home if you feel unwell.</li>
										</ol>
										<p className="f-14">Neither the Company nor the person referring to any individual for participating in the Business Training Session and Peace Ride shall be held liable or responsible in any manner whatsoever for the ignorance of any individual and for not rendering due care as prescribed above and as per the prevailing policies of the state to prevent the spread of COVID-19. </p>
										<h6>TERMS &amp; CONDITIONS RETURN POLICY, PRIVACY, AND FURTHER DISCLAIMERS</h6>
										<p className="my-20">All ticket sales are final. All ticket Sales are RSVP and seating is limited to a specific number of attendees and capacity of Hilton Hotel event center. </p>
										<p className="my-20"> This seminar, training, and presentation is FOR ILLUSTRATION PURPOSES ONLY and PEACECOIN INC. and all of its global presenters or affiliates or founders and or principles or officers or Corporate executives or IT Teams do not guarantee that any affiliate will receive any level of Income rewards, or commissions set forth in the presentations or social events.</p>
										<p className="my-20">All information’s of all members and their Guests and any financial transactions pertaining to these events and any records are confidential and private.</p>
										<p><i>I have read all the above-mentioned terms and conditions carefully and I hereby acknowledge and agree not to violate any of them and accept the terms and conditions outlined. I also hereby acknowledge and agree that neither the Company nor the person referring any individual for participating in the Business Training Session and the Peace Ride shall be held liable or responsible in any manner whatsoever for the ignorance of any individual and for not rendering due care as prescribed above and as per the prevailing policies of the state to prevent the spread of COVID-19. </i></p>

									</div>
									<div className="modal-footer">
										<a type="button" data-dismiss="modal">Disagree</a>
										<button type="button" className="btn btn-warning text-white"
												data-dismiss="modal"
												onClick={() => businessTraining(businessTrainingSessionData)}>Agree
										</button>
									</div>
								</div>
							</div>
						</div>
						</>
						:
						<PurchasingClosed />
					}
				</>

					
			}		
		</section>
	)
}

export default BusinessPackage
