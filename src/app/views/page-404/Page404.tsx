import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import React from 'react';
import { useSelector } from 'react-redux';
import { MBox, MButton, MTypography } from 'src/app/components/mui';
import { nvigationHelpers } from 'src/app/helpers';
import useStyles from './Page404Styles';

export default function Page404(props:any) {
  const classes = useStyles();

  return (
    <MBox className={classes.pageWraper} pb={5}>
        {/* <MBox>
            <MButton 
            className={classes.backButton} 
            variant="contained" 
            size="large" 
            color='secondary'
            onClick={()=>nvigationHelpers.GoBack()}>
            <ArrowBackRoundedIcon className={classes.backIcon} /> Back to
        </MButton>
        </MBox> */}
        <img className={classes.image404} src="/img/broken-coin.png" alt="404"/>
        <MBox textAlign="center" mt={4}>
            <MTypography variant="h4" style={{color:"rgba(7,9,25,.5)"}}>The page you were looking for doesn't exist.</MTypography>
        </MBox>
    </MBox>
   )
}