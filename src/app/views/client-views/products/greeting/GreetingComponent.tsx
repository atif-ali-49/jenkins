import React,{useState,useEffect} from 'react';
import { MBox, MGrid, MPaper,MList,MListItem,MListItemText } from 'src/app/components/mui';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import useStyles from './GreetingComponentStyle';
import Moment from "moment";
function GreetingComponent(props:any) {
    const classes = useStyles();
    return (
        <div>
            <MBox
                direction="row"
                display='flex'
                justifyContent="center"
                alignItems="center"
            >


                <MBox p={10} className={classes.maindivBg}>
                    <CheckCircleIcon className={classes.iconSetting}  />
                    <MBox mt={1}>
                        <Typography variant="h4" className={classes.textColor}>
                            Congratulations!
                        </Typography>


                    </MBox>

                    <MBox mt={1}>
                        <Typography variant="h6">
                            You have successfully subscribed and purchased your VIP package.
                        </Typography>
                        <Typography variant="h6">
                            If you have opted in for IBO it will expire on the same day your VIP package expires.
                        </Typography>
                    </MBox>
                </MBox>


            </MBox>
        </div>
    );
}

export default GreetingComponent;