import {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import UniNotificationsList from './university-notifications-list/UniversityNotificationsList'
import { MBox, MPagination, MPaper,MButton,MCircularProgress } from 'src/app/components/mui';
import useStyles from './UniversityNotificationsStyle';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useDispatch,useSelector} from 'react-redux';
import {setUniNotificationsData} from 'src/app/store';
function UniversityNotifications(props:any) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const[notifications,setNotification]=useState<null | any>([]);
    const[recordsPerPage, setRecordsPerPage] = useState(30);
    const[currentPage, setCurrentPage] = useState(1);
    const[totalPages, setTotalPages] = useState(0);
    const [checked, setChecked] = useState(0);
    const [loading, setLoading] = useState(false);
    const handleChange = (all_checked = 0) => {
        setChecked(all_checked);
    };
    useEffect(() => {
        get_notifications();
    }, [currentPage,checked]);
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const get_notifications = async  () => {
        setLoading(true)
        await axios.get(baseurl+`/all_university_notification/${recordsPerPage}?page=${currentPage}`,

            {
                params:{
                    all_checked:checked ? 1 : 0,
                }

            }

            )
            .then(function (response) {

                if(response.status === 200)
                     setTotalPages(response.data.all_not.last_page)
                     setNotification(response.data.all_not.data)
                     dispatch(setUniNotificationsData(response.data.all_not.data));
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                setLoading(false)
            });
    }
    return (
        <>
            <MBox className="pageHeader">
                <Typography className="mainHeading" gutterBottom component="h1" variant="h4"> University Notifications</Typography>
                <RouterBreadcrumbs />
            </MBox>
            <MBox className="contentBox" component={MPaper}>
                <MBox pb={3}>
                    <MButton variant="contained" color="primary" onClick={()=>handleChange(1)} >
                        All Read
                    </MButton>
                </MBox>

                {
                    loading ?
                    <MBox
                        display="flex"
                        alignItems="center"
                        textAlign="center"
                        height="auto"
                        justifyContent="center"
                        className={classes.circular}>
                        <MCircularProgress />
                    </MBox>:
                    <>
                    <UniNotificationsList notifications={notifications} />
                {notifications.length !==0 &&
                    <MBox mt={4} display="flex" justifyContent="flex-end">
                {/* <MPagination count={10} color="primary" /> */}
                    <MPagination count={totalPages} page={currentPage} color="primary" setCurrentPage={setCurrentPage} />
                    </MBox>
                }
                    </>
                }
            </MBox>
        </>
    );
}

export default UniversityNotifications;