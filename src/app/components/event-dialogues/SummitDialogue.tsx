import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { MBox, MGrid,MButton } from 'src/app/components/mui';
import useStyles from './SummitDialogueStyles'
import {NavLink} from 'react-router-dom'
import {useEffect} from "react";

export default function SummitDialogue() {
	const classes = useStyles();
  	const [open, setOpen] = React.useState(true);
  	const [isSummitPopup,setIsSummitPopup] = React.useState(true);
  	const handleClickOpen = () => {
    setOpen(true);
  };
	// useEffect(()=>{
	// 	let isSummit = localStorage.getItem('is_summit_popup');
	// 	isSummit === '1' && setIsSummitPopup(false);
	// },[])
  const handleClose = () => {
    setOpen(false);
	// try{
	// 	localStorage.setItem('is_summit_popup','1')
	// }catch(err) {
	// 	console.log('error setting local storage item')
	// }
  };

  return (
    <div>
	
		{
			
			isSummitPopup &&
			<Dialog
				open={open}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				fullWidth
				maxWidth="sm"
			>   
			<MBox className={classes.dialogContainer}>
				<MBox > <img  className={`${classes.topBottomImage} img-fluid`} src="/img/client-dashboard/package-top.png"></img></MBox>	
					<MBox display="flex"  alignItems="center">						
							<MGrid container alignItems="center">

								<MGrid item lg={6}>	
									
									<MBox m={3}>
										<MBox fontSize="18px">Do you want to <b>WIN 18-Karat Gold</b> Or Silver/Platinum Coins?</MBox>
											<MBox mt={3}>
												<MButton exact to="/client/promotion/package/summit" component={NavLink} onClick={handleClose} variant="contained" size="small" color="primary">Yes</MButton>
												&nbsp;&nbsp;<Button  size="small" onClick={handleClose} color="secondary">Not Now</Button>
											</MBox>
									</MBox>
									
								</MGrid>
                                 <MGrid item lg={6}>
                                   <MBox><img width="100%" src="/img/client-dashboard/pop-up-pkg.png" /></MBox>
								 </MGrid>
							</MGrid>				
							<MBox p={2} ><img src="/img/client-dashboard/summit-cartton-character-sm.png" className="img-fluid" alt="cartton character" /></MBox>
							
					</MBox>
					<MBox> <img  className={`${classes.topBottomImage} img-fluid`} src="/img/client-dashboard/popdown.png" /></MBox>
			</MBox>
			</Dialog>		
		}
    </div>
  );
}