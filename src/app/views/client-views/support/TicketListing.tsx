import { useEffect, useState } from 'react';
import { MBox, MButtonBase, MAvatar, MTypography,MChip, MPaper, MCircularProgress, MPagination } from 'src/app/components/mui';
import ScheduleIcon from '@material-ui/icons/Schedule';
import useStyles from './ListingStyles';
import Typography from '@material-ui/core/Typography';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import { NoData } from 'src/app/components';
import axios from 'axios';

import {useHistory} from 'react-router-dom';
function TicketListing(props:any) {
	const baseurl = process.env.REACT_APP_API_END_POINT;
	const classes = useStyles();
	const[tickets, setTickets] = useState<any | null>([]);
	const [loading, setLoading] = useState(false);
	const[recordsPerPage, setRecordsPerPage] = useState(30);
	const[currentPage, setCurrentPage] = useState(1);
	const[totalPages, setTotalPages] = useState(0);

	let  currentDate = new Date();
    let history = useHistory();
    
	const getSupportTickets = ()=>{
		setLoading(true);
		axios.get(baseurl+`/support/${recordsPerPage}?page=${currentPage}`)
		.then(function (response) {
			if(response.status === 200){
				setTickets(response.data.tickets.data);
				setTotalPages(response.data.tickets.last_page);
			}
		})
		.catch(function (err) {
			console.log(err);
		})
		.then(() =>  setLoading(false));
	}

   useEffect(()=>{
		getSupportTickets();
   },[currentPage]);

   const liveChat = (ticket:any) => {
		history.push('/client/support/live-chat/'+ticket )
   }
  return (
	<div>
		   <MBox className="pageHeader">
                <Typography className="mainHeading" gutterBottom component="h1" variant="h4">All Tickets</Typography>
                <RouterBreadcrumbs />
            </MBox>
			
			<MBox className="contentBox" component={MPaper}>
			{loading ?
				<MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
					<MCircularProgress />
				</MBox>
				:
				<MBox>
					{tickets.length ? tickets.map(({id,subject,status,created_at,ticket})=>(
						<MBox mb={1} borderRadius={'4px'} onClick={()=>liveChat(ticket)} key={id}>
							<MButtonBase key={id} className={classes.listWrapper}>
								<MBox p={2} display="flex" alignItems="center" justifyContent="space-between">
									<MBox pr={2}>
										<MAvatar variant="circle" className={`${classes.avatar}`}>{subject.charAt(0) + '' + subject.charAt(1)}</MAvatar>
									</MBox>
									<MBox pr={2} flexGrow={1} textAlign="left" minWidth="120px">
										<MTypography noWrap>{subject}</MTypography>
									</MBox>
									<MBox mr={3}>
										{
											status == 1 || status == 2 || status == 3 ?
										<MChip className={`statusChip success`} size="small" label="open" />
												:
										<MChip className={`statusChip error`} size="small" label="Closed" />

										}
									</MBox>
									<MBox textAlign="center">
										<MBox className={classes.label} pb={"2px"}>
											<ScheduleIcon className="fa fa-plus-circle" fontSize="inherit" /> Created Date
										</MBox>
										<MBox>{created_at ?  created_at.substring(0, 10): currentDate.toDateString()}</MBox>
									</MBox>
								</MBox>
							</MButtonBase>
						</MBox>
					)):
					<MBox mb={1} borderRadius={'4px'} mx={'auto'}>
						<NoData />
					</MBox>
					}
					
					{
						totalPages > 1 &&
						<MBox mt={4} display="flex" justifyContent="flex-end">
							<MPagination count={totalPages} page={currentPage} color="primary" setCurrentPage={setCurrentPage} />
						</MBox> 
					}
				</MBox>
				}
		</MBox>
	</div>		
    );
}

export default TicketListing;
