import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { useEffect, useState, useRef } from "react";
import { PieChart } from 'react-minimal-pie-chart';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import {
	MAlert, MBox, MButton, MCard, MCardContent, MCardHeader, MChip, MForm,
	MFormik, MGrid, MIconButton, MPaper,
	MSkeleton, MTable, MTableBody, MTableCell, MTableContainer,
	MTableHead, MTableRow, MTextField, MTooltip, MTypography
} from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import { showAlert } from "src/app/store";
import * as Yup from 'yup';
import BtcUsd from '../charts/BtcUsd';
import News from './news-events/news/News';
import Events from './news-events/events/Events';
import GeoChart from "../charts/DaSvgChart";
import useStyles from './DashboardStyles';
import RankDrawer from "./ranksdrawer/RankDrawer";
import TransitionsModal from '../../../components/confetti-modal/TransitionsModal'
import SummitDialogue from 'src/app/components/event-dialogues/SummitDialogue'
import { RankSectionSkeleton, StatsCardSkeleton, SupportTicketSkeleton } from './skeletons/DashboardSkeletons';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const images = [
  { url: "images/1.jpg" },
  { url: "images/2.jpg" },
  { url: "images/3.jpg" },
  { url: "images/4.jpg" },
  { url: "images/5.jpg" },
  { url: "images/6.jpg" },
  { url: "images/7.jpg" },
];
export default function Dashboard(){
  const [value, setValue] = useState(0);
  const [newImages, setNewsImages]=useState([])
  const [EventImages, setEventImages]=useState([])
  const history = useHistory();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

	const initialCount = {
		leftCount:0,
		rightCount:0,
		centerCount:0,
		left_leg_volume:0,
		center_leg_volume:0,
		right_leg_volume:0,
		total_volume:0,
		personally_referred_active_members:0
	}
const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const slider1 = useRef();
  const slider2 = useRef();
	const [loading, setLoading] = useState(false);
	const [referralLoading, setReferralLoading] = useState(false);
	const [chartLoading, setChartLoading] = useState(true);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const[tickets, setTickets] = useState<any | null>([]);
	const[currentRank, setCurrentRank] = useState<null | any>({});
	const[nextRank, setNextRank] = useState<null | any>({});
	const [count, setCount] = useState(initialCount);
	const[drawerank,setDrawer] = useState<null | any>('');
	const userData = useSelector((store: any) => store.auth.currentUser);
	const token =  useSelector((store: any) => store.auth.token);
	const classes = useStyles(); 
	const baseUrl = process.env.REACT_APP_API_END_POINT;
	const[announcements, setAnnouncements]=useState([]);
	const [networkCount, setNetworkCount] = useState([]);
	const dispatch = useDispatch();
	const accessToken = '';

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			'Cache-Control': 'no-store, no-cache, must-revalidate',
			'Pragma': 'no-cache',
			'Expires': '0'
		}
	};
	const paidStatusCheck =  () =>{
		let paidCheck = localStorage.getItem('paid_status');
		let encrypted = CryptoJS.AES.encrypt( JSON.stringify(userData.id), "Secret Passphrase");
		// @ts-ignore
		sessionStorage.setItem('browserKeys',encrypted);
		if(paidCheck == '0'){
			history.push('/client/checkout');
		}
	}

	useEffect(()=>{
		paidStatusCheck();
    },[]);
      
    function getNewsImages(){
		setLoading(true);
		axios.get(baseUrl +'/calendar_events/news/5')
		.then(function (res) {
			setNewsImages(res.data.success.data);
		})
		.catch(function (error) {
			console.log(error);
		})
		.then(function () {
			setLoading(false);
		})			
	}
	function getEventImages(){
		setLoading(true);
		axios.get(baseUrl +'/calendar_events/events/5')
		.then(function (res) {
			setEventImages(res.data.success.data);
			// console.log(res.data.success.data,'res.data.success.data')
		})
		.catch(function (error) {
			console.log(error);
		})
		.then(function () {
			setLoading(false);
		})
	}
	useEffect(()=>{
		getNewsImages()
		getEventImages()
	},[])
    //  for network tab if ibo disabled
	const checkIboStatus  = () =>{
        // if(userData.vip_status == 0  || userData.ibo_status == 0){
        if(userData.ibo_status == 0){
			dispatch(showAlert({
				message: "Your Ibo is inactive.",
				messageType: 'error',
				showAlertMessage: true
			}));
		}else{
		    history.push('/client/genelogy')
		}

	}
	const getDashboardData = async ()=> {
		setLoading(true);
		const getuserList = axios.get(baseUrl+'/active_users', config);
		const getDirectReferredMemebers = axios.get(baseUrl+'/get_direct_refferals/30', config);
		const getAnnouncements = axios.get(baseUrl+'/announcements/1', config);
		const getLatestSupportTickets = axios.get(baseUrl+'/support/5', config);
		Promise.all([getuserList, getDirectReferredMemebers, getAnnouncements, getLatestSupportTickets]).then((responses) => {
			// console.log('responses', responses);
			// seetting all results
			if(responses[0].status === 200){
				setCurrentRank(responses[0].data.user_rank_info[0]);
				setNextRank(responses[0].data.user_rank_info[1])
				setCount(prevState => ({
					...prevState,
					leftCount:responses[0].data.left_active_count,
					centerCount:responses[0].data.center_active_count,
					rightCount:responses[0].data.right_active_count, 
					left_leg_volume:responses[0].data.left_leg_volume,
					center_leg_volume:responses[0].data.center_leg_volume,
					right_leg_volume:responses[0].data.right_leg_volume,
					total_volume:responses[0].data.total_volume,
					personally_referred_active_members:responses[0].data.personally_referred_active_members
				}))
			}
			if(responses[1].status === 200){
				setNetworkCount(responses[1].data['directly_referred_members']['data']);
			}
			if(responses[2].status === 200){
				setAnnouncements(responses[2].data['Announcements']['data'])
			}
			if(responses[3].status === 200){
				setTickets(responses[3].data['tickets']['data']);
			}
		})

		.catch(err => {
			console.log('error getting dashboard data', err);
		})
		.then(()=>{
			setLoading(false);
		})
	}
	useEffect(() => {
		if((token !== '' && token !== undefined && token !== null)){ 
			getDashboardData().then(()=>setChartLoading(false));
		}

	 },[token]);

	const sendReferralInvitation = async (values:any) => {
		setLoading(true);
		await axios.post(baseUrl+'/referral_invitation', {
			email: values.email,
		})
		.then(function (response) {
			if(response.status === 200){
				dispatch(showAlert({
					message: "Email sent successfully",
					messageType: 'success',
					showAlertMessage: true
				}));
			}
		})
		.catch(function (error) {
			dispatch(showAlert({
				message: 'something went wrong',
				messageType: 'error',
				showAlertMessage: true
			}));
		})
		.then(()=>{
			setLoading(false);
		})
	}

	const showRankDetailDrawer = (rank:any)=>{
		setDrawer(rank);
		setIsDrawerOpen(true);
	}
  
  return (
    <>
	{/* <TransitionsModal/> */}
	<Box className="pageHeader">
		<Typography className="mainHeading" gutterBottom component="h1" variant="h4">Dashboard</Typography>
		<RouterBreadcrumbs />
	</Box>

	
	<MBox className="contentBox" component={MPaper}>
		{/*<SummitDialogue/>*/}
		{loading?
			<StatsCardSkeleton />
			:
			<MGrid container spacing={2}>
			<MGrid item md={4} lg={3} sm={6} xs={12}>
				<NavLink exact to="/client/wallet/summary">
					<MBox className={`${classes.statCard} blue`} p={2} display="flex" alignItems="center" justifyContent="space-between">
						<MBox className="icon">
							<PeopleAltIcon  fontSize="large" />
						</MBox>
						<MBox className="text">
							<MTypography variant="h5" component="p">Commission Earned</MTypography>
							<MTypography variant="h6" component="p">{userData.commission_balance ? parseInt(userData.commission_balance).toFixed(2):'0.00' }</MTypography>
						</MBox>
						<MBox className={`${classes.bgBubble} lgBubble`}></MBox>
						<MBox className={`${classes.bgBubble} smBubble`}></MBox>
					</MBox>
			</NavLink>
			</MGrid>
			<MGrid item md={4} lg={3} sm={6} xs={12} onClick={checkIboStatus}>
				{/*<NavLink exact to="/client/genelogy">*/}
					<MBox className={`${classes.statCard} orange`} p={2} display="flex" alignItems="center" justifyContent="space-between">
						<MBox className="icon">
							<PeopleAltIcon  fontSize="large" />
						</MBox>
						<MBox className="text">
							<MTypography variant="h5" component="p">Network</MTypography>
							<MTypography variant="h6" component="p">{networkCount.length ? networkCount.length : ''}</MTypography>
						</MBox>
						<MBox className={`${classes.bgBubble} lgBubble`}></MBox>
						<MBox className={`${classes.bgBubble} smBubble`}></MBox>
					</MBox>
				{/*</NavLink>*/}
			</MGrid>
			<MGrid item md={4} lg={3} sm={6} xs={12}>
				<NavLink exact to="/client/wallet/summary">  
					<MBox className={`${classes.statCard} sky`} p={2} display="flex" alignItems="center" justifyContent="space-between">
						<MBox className="icon">
							<PeopleAltIcon  fontSize="large" />
						</MBox>
						<MBox className="text">
							<MTypography variant="h5" component="p">E-Wallet</MTypography>
							<MTypography variant="h6" component="p">{userData.e_balance ? parseInt(userData.e_balance).toFixed(2) : "0.00" }</MTypography>
						
						</MBox>
						<MBox className={`${classes.bgBubble} lgBubble`}></MBox>
						<MBox className={`${classes.bgBubble} smBubble`}></MBox>
					</MBox>
				</NavLink>
			</MGrid>
			<MGrid item md={4} lg={3} sm={6} xs={12}>
			<NavLink exact to="/client/peace-wallet">  
				<MBox className={`${classes.statCard} red`} p={2} display="flex" alignItems="center" justifyContent="space-between">
					<MBox className="icon">
						<PeopleAltIcon  fontSize="large" />
					</MBox>
					<MBox className="text">
						<MTypography variant="h5" component="p">Peacecoin Wallet</MTypography>
						<MTypography variant="h6" component="p">{userData.pc_balance ?  parseInt(userData.pc_balance).toFixed(2) : '0.00' }</MTypography>
					</MBox>
					<MBox className={`${classes.bgBubble} lgBubble`}></MBox>
					<MBox className={`${classes.bgBubble} smBubble`}></MBox>
				</MBox>
			</NavLink>
			</MGrid>       
		</MGrid>
		}	
		<MBox my={3}>
			<MGrid container spacing={2}>
				<MGrid item md={6} xs={12}>
					<MCard className={classes.commonDashboardCard} variant="outlined">
						<MCardHeader
							title="Silver Rank"
								action={
									<MTooltip title="View Rank Info" arrow placement="top-end" >
										<div>
											<MIconButton
												aria-label="settings"
												onClick={()=>{showRankDetailDrawer('currentRank')}}
											>
												<InfoIcon />
											</MIconButton>
										</div>
									</MTooltip>
								}
						/>
						<MCardContent className={classes.incomeBox}>
							{loading ?
								<RankSectionSkeleton />
								:
								<>
									<MBox mb={4}>
										<MBox>Current Rank - &nbsp; <b>{currentRank.ranks ? currentRank.ranks : 'current Rank'}</b></MBox>
										{!userData.commissionable ? <Alert severity="info">You are not eligible for commission</Alert> : <Alert severity="success">You are eligible for commission</Alert> }
									</MBox>
									<MGrid container spacing={2} className={classes.justifyresponsive} alignItems="center">
							
									<MGrid item md={12} lg={6} >
									
										<MBox>
										<MBox display="flex" alignItems="center" justifyContent="space-between" mb={2}>
											<MBox display="flex" alignItems="center"><MBox style={{backgroundColor:"#5558a7",color:'white'}} className="customDotBadge lg" mr={1}></MBox><span>Personally Referred Active Members</span></MBox>
											<MBox><MChip style={{backgroundColor:"#5558a7",color:'white'}} size="small" label={count.personally_referred_active_members} /></MBox>
										</MBox>
											<MBox display="flex" alignItems="center" justifyContent="space-between" mb={2}>
												<MBox display="flex" alignItems="center"><MBox className="customDotBadge lg warning" mr={1}></MBox><span>Left Leg Active Users</span></MBox>
												<MBox><MChip className={`statusChip warning`} size="small" label={count.leftCount} /></MBox>
											</MBox>
											<MBox display="flex" alignItems="center" justifyContent="space-between" mb={2}>
											<MBox display="flex" alignItems="center"><MBox className="customDotBadge lg info" mr={1}></MBox>  <span>Center Leg Active Users</span></MBox>
												<MBox><MChip className={`statusChip info`} size="small" label={count.centerCount} /></MBox>
											</MBox>
											<MBox display="flex" alignItems="center" justifyContent="space-between" mb={2}>
												<MBox display="flex" alignItems="center"><MBox className="customDotBadge lg error" mr={1}></MBox>  <span>Right Leg Active Users</span></MBox>
												<MBox><MChip className={`statusChip error`} size="small" label={count.rightCount}  /></MBox>
											</MBox>
										</MBox>
									</MGrid>
									<MGrid item md={12} lg={5}>
										<MBox className={classes.pieChartBox}>
										<PieChart
											data={[
											{ title:'Personally Referred Active Members',value:count.personally_referred_active_members,color: '#5558a7' },
											{ title: 'Left Leg Active Users',value:count.leftCount,color: '#ef9318' },
											{ title: 'Center Leg Active Users', value: count.centerCount, color: '#00aeef' },
											{ title: 'Right Leg Active Users', value: count.rightCount, color: '#b70606' },
											]} />
											</MBox>
									</MGrid>
									
									</MGrid>
								</>
							}
						</MCardContent>
						{
							drawerank === 'currentRank' ?
							<RankDrawer 
							isDrawerOpen={isDrawerOpen} 
							setIsDrawerOpen={setIsDrawerOpen}  
							currentRank = {currentRank}
							leftCount = {count.leftCount}
							rightCount={count.rightCount}
							centerCount={count.centerCount}
							left_leg_volume = {count.left_leg_volume}
							center_leg_volume = {count.center_leg_volume}
							right_leg_volume = {count.right_leg_volume}
							total_volume = {count.total_volume}
							/>
							:
							<RankDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}  nextRank ={nextRank}/>
						}
						
					</MCard>
				</MGrid>

				<MGrid item md={6} xs={12}>
					<MCard className={classes.commonDashboardCard} variant="outlined">
						<MCardHeader
							title="Qualification"
								action={
									<MTooltip title="View Rank Info" arrow placement="top-center">
										<div>
											{/* <MIconButton aria-label="settings"  color="secondary" onClick={()=>{showRankDetailDrawer('nextRank')}}>
												<InfoIcon />												
											</MIconButton> */}
											<MBox mt={6}></MBox>
										</div>
									</MTooltip>
								}
						/>
						<MCardContent className={classes.incomeBox}>
							{loading ?
								<RankSectionSkeleton />
								:
								<>
									<MBox mb={4}>
										<MBox>Next Rank - &nbsp;<b>{nextRank.ranks ? nextRank.ranks : 'Next Rank'}</b></MBox>
										<Alert severity="info">Qualification for next rank</Alert>
									</MBox>
									<MGrid container spacing={2} className={classes.justifyresponsive} alignItems="center">
										<MGrid item md={12} lg={6}>
										
											<MBox mt={5}>
												<MBox display="flex" alignItems="center" justifyContent="space-between" mb={2}>
													<MBox display="flex" alignItems="center"><MBox className="customDotBadge lg warning" mr={1}></MBox>  <span>Required Left Leg Active Users</span></MBox>
													<MBox><MChip className={`statusChip warning`} size="small" label={nextRank.left_qualification ? parseInt(nextRank.left_qualification) : '0.00' } /></MBox>
												</MBox>
												<MBox display="flex" alignItems="center" justifyContent="space-between" mb={2}>
												<MBox display="flex" alignItems="center"><MBox className="customDotBadge lg info" mr={1}></MBox>  <span> Required Center Leg Active Users</span></MBox>
													<MBox><MChip className={`statusChip info`} size="small" label={nextRank.left_qualification ? parseInt(nextRank.center_qualification) : '0' }  /></MBox>
												</MBox>
												<MBox display="flex" alignItems="center" justifyContent="space-between" mb={2}>
													<MBox display="flex" alignItems="center"><MBox className="customDotBadge lg error" mr={1}></MBox>  <span> Required Right Leg Active Users</span></MBox>
													<MBox><MChip className={`statusChip error`} size="small" label={nextRank.left_qualification ? parseInt(nextRank.right_qualification) : '0.00' }  /></MBox>
												</MBox>
											</MBox>
										</MGrid>
										<MGrid item md={12} lg={5}>
											<MBox className={classes.pieChartBox} mt={5}>
												<PieChart
												data={[
													{ title: 'Required Left Leg Active Users',value:parseInt(nextRank.left_qualification),color: '#ef9318' },
													{ title: 'Required Center Leg Active Users', value:parseInt(nextRank.center_qualification), color: '#00aeef' },
													{ title: 'Required Right Leg Active Users', value:parseInt(nextRank.right_qualification), color: '#b70606' },
												]} />
											</MBox>
										</MGrid>
									</MGrid>
								</>
							}
						</MCardContent>
					</MCard>
				</MGrid>
			</MGrid>
		</MBox>
		<MBox my={3}>
			<MGrid container justify="center" spacing={2}>
				<MGrid item lg={4} md={6} sm={12} xs={12}>
					<MCard className={`${classes.commonDashboardCard} customBorderdCard supportCard`} variant="outlined">
						<MCardHeader
							title="Support Tickets"
							action=										
							{		<MBox mx="auto" mt={1} display="flex" justifyContent="space-between" alignItems="center">
										<MButton component={NavLink} exact to="/client/support/tickets" color="primary">
											View All
										</MButton>
									</MBox>							
							}
						/>
						<MCardContent className={classes.setHeight}>
							
								<MTableContainer component={'div'} >
									<MTable aria-label="simple table">
										<MTableHead>
											<MTableRow>
												<MTableCell>Id</MTableCell>
												<MTableCell>Subject</MTableCell>
												<MTableCell align="right">Status</MTableCell>
											</MTableRow>
										</MTableHead>
										<MTableBody>
										{loading?  <MTableRow><MTableCell colSpan={6}><SupportTicketSkeleton/></MTableCell></MTableRow> :

											tickets && tickets.map((item) => (
												<MTableRow className="tablerow" key={item.id}>
													<MTableCell>#{item.id}</MTableCell>
													<MTableCell component="th" scope="item">{item.subject}</MTableCell>
													<MTableCell align="right">
														{item.status === 1 &&
															<MChip className={`statusChip success`} size="small" label='Open'/>
														}
														{(item.status === 2 || item.status === 3) &&
															<MChip className={`statusChip warning`} size="small" label='in progress' />
														}
														{item.status === 9 &&
															<MChip className={`statusChip error`} size="small" label='Closed' />
														}
													</MTableCell>
												</MTableRow>
											))
										}
										</MTableBody>
									</MTable>
								</MTableContainer>
							
						</MCardContent>						
					</MCard>
				</MGrid>
				<MGrid item lg={4} md={6} sm={12} xs={12}>
					<MCard className={classes.commonDashboardCard} variant="outlined">
						<MCardHeader
							title="Invite Referral"
						/>
						<MCardContent className={classes.setHeight}>
							<Typography variant="body2" color="textSecondary" component="p">You can invite your friends to the Peacecoin by email.</Typography>
							<ul className={classes.inviteReferalList}>
								<li>Expand your network by inviting more people.</li>
								<li>The more you refer</li>
								<li>The more you get rewarded!</li>
							</ul>
							<MFormik
								enableReinitialize="true"
								initialValues={{
									email: '',
								}}
								validationSchema={
									Yup.object().shape({
										email: Yup.string()
										.email("Email Format is in Valid")
										.matches(
											/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
											, "Email Format is inValid")
										.required("Email Field is required")
									})
								}
								onSubmit={(values: any, {resetForm}) => {
									sendReferralInvitation(values).then(()=>{
										resetForm();
									})
								}}
							>
								{() => (
									<MForm>
										<MBox mt={2} mb={4} display="flex" justifyContent="space-between">
											<MGrid container spacing={2}>
												<MGrid item sm={9} xs={12}>
													<MBox className="formFieldWrapper" mb={1}>
														<MTextField
															name="email"
															label="Email"
															variant="outlined"
															color="primary"
															size="small"
															placeholder="Referral Email"
															type="email"
															fullWidth
														/>
													</MBox>
												</MGrid>
												<MGrid item sm={3} xs={12}>
													<MButton fullWidth color="primary" loading={referralLoading} variant="contained" type="submit" disabled={referralLoading} >Submit</MButton>
												</MGrid>
											</MGrid>
										{/* <MBox mt={2} mb={4} display="flex" justifyContent="flex-end"></MBox> */}
										</MBox>
									</MForm>
								)}
							</MFormik>
							<MTypography gutterBottom variant="subtitle2">The more you refer the more you get more rewards! Expand your network by inviting more people </MTypography>
							<MAlert severity="warning">Emails already registered at Peacecoin will not get invitation.</MAlert>
						</MCardContent>
					</MCard>
				</MGrid>
				<MGrid item lg={4} md={6} sm={12} xs={12}>
					<MCard className={classes.commonDashboardCard} variant="outlined">
						<MCardHeader
							title="Announcement"
									action=										
							{		<MBox mx="auto" mt={1} display="flex" alignItems="center" justifyContent="space-between">
										<MButton component={NavLink} exact to="/client/announcements" color="primary">
											View All
										</MButton>
									</MBox>	
							}
						/>
						<MCardContent className={classes.setHeight}>
							<MBox display="flex" justifyContent="center" mb={4}>
								<img src="/img/client-dashboard/announcement.png" alt="announcement" />
							</MBox>
							{
								announcements.length!==0 && announcements.slice(0,1).map((item:any)=>(	
									<MBox mb={2} mt={3} key={item.id}>
										{
											loading==true?
												<MSkeleton animation="wave" variant="rect" width={'100%'} height={100} />
											:
												<MAlert icon={false} className={classes.lineBreak} severity="info" >
													<MBox dangerouslySetInnerHTML={{ __html: `${item.description.substring(0, 500)}...` }}></MBox>
												</MAlert>
										}
									</MBox>
								))
							}
						</MCardContent>					
					</MCard>
				</MGrid>
			</MGrid>
		</MBox>

       {/*<MBox mb={3}>*/}
		{/*   <MGrid container justify="center" spacing={2}>*/}
		{/*	  <MGrid item lg={12} className={classes.dashboardBanner}>        */}
		{/*		<NavLink exact to="/client/promotion/package/summit"><img className="img-fluid" src="/img/client-dashboard/dashboard-slider1.jpg"></img>	</NavLink>	*/}
		{/*	  </MGrid>*/}
       {/*    </MGrid>*/}
	   {/*</MBox>*/}

		{
			(newImages.length > 0 && EventImages.length > 0 ) &&
			<MBox mb={3}>
			<MGrid container spacing={2}>
				{
					newImages.length > 0 &&
					<MGrid item lg={6}>
					<MCard className={classes.newsandEventsContainer}>
						<MCardHeader title='News' action=
							{<MBox mx="auto" mt={1} display="flex" justifyContent="space-between" alignItems="center">
								<MButton component={NavLink} exact to={`/client/news/all`} color="primary">
									View All
								</MButton>
							</MBox>
							}/>
						<MCardContent>
							{loading ?
								<MBox margin="0 auto" className="spinner-border text-warning mx-auto d-block"
									  role="status">
									<span className="sr-only">Loading...</span>
								</MBox>
								:
								<News data={newImages}/>
							}
						</MCardContent>

					</MCard>
				</MGrid>
				}

				{
					EventImages.length > 0 &&
					<MGrid item lg={6}>
					<MCard className={classes.newsandEventsContainer}>
						<MCardHeader title="Events" action=
							{<MBox mx="auto" mt={1} display="flex" justifyContent="space-between" alignItems="center">
								<MButton component={NavLink} exact to={`/client/events/all`} color="primary">
									View All
								</MButton>
							</MBox>
							}/>
						<MCardContent>
							{loading ?
								<MBox margin="0 auto" className="spinner-border text-warning mx-auto d-block"
									  role="status">
									<span className="sr-only">Loading...</span>
								</MBox>
								:
								<News data={EventImages}/>
							}
						</MCardContent>

					</MCard>
				</MGrid>}

			</MGrid>
		</MBox>}

		<MGrid container spacing={2}>
			<MGrid item md={6} xs={12}>
				<MCard className={classes.commonDashboardCard} variant="outlined">
					<MCardHeader
						title="BTC/USD"
					/>
					<MCardContent>
						{!chartLoading && 
							<BtcUsd />
						}
					</MCardContent>
				</MCard>
			</MGrid>

			<MGrid item md={6} xs={12}>
				<MCard className={classes.commonDashboardCard} variant="outlined">
					<MCardHeader
						title="Peacecoin World Map"
					/>
					<MCardContent className={classes.svgChartSetting}>
						<GeoChart  />
					</MCardContent>
				</MCard>
			</MGrid>

			{/* <MGrid item md={6} xs={12}>
				<MCard className={classes.commonDashboardCard} variant="outlined">						
					<AppBar position="static" color="default">
						<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="secondary"
						className={classes.textColor}
						variant="fullWidth"
						aria-label="full width tabs example"
						>
						<Tab label="World Peace Members" {...a11yProps(0)} />
						<Tab label="My Referred Members" {...a11yProps(1)} />
						</Tabs>
					</AppBar>    										
						
					<MCardContent >
						<TabPanel value={value} index={0}>
							<GeoChart  />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<GeoChart  />
						</TabPanel>
					</MCardContent>
				</MCard>

			</MGrid> */}

		</MGrid>
		 
	</MBox>
	</>
   )
}