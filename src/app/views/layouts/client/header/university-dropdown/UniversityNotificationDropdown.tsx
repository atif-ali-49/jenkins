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
  MBox
} from "src/app/components/mui";
import useStyles from './UniversityNotificationStyle';
import SchoolIcon from '@material-ui/icons/School';
import Badge from '@material-ui/core/Badge';
import { useHistory } from 'react-router-dom';
import { NoData } from 'src/app/components';
import { nvigationHelpers } from 'src/app/helpers';
import axios from "axios";
import { useDispatch,useSelector} from 'react-redux';
import {setUniNotificationsData} from 'src/app/store';

export function UniversityNotificationDropdown(props:any){
    const dispatch = useDispatch();
    const classes = useStyles({});
    let history = useHistory();
    //  use  Effect for getting current login user notification
    let unreadNotifications:any = ''
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const[notifications,setNotification]=useState([]);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const viewAllAlerts = () => {
      handleClose(); 
      history.push('/client/university-notifications');
    }

    useEffect(() => {
        const intervalID = setTimeout(() =>  {
            get_notifications();
        }, 1000);

        return () => clearInterval(intervalID);
    }, []);

    const baseurl = process.env.REACT_APP_API_END_POINT;
    const get_notifications = async  () => {
        await axios.get(baseurl+'/all_university_notification/30')
            .then(function (response) {
                if(response.status === 200)
                    setNotification(response.data.all_not.data);
                    dispatch(setUniNotificationsData(response.data.all_not.data));
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    const storeNotifications = useSelector((store: any) => store.uni_notification.university_notificationData);
    unreadNotifications = storeNotifications.filter( (item:any) => item.status === 0 );
    return(
        <>
             <MIconButton onClick={handleClick} aria-label="notifications dropdown" color="inherit">
                <Badge badgeContent={ unreadNotifications.length ?  unreadNotifications.length : 0 } color="secondary">
                    <SchoolIcon />
                </Badge>
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
                  <MTypography variant="subtitle1">Academy Notifications</MTypography>
                </MListSubheader>

                {
                    notifications.length ?
                        notifications.slice(0,5).map((noti:any) => (
                    // <MListItem button className={classes.listItem} key={id}>
                    <MListItem className={classes.listItem} key={noti.id}>
                        <MListItemAvatar className={classes.avatar}>
                            <MAvatar variant="circle" alt="Profile Picture">{noti.desc.charAt(0) + '' + noti.desc.charAt(1)}</MAvatar>
                        </MListItemAvatar>
                        <MListItemText className={`${classes.listText}`} primary={noti.desc} secondary={Date}  />
                    </MListItem>
                ))
                :
                <MBox mb={1} borderRadius={'4px'} mx={'auto'}>
                    <MTypography variant="subtitle" component="div" className={classes.notext} > No Notification Found !</MTypography>
                </MBox>
                }
                <MListItem className={classes.footer} button onClick={viewAllAlerts}>View All</MListItem>
          </MMenu>
        </>
    )
}