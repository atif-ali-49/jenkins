import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import NotificationsList from './notifications-list/NotificationsList'
import { MBox, MPagination, MPaper, MCircularProgress,MButton } from 'src/app/components/mui';
import useStyles from './NotificationsStyle';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {setNotificationsData} from 'src/app/store';
import { useDispatch} from 'react-redux';
function Notifications(props: any) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const token = useSelector((store: any) => store.auth.token);
    const [checked, setChecked] = useState(0);
    const[recordsPerPage, setRecordsPerPage] = useState(30);
    const[currentPage, setCurrentPage] = useState(1);
    const[totalPages, setTotalPages] = useState(0);


    const get_notifications = async () => {
        setLoading(true);
        await axios.get(baseurl+`/notifications/${recordsPerPage}`,
            {
                params:{
                    all_checked:checked ? 1 : 0,
                }

            }
            )
            .then(function (response) {
                if (response.status === 200)
                setNotifications(response.data['notification']['data']);
                setTotalPages(response.data['notification']['last_page']);
                dispatch(setNotificationsData(response.data['notification']['data']));
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(() => {
                setLoading(false);
            })
    }
    const handleChange = (all_checked = 0) => {
        setChecked(all_checked);
    };
    useEffect(() => {
        get_notifications();
    }, [currentPage,checked]);
    
    return (
        <>
            <MBox className="pageHeader">
                <Typography className="mainHeading" gutterBottom component="h1" variant="h4">Notifications</Typography>
                <RouterBreadcrumbs />
            </MBox>
            <MBox className="contentBox" component={MPaper}>
                <MBox pb={3}>
                    <MButton variant="contained" color="primary" onClick={()=>handleChange(1)} >
                        All Read
                    </MButton>
                </MBox>

                {loading ? <MBox
                    display="flex"
                    alignItems="center"
                    textAlign="center"
                    height="auto"
                    justifyContent="center"
                    className={classes.circular}>
                    <MCircularProgress />
                </MBox> :
                    <>
                    <NotificationsList notifications={notifications} />
                    {
                        notifications.length !== 0 &&
                        <MBox mt={4} display="flex" justifyContent="flex-end">
                            <MPagination count={totalPages} page={currentPage} color="primary" setCurrentPage={setCurrentPage} />
                        </MBox>
                    }
                </>
                }
            </MBox>
        </>
    );
}

export default Notifications;