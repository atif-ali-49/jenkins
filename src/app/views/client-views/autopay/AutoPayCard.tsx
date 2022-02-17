import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { MBox, MButton, MTypography } from 'src/app/components/mui';
import { showAlert } from 'src/app/store';
import ListView from '../smart-pay/ListView';
import useStyles from './AutoPayStyles';
function AutoPayCard(props:any) {
    const dispatch = useDispatch();
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const classes = useStyles();
    const user_id = useSelector((store: any) => store.auth.currentUser.id);
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const[isUpdatePkg,setUpdatePkg] = useState(false);

    const handleClose = () => {
        setOpen(false);
        props.setOpen(false);
    };
    const selectPkg = (pkgId) =>
    {
        props.setSelectedPackage(pkgId)
    }
    const autoPayOrder = (pkg_uuid:any) =>{
        sessionStorage.setItem('browserpkg',pkg_uuid);
        history.push('/client/checkout');
    }

    const cancelAutoPayPurchasedPkg = ()=>{

        axios.post(baseurl+'/cancel_autopay', {
           user_id:user_id
        })
            .then(function (response) {
                if(response.status === 200){
                    props.setAutoPayPurchasedPkg({});
                    props.setPkSwitcher(true);
                    dispatch(showAlert({
                        message: 'Your auto pay subscription cancel successfully',
                        messageType:'success',
                        showAlertMessage:true
                    }));
                }
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // for update pkg
    const updatePkgData = (uuid) =>{

        axios.post(baseurl+'/update_autopay_package', {
            package: uuid,
        })
            .then(function (response) {
               if(response.status === 200){
              history.push('/client/auto-pay');
                   dispatch(showAlert({
                       message: 'Your auto pay subscription updated successfully',
                       messageType:'success',
                       showAlertMessage:true
                   }));
               }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <>

            {
                props.updatePkgTrue === true ?

                    <Grid item lg={4}>
                        <div className={classes.parentCard}>
                            <MBox
                                className={props.selectedPackage === props.id || props.purchased === true ? props.selectedpkgbackgroundcolor : classes.smartcard}>

                                <MTypography className="mainHeading" component="h1" variant="h4">{props.name}</MTypography>
                                <MTypography className="mainHeading" gutterBottom component="h1"
                                             variant="h6">${props.price}</MTypography>
                                <List className={classes.ListParent}>
                                    {
                                        props.desc.split("/").map((item, index:number) => (
                                            <ListView key={index+1} feature={item}/>
                                        ))
                                    }
                                </List>


                                {
                                    <MButton className={props.btnColor} color={"primary"} size={"small"}
                                             variant={"contained"}
                                             onClick={() => updatePkgData(props.pkg_uuid)}><b>{'Update'}</b></MButton>
                                }


                            </MBox>
                            <span className={`${props.topstyle} ${props.colordiv}`}></span>
                            <span className={`${props.bottomstyle} ${props.colordiv}`}></span>
                        </div>
                    </Grid>

                    :
                    <Grid item lg={4}>
                <div className={classes.parentCard}>
                    <MBox
                        className={props.selectedPackage === props.id || props.purchased === true ? props.selectedpkgbackgroundcolor : classes.smartcard}>

                        <MTypography className="mainHeading" component="h1" variant="h4">{props.name}</MTypography>
                        <MTypography className="mainHeading" gutterBottom component="h1"
                                     variant="h6">${props.price}</MTypography>
                        <List className={classes.ListParent}>
                            {
                                props.desc.split("/").map((item, index:number) => (
                                    <ListView key={index+1} feature={item}/>
                                ))
                            }
                        </List>


                        {
                            props.purchased !== true ?
                                props.selectedPackage === props.id ?
                                    <>
                                        <MButton className={props.selectedpkgbtn} size={"small"} variant={"contained"}
                                                 onClick={() => autoPayOrder(props.pkg_uuid)}><b>{'Place Order'}</b></MButton>
                                    </>
                                    :
                                    props.purchased !== true &&
                                    <MButton className={props.btnColor} color={"primary"} size={"small"}
                                             variant={"contained"}
                                             onClick={() => selectPkg(props.id)}><b>{'Select Package'}</b>
                                    </MButton>
                                :
                                <>
                                    {/*<MButton className={classes.selctedpkgbtn} size={"small"} variant={"contained"}><b>Your Purchased Package</b></MButton>*/}


                                    <MBox display="flex" justifyContent="center" m={3} p={1}>
                                        <MBox p={1}>

                                            <MButton
                                                color="primary"
                                                size={"large"}
                                                variant={"contained"}
                                                onClick={() => {
                                                    setOpen(true);
                                                    setUpdatePkg(true);
                                                }}>Update
                                            </MButton>
                                        </MBox>
                                    </MBox>
                                </>
                        }


                    </MBox>
                    <span className={`${props.topstyle} ${props.colordiv}`}></span>
                    <span className={`${props.bottomstyle} ${props.colordiv}`}></span>
                </div>
            </Grid>

            }




    {/*confirm Box for Auto Pay Packages*/}
    <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogContent dividers>
            <DialogContentText id="alert-dialog-description">
                {
                    <MBox fontSize={16} align="center"><Alert severity="warning">Are you sure you want to unsubscribe this package !</Alert></MBox>

                }
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            {

                    <>
                <Button size="small" onClick={()=>{props.setOpen(false)}} color="secondary">No</Button>
                <Button size="small" type="submit"  onClick={() => {
                cancelAutoPayPurchasedPkg();
            }} color="primary" variant="contained">
                Yes
                </Button>
                </>
            }

        </DialogActions>
    </Dialog>

        {/*    for upadte */}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent dividers>
                    <DialogContentText id="alert-dialog-description">
                        <MBox style={{color: 'red'}} fontSize={16} align="center"><Alert severity="info">Let us know what you want to Update ?</Alert></MBox>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        <>



                                <MBox display="flex" justifyContent="center" m={1} p={1}>
                                    <MBox p={1} >
                                        <Button size="large" type="submit"  onClick={() => {
                                            history.push('/client/auto-pay/update');
                                        }} color="primary" variant="contained">Package</Button>
                                    </MBox>
                                    <MBox p={1} >
                                        <Button size="large" type="submit"  onClick={() => {history.push('/client/auto-pay/date/update')}} color="primary" variant="contained">Auto Pay Date</Button>
                                    </MBox>
                                    <MBox p={1}>
                                        <Button size="large" type="submit"  onClick={() => {history.push("/client/auto-pay/card/info/update")}} color="primary" variant="contained">Card Info</Button>
                                    </MBox>
                                </MBox>

                            </>
                    }

                </DialogActions>
            </Dialog>
        </>
    )
}

export default AutoPayCard
