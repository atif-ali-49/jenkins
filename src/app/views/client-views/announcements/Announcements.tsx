import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import AnnouncementList from './announcement-list/AnnouncementList'
import { MBox, MPagination, MPaper } from 'src/app/components/mui';
import useStyles from './AnnouncementsStyle';
import axios from 'axios';

function Announcements(props:any) {
    const classes = useStyles();
    const[announcements, setAnnouncements]=useState([]);
    const[loading, setLoading] = useState(false);
    const[recordsPerPage, setRecordsPerPage] = useState(30);
    const[currentPage, setCurrentPage] = useState(1);
    const[totalPages, setTotalPages] = useState(0);
    
    const baseUrl = process.env.REACT_APP_API_END_POINT;
    const getAnnouncements =  async () => {
        setLoading(true);
        await axios.get(baseUrl+`/announcements/${recordsPerPage}?page=${currentPage}`)
        .then(function (res){
            if(res.status === 200){
                setAnnouncements(res['data']['Announcements']['data']);
                setTotalPages(res.data['Announcements'].last_page);
            }
        })
        .catch(function (err) {
            console.log(err)
        })
        .then(function () {
            setLoading(false);
        })
    }

    useEffect(() => {
        getAnnouncements();
    },[currentPage]);

    return (
        <>
            <MBox className="pageHeader">
                <Typography className="mainHeading" gutterBottom component="h1" variant="h4">Announcements</Typography>
                <RouterBreadcrumbs />
            </MBox>
            <MBox className="contentBox" component={MPaper}>
                <AnnouncementList data={announcements} loading={loading} />
                {loading!==true && announcements.length!==0 &&  
                    <MBox mt={4} display="flex" justifyContent="flex-end">
                        <MPagination count={totalPages} page={currentPage} color="primary" setCurrentPage={setCurrentPage} />
                    </MBox>
                }
            </MBox>
        </>
    );
}

export default Announcements;