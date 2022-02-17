import { useState,useEffect } from 'react';
import { 
        MBox,
        MDrawer,
        MAppBar,
        MIconButton,
        MToolbar,
    } from 'src/app/components/mui';

import useStyles from './NotificationsDetailDrawerStyles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from "axios";
const baseurl = process.env.REACT_APP_API_END_POINT;



function NotificationDrawer(props:any) {
    const classes = useStyles();
    const [notificationdetail,setNotificationDetail] = useState<null | any>({});
    const detailNotification = () =>{

        axios.get(baseurl +'/single_notification/'+props.notificationId, {
        })
            .then(function (response) {
                if(response.status === 200){
                    setNotificationDetail(response.data.notification)
                }

                // console.log(response.data.notification);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    useEffect(()=>{
        detailNotification();
    },[props.notificationId])

    return (
        <>
           <MDrawer className={classes.announcementDrawer} open={props.isDrawerOpen} onClose={()=>props.setIsDrawerOpen(false)}
                     variant="temporary"
                     anchor={'right'}
            >
                <MAppBar color="secondary" className="drawerAppBar">
                    <MToolbar>
                        <MBox display="flex" alignItems="center"
                              flexWrap="wrap">
                            <MBox display="inline-block" mr={1}>
                                <MIconButton className={classes.arrowbackward} onClick={() => props.setIsDrawerOpen(false)}>
                                    <ArrowBackIcon/>
                                </MIconButton>
                            </MBox>
                             <MBox minHeight={30} fontSize={18}>{notificationdetail !== null ?notificationdetail.subject : '' }</MBox>
                        </MBox>
                    </MToolbar>
                </MAppBar>
                <MBox p={4}>
                    <MBox>
                         {notificationdetail !== null ? notificationdetail.message : ''}
                    </MBox>
                </MBox>
            </MDrawer>
        </>
    );
}

export default NotificationDrawer;