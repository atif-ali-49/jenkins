import ScheduleIcon from '@material-ui/icons/Schedule';
import {useState,useEffect} from 'react';
import { MAvatar, MBox, MButtonBase, MTypography } from 'src/app/components/mui';
import NotificationsDetailDrawer from '../notification-detail-drawer/NotificationsDetailDrawer';
import useStyles from './NotificationsListStyles';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { NoData } from 'src/app/components';
import axios from "axios";
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch,useSelector} from 'react-redux';
import {setNotificationsData} from 'src/app/store';
function NotificationsList(props:any) {
	const dispatch = useDispatch();
	let  today  = new Date();
	const classes = useStyles();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [currentDataId, setCurrentDataId] = useState(1);
	const[notificationList,setNotificationList] = useState(props.notifications);
	const baseurl = process.env.REACT_APP_API_END_POINT;


    const readNotification = (data:any) =>{
    	if(data.status == 0){
			const exist = notificationList.find((x) => x.id == data.id);
			axios.post(baseurl +'/notification_update/'+data.id, {
			})
				.then(function (response) {
					setNotificationList(
						notificationList.map((x) =>
							x.id == data.id ? { ...exist, status: exist.status + 1  } : x
						)
					);
					// setNotificationList(notificationList.filter((x) => x.id !== response.data.notification.id));
					dispatch(setNotificationsData(notificationList.filter((x) => x.id !== response.data.notification.id)));
				})
				.catch(function (error) {
					console.log(error);
				});


		}

		
	}

  return (
    <MBox>
      {
		          props.notifications.length > 0 ?
				  notificationList && notificationList.map((data:any)=>(
		<MBox mb={1} borderRadius={'4px'} key={data.id}>
			<MButtonBase className={classes.listWrapper} onClick={()=>{
				setCurrentDataId(data.id);
				setIsDrawerOpen(true);
				readNotification(data);
				}}>
				<MBox p={2} display="flex" alignItems="center" justifyContent="space-between">
					<MBox pr={2}>
						<MAvatar variant="circle" className={`${classes.avatar}`}>{data.subject.charAt(0) + '' + data.subject.charAt(1)}</MAvatar>
					</MBox>
					<MBox pr={2} flexGrow={1} textAlign="left" minWidth="250px">
						<MTypography noWrap>{data.subject.substr(0, 30) + '...'}</MTypography>
					</MBox>

					{
						data.status == 0 &&
						<MBox pr={2} flexGrow={1} textAlign="left" minWidth="250px">
							<MTypography noWrap><Chip
								className={ classes.Resdeactive }
								label={'new'}
							/></MTypography>
						</MBox>
					}
					<MBox textAlign="center" minWidth="250px">
						<MBox className={classes.label} pb={"2px"}>
							<ScheduleIcon className="fa fa-plus-circle" fontSize="inherit" /> Created Date
						</MBox>
						<MBox >
							{data.created_at ? data.created_at.substring(0, 10):today.toDateString()}
						</MBox>
					</MBox>
				</MBox>
			</MButtonBase>
		</MBox>
	  ))
	  :
		<MBox mb={1} borderRadius={'4px'} mx={'auto'}>
			<NoData />
		</MBox>
      }
		
		 <NotificationsDetailDrawer  isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}  notificationId={currentDataId} />

    </MBox>
    );
}

export default NotificationsList;
