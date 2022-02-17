import { useState } from 'react';
import { 
        MBox,
        MDrawer,
        MAppBar,
        MIconButton,
        MToolbar,
    } from 'src/app/components/mui';

import useStyles from './UniverstiyNotificationsDetailDrawerStyles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useDispatch,useSelector} from 'react-redux';

function UniversityNotificationDrawer(props:any) {
    const classes = useStyles();
    const storeNotifications = useSelector((store: any) => store.uni_notification.university_notificationData);
    let single_notification:any = '';
    single_notification = storeNotifications.find( (item:any) => item.id == props.data );


    // @ts-ignore
    return (



    <>

        {
            single_notification != undefined &&
            <MDrawer className={classes.announcementDrawer} open={props.isDrawerOpen} onClose={()=>props.setIsDrawerOpen(false)}
                     variant="temporary"
                     anchor={'right'}
            >
                <MAppBar color="secondary" className="drawerAppBar">
                    <MToolbar>
                        <MBox display="flex" alignItems="center"
                              flexWrap="wrap">
                            <MBox display="inline-block" mr={1}>
                                <MIconButton color="primary" onClick={() => props.setIsDrawerOpen(false)}>
                                    <ArrowBackIcon/>
                                </MIconButton>
                            </MBox>
                            <MBox minHeight={30} fontSize={18}>{single_notification.title ? single_notification.title : '' }</MBox>
                        </MBox>
                    </MToolbar>
                </MAppBar>
                <MBox p={4}>
                    <MBox>
                        {single_notification.desc ? single_notification.desc : ''}
                    </MBox>
                </MBox>
            </MDrawer>
        }

    </>

    );
}

export default UniversityNotificationDrawer;