import React, {useEffect, useState} from 'react';
import {
  MMenu,
  MListItem,
  MTypography,
  MAvatar,
  MListSubheader,
  MListItemAvatar,
  MListItemText,
  MIconButton,
  MBox,
  MSkeleton
} from 'src/app/components/mui';
import useStyles from './NotificationDropdownStyles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import { useHistory } from 'react-router-dom';
import { NoData } from 'src/app/components';
import axios from "axios";
import { useDispatch,useSelector} from 'react-redux';
import {setNotificationsData} from 'src/app/store';

export function NotificationDropdown(props:any){
    const dispatch = useDispatch();
    const classes = useStyles({});
    let history = useHistory();
    //  use  Effect for getting current login user notification
    let unreadNotifications:any = ''
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const[notifications,setNotification]=useState([]);
    const storeNotifications = useSelector((store: any) => store.notification.notificationData);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const viewAllAlerts = () => {
      handleClose();
      history.push('/client/notifications');
    }

    useEffect(() => {
        const intervalID = setTimeout(() =>  {
            get_notifications();
        }, 1000);
        return () => clearInterval(intervalID);
    }, []);

    const baseurl = process.env.REACT_APP_API_END_POINT;
    const get_notifications = async  () => {
        await axios.get(baseurl+'/notifications/30')
            .then(function (res) {
                if(res.status === 200){
                    setNotification(res.data.notification.data);
                   dispatch(setNotificationsData(res.data.notification.data));
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(()=>setLoading(false))
    }


    unreadNotifications = storeNotifications.filter( (item:any) => item.status === 0 );
    return(
        <>

            <MIconButton onClick={handleClick} aria-label="notifications dropdown" color="inherit">
                <Badge badgeContent={ unreadNotifications.length ?  unreadNotifications.length : 0 } color="secondary">
                    <NotificationsIcon />
                </Badge>
                {/* } */}
              </MIconButton>
              <MMenu
                  className={classes.avatarDropdown}
                  anchorEl={anchorEl}
                  getContentAnchorEl={null}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
              >
                <MListSubheader  className={classes.subheader}>
                  <MTypography variant="subtitle1">Notifications</MTypography>
                </MListSubheader>

                {
                    notifications.length ?
                        notifications.slice(0,5).map((values:any) => (
                    <MListItem className={classes.listItem} key={values.id}>
                        <MListItemAvatar className={classes.avatar}>
                            <MAvatar variant="circle" alt="Profile Picture">{values.subject.charAt(0) + '' + values.subject.charAt(1)}</MAvatar>
                        </MListItemAvatar>
                        <MListItemText className={`${classes.listText}`} primary={values.subject} secondary={Date}  />
                    </MListItem>
                ))
                :
                <MBox mb={1} borderRadius={'4px'} mx={'auto'}>
                  <NoData />
                </MBox>
                }
                <MListItem className={classes.footer} button onClick={viewAllAlerts}>View All</MListItem>
          </MMenu>
        </>
    )
}