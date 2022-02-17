import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React from 'react';
import { MBox } from '../../../../app/components/mui';
import useStyles from './GreetingComponentStyle';
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
                <MBox p={1} className={classes.maindivBg}>
                    <CheckCircleIcon className={classes.iconSetting}  />
                    <MBox mt={1}>
                        <Typography variant="h4" className={classes.textColor}>
                            Congratulations!
                        </Typography>


                    </MBox>

                    <MBox mt={1}>
                        <Typography variant="h6">
                            You have successfully subscribed to Auto Pay
                        </Typography>
                    </MBox>
                </MBox>


            </MBox>
        </div>
    );
}

export default GreetingComponent;