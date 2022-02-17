import React, {useRef } from 'react';
import Button from '@material-ui/core/Button';
import { MBox, MGrid,MPaper } from 'src/app/components/mui';
import { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Typography } from '@material-ui/core';
import {AiOutlineClose} from 'react-icons/ai'
import CircularProgress from '@material-ui/core/CircularProgress';


import axios from 'axios';
import { useDispatch } from 'react-redux';
import {showAlert } from "src/app/store";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiCircularProgress-root':{
                width:'30px !important',
                height:'30px !important',
                marginTop:'3px'

            }
        },
        textFontWeight:{
            fontWeight:600,
            [theme.breakpoints.down(767)]: {
                fontSize:'12px',
            },
        },
        disablecolor:{
            backgroundColor:'#f0f0f0',
        }

    })
);


export default function OtpModal(props:any) {
    const dispatch = useDispatch();
    const[showtime, setShowTime]=React.useState<any | null>(false)
    const initialmint = 3;
    const classes=useStyles();
    const baseUrl = process.env.REACT_APP_API_END_POINT;
    const[resendOTP, setResendOtp]=React.useState(false)
    const[loader, setLoader]=React.useState(false)
    const [fieldDisable, setFieldDisable]=React.useState <any | null>(true)
    const [otpValidate, setOtpValidate]=React.useState(false)
    const [otpExpiryMinutes, setOtpExpiryMinutes]=React.useState<any | null >(null)
    const [secondsds, setSeconds] = React.useState<any | null >(null);
    const [userOTP, setUserOTP]=React.useState<any | null>('')
    const[disableOtpButton, setdisableOtpButton]=React.useState(false)
    const [getminutes, setMinutes]=React.useState<any | null>();
    const [getInterval,setInterVal] = React.useState<any | null>();
    let interval;


    const handleClose = () => {
        props.setOpen(false);
        setUserOTP('');
        setResendOtp(false);
        setShowTime(false);
        setLoader(false);
        props.setUserEmail('');
        props.setAmount('');
        clearInterval(getInterval);
        setOtpExpiryMinutes(null);
        setSeconds(null);


    }

    const timerCountDown = (duration:any) =>{
            duration = parseInt(duration);
            let timer =  duration , minutes, seconds;

                interval = setInterval(function () {

                    minutes = timer / 60;
                    seconds = timer % 60;

                    if (--timer < 0) {
                        setResendOtp(true)
                        setShowTime(false)
                        setdisableOtpButton(false)
                        clearInterval(interval)
                    }
                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;

                    minutes = parseInt(minutes);
                    seconds = parseInt(seconds);

                    setOtpExpiryMinutes(minutes);
                    setSeconds(seconds);
                    setInterVal(interval);

                }, 1000);



    }



    function sendRequest(){
        if(!userOTP){
            setOtpValidate(true)
        }
        else{
            axios.post(baseUrl + '/withdraw', {
                coin_id: props.coinType,
                exchange_username : props.userEmail,
                amount: props.amount,
                otp_code:userOTP
            })
                .then((response) => {
                    if(response.status == 201){
                        props.withDrawList();
                        setUserOTP('');
                        props.setOpen(false);
                        dispatch(showAlert({
                            message:response.data.message,
                            messageType: 'success',
                            showAlertMessage: true
                        }));
                    }else if(response.data.status == 412){
                        dispatch(showAlert({
                            message:response.data.message,
                            messageType: 'error',
                            showAlertMessage: true
                        }));
                    }else{
                        dispatch(showAlert({
                            message:'Something went wrong',
                            messageType:'error',
                            showAlertMessage: true
                        }));
                    }
                });
        }
    }


    function generateOTP(){
        setLoader(true)
        setdisableOtpButton(true)
        axios.post(baseUrl + '/2fa/generate', {via: 'email'})
            .then((response) => {
                if(response.status == 201 && response.data.status== 'error'){
                    setLoader(false)
                    setShowTime(false)
                    props.setOpen(false);
                    setResendOtp(false)
                    dispatch(showAlert({
                        message:response.data.message,
                        messageType: 'error',
                        showAlertMessage: true
                    }));
                }
                if(response.status == 201  && response.data.status != 'error'){
                    let total_minutes = 60 * response.data.timer;
                    timerCountDown(total_minutes);
                    setLoader(false)
                    setFieldDisable(false)
                    setUserOTP('')
                    setShowTime(true)
                    dispatch(showAlert({
                        message:response.data.message,
                        messageType: 'success',
                        showAlertMessage: true
                    }));
                }
            });
        setResendOtp(true)
    }
    function takeOTP (e){
        if(e.target.value >= 0 && e.target.value.toString().length <= 6){
            setUserOTP(e.target.value)
            setOtpValidate(false)
        }
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                className={classes.root}
                maxWidth="sm"
                fullWidth
                disableBackdropClick
            >
                <MBox display="flex" justifyContent="space-between">
                    <DialogTitle id="responsive-dialog-title">{"Withdraw Verification"}</DialogTitle>
                    <Button onClick={handleClose} color="primary" autoFocus><AiOutlineClose color='#000' /></Button>
                </MBox>

                <DialogContent>
                    <DialogContentText>
                        <MBox  >
                            <MBox my={1} display="flex">
                                <MBox fontWeight={600} minWidth="30%">Amount</MBox>
                                <MBox ml={3} display="flex" alignItems="center"><img width="20px" src='/img/client-dashboard/pc-symbol.png'></img> <MBox ml={1}>{props.amount}</MBox></MBox>
                            </MBox>
                            <MBox my={1} display="flex">
                                <MBox fontWeight={600} minWidth="30%">PeaceCoin Wallet Address on Invex Exchange</MBox>
                                <MBox ml={3} >{props.userEmail}</MBox>
                            </MBox>
                        </MBox>

                        <MBox my={4} position="relative" display="flex" alignItems="center" justifyContent="space-between">
                            <TextField
                                id="outlined-basic"
                                type="number"
                                value={userOTP}
                                onChange={takeOTP}
                                className={fieldDisable && classes.disablecolor} disabled={fieldDisable} fullWidth size="small" name={"otp"}  label='Enter Code'   InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    {(showtime || loader) ?
                                        <MBox>
                                            {showtime && <div><span id="time">{otpExpiryMinutes}:{secondsds}</span></div>}
                                            {loader && <CircularProgress color="primary" />}
                                        </MBox>
                                        :

                                        !resendOTP &&	<Button onClick={generateOTP} color="primary" size='small'>Click to get code</Button>
                                    }
                                </InputAdornment>,
                            }} variant="outlined"
                            />
                            <MBox color="red" fontWeight="fontWeightMedium" style={{display:otpValidate? 'block' :'none'}}>OTP field is required</MBox>
                            {resendOTP &&  <MBox width="30%" ml={3}><Button disabled={disableOtpButton} onClick={generateOTP} color="primary" variant='contained'  size='small'>Resend OTP</Button></MBox>}
                        </MBox>
                        <MBox display="flex" justifyContent="space-between" alignItems="center">
                            <MBox display="flex" flexDirection="column">
                                <MBox fontWeight={600}><Typography variant="h5" >{props.amount - ((+props.tax/100) * props.amount)}</Typography></MBox>
                                <MBox display="flex" justifyContent="space-between">
                                    <MBox className={classes.textFontWeight}><Typography color="primary">{((+props.tax/100) * props.amount).toFixed(2)} PC as Tax ({props.tax}%)</Typography></MBox>
                                    <MBox ml={2} className={classes.textFontWeight}>Fee Included</MBox>
                                </MBox>
                            </MBox>
                            <MBox>
                                <MBox display='inline-block' ml={2}><Button onClick={sendRequest} disabled={userOTP.toString().length == 6 ?  false : true} variant="contained" size="small" color="primary">Send Request</Button></MBox>
                            </MBox>


                        </MBox>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </div>
    );
}
