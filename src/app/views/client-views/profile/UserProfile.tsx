import React from 'react';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import { MBox, MGrid, MPaper, MChip } from '../../../../app/components/mui';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';
import {NavLink} from "react-router-dom";
import { useSelector } from 'react-redux';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useState, useEffect } from 'react';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import SecretCode from '../../auth/secret-code/SecretCode';
import Moment from 'moment';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    },
    user_avatar: {
        width: theme.spacing(15),
        height: theme.spacing(15)
    },
    label_space: {
        minWidth: "100px"
    },
    form_heading:{
        backgroundColor:theme.palette.background.default,
        color:'#8392a5',
        padding:'10px',
        width:'150px',
        textAlign:"center",
    },
    lineBreak:{
    lineBreak:'anywhere'     
    },
    UserParentProfile:{
     "& svg":{
      cursor:'pointer',
      fontSize:'16px'
     }
    }
  
}));
function UserProfile(props: any) {
    const classes = useStyles();
    const UserData = useSelector((store: any) => store.auth.currentUser);
    let initialssn=UserData?.ssn;
    let initialSecretCode=UserData?.sec_code;
    let initialTax= UserData?.tax_id;
    // let initialTax= "2312"
    const [showSecretCode, setShowSecretCode]=useState(false);
    const[showSsn, setShowSsn]= useState(false);
    const [showTaxId, setShowTaxId]=useState(false);
        console.log(UserData,'UserData')
    return (
        <>
            <MBox className="pageHeader">
                <MBox  display="flex">
                    <MBox flexGrow={1}>
                        <Typography className="mainHeading" gutterBottom component="h1" variant="h4">Profile</Typography>
                    </MBox>
                    <MBox justifyContent="flex-end">
                        <Button variant="contained" color="primary" className="btnSmall" component={NavLink} to={'/client/profile'}>
                           Edit Profile
                        </Button>
                    </MBox>
                </MBox>
                <RouterBreadcrumbs />
            </MBox>
            <MBox className={`contentBox ${classes.UserParentProfile}`} component={MPaper}>
                <MGrid container spacing={3}>
                    <MGrid item xs={12} sm={12} md={4} lg={4}>
                        <Paper className={classes.paper}>
                            <MBox display="flex" justifyContent="center" p={3}>
                                <MBox>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={UserData.path ? UserData.path  :"/img/client-dashboard/avatar.jpg"}
                                        className={classes.user_avatar}
                                    />

                                </MBox>
                            </MBox>
                            <MBox textAlign="center">
                                <Typography variant="h6" gutterBottom>{UserData.username}</Typography>
                                {/*<Typography variant="body2" gutterBottom>Ceo & Co-Founder</Typography>*/}
                                {/* <Typography variant="body2" gutterBottom>{UserData?.country+'  '+ `${UserData?.state}`}</Typography> */}
                                <Typography variant="body2" gutterBottom>{`${UserData?.state}, ${UserData?.country}`}</Typography>
                            </MBox>
                        </Paper>
                    </ MGrid>
                    {/*  form of user info */}
                    <MGrid item xs={12} sm={12} md={8} lg={8}>
                    
                        <Paper className={classes.paper}>
                          <MBox color={'default'} m={3}>
                              <p className={classes.form_heading}>User Info</p>
                          </MBox>
                            <MGrid container>
                            
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>First Name:</MBox>
                                        <MBox>{UserData?.first_name}</MBox>
                                    </MBox>
                                </MGrid>
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>Last Name:</MBox>
                                        <MBox>{UserData?.last_name}</MBox>
                                    </MBox>
                                </MGrid>
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>Mobile:</MBox>
                                        <MBox>{UserData?.mobile}</MBox>
                                    </MBox>
                                </MGrid>
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>Date of Birth:</MBox>
                                        <MBox>{UserData?.birth_day ?  Moment(UserData?.birth_day).format('DD-MM-YYYY') : '- - -'}</MBox>
                                    </MBox>
                                </MGrid>
                                 <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>Gender:</MBox>
                                        <MBox>{UserData?.gender}</MBox>
                                    </MBox>
                                </MGrid>
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>Citizenship:</MBox>
                                        <MBox>{UserData?.city}</MBox>
                                    </MBox>
                                </MGrid>                                
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>Tax ID/SSN:</MBox>
                                        
                                          <MBox display="flex">
                                            {/* {UserData && (UserData.sec_code!==null && UserData.sec_code!==undefined && UserData.sec_code!=='') && */}
                                            { (showTaxId===true) ? UserData?.tax_id : '***********'}
                                            <MBox ml={1}>
                                                {
                                                    showTaxId === false ?
                                                    <VisibilityOffIcon onClick={()=>setShowTaxId( showTaxId ? false : true)}/>
                                                    :
                                                    <VisibilityIcon  onClick={()=>setShowTaxId( showTaxId? false : true)} />
                                                }
                                            </MBox>
                                        
                                         
                                        </MBox>
                                    </MBox>
                                </MGrid>
                                {UserData?.ssn &&
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>SSN:</MBox>
                                        {/* <MBox display="flex" alignItems="center"><MBox mr={1}>{ssn}</MBox> {ssn!== 'N/A' ? ssn===initialssn? <VisibilityOffIcon onClick={showFullSsn}/> : <VisibilityIcon onClick={showFullSsn}/>:''}</MBox> */}
                                        <MBox display="flex" alignItems="center"><MBox mr={1}>{UserData?.ssn}</MBox></MBox>
                                    </MBox>
                                </MGrid>
                                }
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>KYC:</MBox>
                                        <MBox>N/A</MBox>
                                    </MBox>
                                </MGrid>
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>Wallet Address:</MBox>
                                        <MBox className={classes.lineBreak}>N/A</MBox>
                                    </MBox>
                                </MGrid>
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>Sponsor/Referral:</MBox>
                                        <MBox>{UserData?.referrer_id}</MBox>
                                    </MBox>
                                </MGrid>
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>VIP Status:</MBox>
                                        <MBox className={classes.lineBreak}>
                                            
                                            <MChip className={`statusChip ${UserData?.vip_status === 1 ? 'success': 'error'}`} size="small" label={ UserData?.vip_status === 1 ? 'Paid' : 'Not Paid' } />
                                        </MBox>
                                    </MBox>
                                </MGrid>
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>VIP Expiry:</MBox>
                                        <MBox className={classes.lineBreak}>
                                            <span>{ UserData?.vip_expiry ? Moment(UserData?.vip_expiry).format('DD-MM-YYYY') : '- - -'  }</span>
                                        </MBox>
                                    </MBox>
                                </MGrid>
                                {/* date Expiry*/}
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>IBO Status:</MBox>
                                        <MBox><MChip className={`statusChip ${UserData?.ibo_status === 1 ? 'success': 'error'}`} size="small" label={ UserData?.ibo_status === 1 ? 'Paid' : 'Not Paid' } /></MBox>
                                    </MBox>
                                </MGrid>
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>IBO Expiry:</MBox>
                                        <MBox>
                                            <span>{ UserData?.ibo_expiry ? Moment(UserData?.ibo_expiry).format('DD-MM-YYYY') : '- - -'  }</span>
                                        </MBox>
                                    </MBox>
                                </MGrid>

                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>Monthly Status:</MBox>
                                        <MBox><MChip className={`statusChip ${UserData?.monthly_status === 1 ? 'success': 'error'}`} size="small" label={ UserData?.monthly_status === 1 ? 'Active' : 'Inactive' } /></MBox>
                                    </MBox>
                                </MGrid>
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>Monthly Expiry:</MBox>
                                        <MBox>
                                            <span>{UserData?.monthly_expiry ? Moment(UserData?.monthly_expiry).format('DD-MM-YYYY'):'- - -'}</span>
                                        </MBox>
                                    </MBox>
                                </MGrid>
                            </MGrid>
                        </Paper>
                    </ MGrid>
                </MGrid>
                {/*  For Shippin  */}

                <MGrid container
                    direction="row"
                    justify="flex-end"
                    alignItems="center" spacing={3} >
                    <MGrid item xs={12} sm={12} md={8} lg={8}>
                        
                        <Paper className={classes.paper}>
                        <MBox color={'default'} m={3}>
                          <p className={classes.form_heading}>Shipping Information</p>
                           
                          </MBox>
                            <MGrid container>
                                
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>Street Address:</MBox>
                                        <MBox>{UserData?.street_address}</MBox>
                                    </MBox>
                                </MGrid>
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>City:</MBox>
                                        <MBox>{UserData?.city}</MBox>
                                    </MBox>
                                </MGrid>
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>State:</MBox>
                                        <MBox>{UserData?.state}</MBox>
                                    </MBox>
                                </MGrid>
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>Country:</MBox>
                                        <MBox>{UserData?.country}</MBox>
                                    </MBox>
                                </MGrid>
                                 <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>Zip Code:</MBox>
                                        <MBox>{UserData?.post_code}</MBox>
                                    </MBox>
                                </MGrid>
                                <MGrid item xs={12} sm={12} md={6}>
                                    <MBox display="flex" alignItems="center" justifyContent="flex-start" p={3}>
                                        <MBox color="text.hint" mr={5} className={classes.label_space}>Secret Code:</MBox>
                                        {/* <MBox display="flex" >{secretcode} <MBox ml={1}>{secretcode===initialSecretCode? <VisibilityOffIcon onClick={showFullSecretCode}/> : <VisibilityIcon onClick={showFullSecretCode}/>} </MBox> </MBox> */}
                                        <MBox display="flex">
                                            {/* {UserData && (UserData.sec_code!==null && UserData.sec_code!==undefined && UserData.sec_code!=='') && */}
                                            { (showSecretCode===true) ? UserData?.sec_code : '****'}
                                            <MBox ml={1}>
                                                {
                                                    showSecretCode === false ?
                                                    <VisibilityOffIcon onClick={()=>setShowSecretCode( showSecretCode ? false : true)}/>
                                                    :
                                                    <VisibilityIcon  onClick={()=>setShowSecretCode( showSecretCode ? false : true)} />
                                                }
                                            </MBox>
                                        </MBox>
                                    </MBox>
                                </MGrid>
                            </MGrid>
                        </Paper>
                    </ MGrid>
                </MGrid>
            </MBox>
        </>
    );
}
export default UserProfile;