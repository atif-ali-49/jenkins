import {
    MBox,
    MDrawer,
    MAppBar,
    MIconButton,
    MToolbar,
    MCircularProgress
} from 'src/app/components/mui';
import useStyles from './AnnouncementDetailDrawerStyles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useEffect, useState } from 'react';
import axios from 'axios';
function AnnouncementDetailDrawer(props: any) {
    const classes = useStyles();
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const [annoucement, setAnnoucement] = useState<null | any>({});
    const [loading, setLoading] = useState(false);
    
    const getSingleAnnouncement = async () => {
        setLoading(true);
        await axios.get(baseurl+'/single_announcement/'+props.currentId)
        .then(function (response) {
            if (response.status === 200) {
                setAnnoucement(response.data)
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(() => {
            setLoading(false)
        });
    }
    useEffect(() => {
        getSingleAnnouncement();
    }, [props.currentId])
    return (
        <>
            <MDrawer className={classes.announcementDrawer} open={props.isDrawerOpen} onClose={() => props.setIsDrawerOpen(false)}
                variant="temporary"
                anchor={'right'}
            >
                <MAppBar color="secondary" className="drawerAppBar">
                    <MToolbar>
                        <MBox display="flex" alignItems="center"
                            flexWrap="wrap">
                            <MBox display="inline-block" mr={1}>
                                <MIconButton className={classes.arrowbackward} onClick={() => props.setIsDrawerOpen(false)}>
                                    <ArrowBackIcon />
                                </MIconButton>
                            </MBox>
                            {
                                loading ? <MBox
                                    display="flex"
                                    alignItems="center"
                                    textAlign="center"
                                    height="auto"
                                    justifyContent="center"
                                    className={classes.circular}>
                                    <MCircularProgress />
                                </MBox> :
                                <>
                                 <MBox minHeight={30} fontSize={18}>{annoucement.title}</MBox>
                                </>
                            }
                        </MBox>
                    </MToolbar>
                </MAppBar>
                <MBox p={2} className="desc">
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
                            </MBox> : <MBox className={classes.linebreakDescription} dangerouslySetInnerHTML={{ __html: annoucement.description }}></MBox>
                    }
                </MBox>
            </MDrawer>
        </>
    );
}
export default AnnouncementDetailDrawer;