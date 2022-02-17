import ScheduleIcon from '@material-ui/icons/Schedule';
import {useState,useEffect} from 'react';
import { MAvatar, MBox, MButtonBase, MTypography } from 'src/app/components/mui';
import UniversityNotificationsDetailDrawer from '../universitynotification-detail-drawer/UniversityNotificationsDetailDrawer';
import useStyles from './UniversityNotificationsListStyles';
import { NoData } from 'src/app/components';
import axios from "axios";
import { useDispatch,useSelector} from 'react-redux';
import {setUniNotificationsData} from 'src/app/store';
import Chip from '@material-ui/core/Chip';
function UniversityNotificationsList(props:any) {
	let  today  = new Date();
	const dispatch = useDispatch();
	const classes = useStyles();
	const [isDrawerOpen, setIsDrawerOpen] = useState<any>(false);
	const [currentDataId, setCurrentDataId] = useState<any>(1);
	const[notificationList,setNotificationList] = useState<any>(props.notifications);
	const baseurl = process.env.REACT_APP_API_END_POINT;
	const readNotification = (data:any) =>{
		if(data.status == 0){
			const exist = notificationList.find((x) => x.id == data.id);
			axios.post(baseurl +'/update-university-notification/'+data.id, {
			})
				.then(function (response) {
					setNotificationList(
						notificationList.map((x) =>
							x.id == data.id ? { ...exist, status: exist.status + 1  } : x
						)
					);
					dispatch(setUniNotificationsData(notificationList.filter((x) => x.id !== response.data.notification.id)));
				})
				.catch(function (error) {
					console.log(error);
				});


		}}
	useEffect(() => {
		setNotificationList(props.notifications);
	}, [props.notifications])
  // @ts-ignore
	return (
    <MBox>
        {props.notifications.length > 0 ?
			notificationList.map((data:any,index)=>(
		    <MBox mb={1} borderRadius={'4px'} key={data.id}>
				<MButtonBase className={classes.listWrapper} onClick={()=>{
					setCurrentDataId(data.id);
					setIsDrawerOpen(true);
					readNotification(data);
					}}>
					<MBox p={2} display="flex" alignItems="center" justifyContent="space-between">
						<MBox pr={2}>
							<MAvatar variant="circle" className={`${classes.avatar}`}>{data.title.charAt(0) + '' + data.title.charAt(1)}</MAvatar>
						</MBox>
						<MBox pr={2} flexGrow={1} textAlign="left" minWidth="250px">
							<MTypography noWrap>{data.title.substring(0, 30) + '...'}</MTypography>
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
						<MBox textAlign="center">
							<MBox className={classes.label} pb={"2px"}>
								<ScheduleIcon className="fa fa-plus-circle" fontSize="inherit" /> Created Date
							</MBox>
							<MBox>
								{data.created_at ? data.created_at.substring(0, 10) : today.toDateString()}
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
		
		 <UniversityNotificationsDetailDrawer  isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}  data={currentDataId} />

    </MBox>
    );
}

export default UniversityNotificationsList;
