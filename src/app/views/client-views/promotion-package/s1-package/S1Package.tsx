import React  from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MBox, MTypography, MPaper, MGrid,MButton,MCircularProgress } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import useStyles from './S1PackageStyles'
import {useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import Alert from '@material-ui/lab/Alert';
function S1Package() {
	const classes = useStyles();
	const [temp, setTemp] = useState(false);
	const [cartItems, setCartItems] = useState<null | any>([]);
	const [summit,setSummit] = useState<null | any>({});
	const [open, setOpen] = React.useState(false);
	const [loading, setLoading] = useState(false);
	const[endDate,setEndDate] = useState(false);
	const history = useHistory();
	const baseurl = process.env.REACT_APP_API_END_POINT;
	const getS1Pkg =  async () =>{
		 setLoading(true)
		 // show_permanent_user_lottery
		 await axios.get(baseurl + '/show_permanent_user_opportunity')
			 .then(function (response) {
				 if (response.status === 200) {

					 if(response.data.opportunity.length > 0){
						 setSummit(response.data.opportunity[0])
						 setLoading(false)
						 console.log('if of response')
					 }else{
					 	setLoading(true);
						 console.log('else of response')
					 }

				 }
			 })
			 .catch(function (error) {
                console.log(error)
				 setLoading(false)
			 })
			 .then(function () {
				 setLoading(false)
			 })
	 }
	// end date check karty he
	useEffect(()=>{
		if(summit?.id){
			let date2 = new Date();
			let time1 = Moment(summit?.end_date).format('YYYY-MM-DD');
			let time2 = Moment(date2).format('YYYY-MM-DD');
			// let time2 = Moment(date2).format('2021-11-10');
			let final_result = Moment(time2).isSame(time1); // true
			if(final_result === true){
				setEndDate(true)
				setLoading(false);
			}else{
				setEndDate(false);
				setLoading(false);
			}
		}
	},[summit])
	// if product exist in cart then set it in existing cartItems state
	useEffect(() => {
		// let get_cartItems = JSON.parse(localStorage.getItem('S1') || '[]');
		// get_cartItems.length !== 0  && setCartItems(get_cartItems)
		getS1Pkg();

	},[]);
	// for set items in redux and local Storage
	useEffect(() => {
		if(temp) {
			// let get_cartItems = JSON.parse(localStorage.getItem('S1') || '[]');
			// if(get_cartItems.length !== 0){
			// 	history.push('/client/promotion/checkout/s1');
			// 	setTemp(false);
			// 	console.log('here we are')
			// }else{
			// 	localStorage.setItem('S1', JSON.stringify(cartItems));
			// 	setCartItems(cartItems);
			// 	history.push('/client/promotion/checkout/s1');
			// 	setTemp(false);
			// }
			localStorage.setItem('S1', JSON.stringify(cartItems));
			setCartItems(cartItems);
			history.push('/client/promotion/checkout/s1');
			setTemp(false);
		}
	}, [temp]);

	 // open dialog box
	 const handleClickOpen = (s1) => {
		setOpen(true);
		setCartItems([...cartItems, {...s1, qty: 1}]);
	};
	 const S1Package = () =>{
		 setTemp(true);
		 setOpen(false);
	 }
	 const handleClose = () => {
		setOpen(false);
	};
    return (
        <div>
			{
				loading ?
				<MBox
					display="flex"
					alignItems="center"
					textAlign="center"
					height="auto"
					justifyContent="center"
				>
					<MCircularProgress />
				</MBox>:

				<>
					<MBox className="pageHeader">
						<MTypography className="mainHeading" gutterBottom component="h1" variant="h4">One Summit Package</MTypography>
						<RouterBreadcrumbs />
					</MBox>
					<MBox className="contentBox" component={MPaper}>
						<MBox>
							{
								(!endDate && summit?.max_limit > 0) ?
								<MGrid container  justify="space-between">
									
									<>
										<MGrid item xs={12} sm={12} md={6} lg={2} xl={3}>
											<MBox mt={7} textAlign="center" margin="0 auto">
												<img src="/img/client-dashboard/boo.jpg" alt="gift box"   className="img-fluid" />
											</MBox>
											<MBox mt={7} textAlign="center" margin="0 auto">
												<img src="/img/client-dashboard/boygirl.jpg" alt="t-shirt box"  className="img-fluid" />
											</MBox>
										</MGrid>

                                        <MGrid item xs={12} sm={12} md={6} lg={2} xl={3}>
											<MBox mt={3} textAlign="center" margin="0 auto">
												<img src="/img/client-dashboard/summit-cartoon.png" alt="gift box" className="img-fluid" />
											</MBox>
										
										</MGrid>

										{
											summit?.id ?
												<MGrid item xs={12} sm={12} md={6} lg={4} xl={3} key={summit?.id}>
													<MBox my={4} mx={2} className={classes.s1Cover}>
														<MBox> <img  className={classes.topBottomImage} src="/img/client-dashboard/package-top.png"></img></MBox>
														<MBox p={3}>	
															<MBox mb={3}><MTypography component="h2" variant="h5">{summit?.title}&nbsp;&nbsp;${summit?.price}</MTypography></MBox>
															<div className="custmBulletsWithTickMark green" dangerouslySetInnerHTML={{ __html: `${summit?.desc}` }}></div>
															<MBox mt={5} px={2} pb={2} className={classes.BoxContainer} >
																<MBox textAlign="center" position="relative">
																	<img className={classes.flowerImage} src="/img/flower-1.png" />
																	<MBox className={classes.TextOpportunity}>WIN </MBox>
																</MBox>
																<MBox mt={1} className={classes.textContainer}>An Opportunity to Win 18-Karat Gold/Silver/Platinum Coins.</MBox>
															</MBox>
															<MBox mt={2} textAlign="center"><b>Closing Date </b>: {Moment(summit.end_date).format('Do MMM  YYYY')}</MBox>
															<MBox textAlign="center" mt={3}><MButton variant="contained" color="primary" size="small" onClick={()=>handleClickOpen(summit)}>Purchase</MButton></MBox>
														</MBox>
														<MBox> <img className={classes.topBottomImage} src="/img/client-dashboard/packages-down.png"></img></MBox>
													</MBox>
												</MGrid>

												:
												<MGrid item xs={12} sm={12} md={6} lg={4} xl={3} justify="center">
													<MBox my={4} mx={2} className={classes.s1Cover}>
														<MBox> <img className={classes.topBottomImage} src="/img/client-dashboard/package-top.png"></img></MBox>	
                                                        <MBox p={3}>
															<MBox  mb={3} textAlign="center" alignItems='center'>

																<MBox
																	display="flex"
																	alignItems="center"
																	textAlign="center"
																	height="auto"
																	justifyContent="center"
																>
																	<MCircularProgress />
																</MBox>
															</MBox>
														</MBox>
														<MBox> <img className={classes.topBottomImage} src="/img/client-dashboard/packages-down.png"></img></MBox>

													</MBox>
												</MGrid>
										}

										<MGrid item xs={12} sm={8} md={6} lg={4} xl={3}>
											<MBox my={4} mx={2} className={classes.s1Cover}>
												<MBox> <img className={classes.topBottomImage} src="/img/client-dashboard/package-top.png"></img></MBox>
												<MBox p={3}>
													<MBox  mb={3}><MTypography component="h2" variant="h5">One Summit Package</MTypography></MBox>
													{summit?.id &&
													<MBox dangerouslySetInnerHTML={{ __html: `${summit?.intro}` }}></MBox>
													}
													<MBox mt={6}><img src="/img/client-dashboard/pkgRaffle.png" /></MBox>

												</MBox>
												<MBox > <img className={classes.topBottomImage} src="/img/client-dashboard/packages-down.png"></img></MBox>
											</MBox>

										</MGrid>

									</>

								</MGrid>
								:
								<MGrid container  item xs={12} sm={8} md={6} justifyContent="center" alignItems="center">
									<MBox> <Alert severity="info"><b>Opps!</b> Lucky Draw is Closed! We Are Sold Out! Raffle Ticket Drawings will be held on the day of the 1-S Gala Event the evening of December 4, 2021. Good Luck!!</Alert></MBox>
								</MGrid>
							}
						</MBox>
					</MBox>
				</>
			}
		{/*	 dialog for conformation*/}
			<Dialog
				open={open}
				aria-labelledby="alert-dialog-title"
				maxWidth={'md'}
			>
				<DialogTitle id="alert-dialog-title">{"PEACECOIN 1-SUMMIT GALA EVENT BRANDVIEW BALLROOMS GLENDALE, CALIFORNIA"}</DialogTitle>
				<DialogContent dividers>
					
							<MBox mb={1}><b>TERMS &amp; CONDITIONS RETURN POLICY, AND FURTHER DISCLAIMERS</b></MBox>
							<MBox>All ticket sales are final. All ticket Sales are RSVP and because the event organizer (LA Banquet 
									Halls) requires advance prepayment for RSVP seating, all ticket sales from Peacecoin Inc are final
									unless in the case that the Gala Event scheduled on the evening of December 4, 2021 is
									cancelled by organizer. One (1) Peacecoin 1-Summit Gala Ticket per person and per seat.
									Member purchasing the Gala ticket agrees to pay $199.00 per ticket. $199.00 Ticket also
									includes full access admission and VIP training to the Business Seminar &amp; Training at the Hilton
									North Glendale on the morning of the 1-S Gala event. Member can invite unlimited number of
									Guests only to the Hilton Business Training Seminar with this ticket purchase for the
									Opportunity Preview Seminar. This does not include the VIP 1-S Gala event. RSVP only.
									Limited Seating. All information’s of all members and their Guests and any financial
									Transactions pertaining to these events and any records are confidential and private.
									PARTICIPANT MUST BE PRESENT AT THE 1-S SUMMIT GALA IN-ORDER TO WIN ANY OF THE PRIZES! 
							</MBox>
                           <MBox my={2}> This seminar, training, 1-S Summit Gala and presentation is FOR ILLUSTRATION PURPOSES ONLY
								and PEACECOIN INC. and all of its global presenters or affiliates or founders and or principles or
								officers or Corporate executives or IT Teams do not guarantee that any affiliate will receive any
								level of Income rewards, or commissions set forth in the presentations or social events.
							</MBox>
							

							<MBox mb={1}><b>TERMS &amp; CONDITIONS RETURN POLICY</b></MBox>
							<MBox>All ticket sales are final. All ticket Sales are RSVP and because the event organizer (LA Banquet Halls) requires advance prepayment for RSVP seating, all ticket sales from Peacecoin Inc are final unless in the case that the Gala Event scheduled on the evening of <b>December 4, 2021</b> is cancelled by organizer.</MBox>

							<MBox mb={1} mt={2}><b>Package is applicable for the following countries only:</b></MBox>
							<ol className="f-14">
								<li>United States of America</li>
								<li>United Kingdom</li>
								<li>France</li>
								<li>Israel</li>
								<li>Canada</li>
								<li>Philippine</li>
								<li>South Africa</li>
								<li>Mexico</li>
							</ol>

							<MBox mb={1}><b>COVID-19 DISCLAIMER</b></MBox>
							<MBox>Before you proceed further, please read the following terms and conditions. </MBox>
							<MBox mb={1}>To prevent the spread of COVID-19: </MBox>
							<ol className="f-14">
								<li>Maintain a safe distance from others, even if they don’t appear to be sick. </li>
								<li>Wear a mask in the 1-Summit Gala Event, especially indoors or when physical distancing is not possible and also outdoors at the Brandview open air patio setting. </li>
								<li>Avoid touching your eyes, nose, and mouth with unwashed hands. </li>
								<li>Choose open, well-ventilated spaces over closed ones. </li>
								<li>Clean your hands often. Use soap and water, or an alcohol-based hand rub. </li>
								<li>Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze. </li>
								<li>Stay home if you feel unwell. </li>
							</ol>

							<MBox>Neither the Company nor the person referring any individual for participating in the 1 Summit Gala Event shall be held liable or responsible in any manner whatsoever for the ignorance of any individual and for not rendering due care as prescribed above and as per the prevailing policies of the state to prevent the spread of COVID-19.</MBox>
							<MBox mt={2}><i>I have read all the above-mentioned terms and conditions carefully and I hereby acknowledge and agree not to violate any of them and accept the terms and conditions outlined. I also hereby acknowledge and agree that neither the Company nor the person referring any individual for participating in the 1-Summit Gala Event shall be held liable or responsible in any manner whatsoever for the ignorance of any individual and for not rendering due care as prescribed above and as per the prevailing policies of the state to prevent the spread of COVID-19. </i></MBox>
				</DialogContent>
				<DialogActions>
					<MButton onClick={handleClose} color="secondary">Disagree</MButton>
					<MButton onClick={S1Package} color="primary" variant="contained">Agree</MButton>
				</DialogActions>
			</Dialog>
        </div>
    )
}

export default S1Package