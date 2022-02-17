import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import {
    MBox,
    MTypography,
    MPaper,
    MForm, MFormik, MTextField, MButton,
    MCircularProgress
} from 'src/app/components/mui';
import { showAlert } from 'src/app/store';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
function TransferCoin(props:any) {
    const [loading, setLoading] = useState(false);
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const loginUserName = useSelector((store: any) => store.auth.currentUser.username);
    // console.log(loginUserName,'loginUserName')
    const dispatch = useDispatch();
    const transferCoins = async (data) =>{
         if(loginUserName == data.username){
             dispatch(showAlert({
                 message: 'You cannot transfer coins to yourself',
                 messageType: 'error',
                 showAlertMessage: true
             }));
         }else{
             setLoading(true)
             axios.post(baseurl + '/coins_transfer', {
                 security_code: data.sco_code,
                 username: data.username,
                 number_of_coins:data.number_of_coins
             })
                 .then(function (response) {
                     setLoading(false)
                     if(response.status === 200){
                         dispatch(showAlert({
                             message:response.data.message,
                             messageType: 'success',
                             showAlertMessage: true
                         }));
                     }
                 })
                 .catch(function (error) {
                     setLoading(false)
                     if(error.response.status === 400){
                         // console.log(error.response.data.message);
                         dispatch(showAlert({
                             message: error.response.data.message,
                             messageType: 'error',
                             showAlertMessage: true
                         }));
                     }
                 });
         }


    }
    return (
        <div>
            <Box className="pageHeader">
              <Typography className="mainHeading" gutterBottom component="h1" variant="h4">Transfer Coins</Typography>
              <RouterBreadcrumbs />
          </Box>
            {
                loading ?
                <MBox display="flex" justifyContent="center" alignItems="center">
                    <MBox>
                        <MCircularProgress/>
                    </MBox>
                </MBox>
                    :
                <MFormik
                enableReinitialize="true"
                initialValues={{
                number_of_coins: '',
                username:'',
                sco_code:''

            }}
                validationSchema={
                Yup.object().shape({
                number_of_coins: Yup.number().required("Amount  is required"),
                sco_code: Yup.string().required("Secret code  is required"),
                username:Yup.string().required("Recipient username  is required")
            })
            }
                onSubmit={(values: any, {resetForm,setSubmitting}) => {
                transferCoins(values).then(() => {
                        setSubmitting(false);
                    });
            }}
                >
            {() => (
                <MForm>
                <MBox className="contentBox" component={MPaper}>

                <div>
                <Grid container spacing={3}>
                <Grid item md={12} lg={6}>
                <MBox border={1} borderColor="grey.500" height={"100%"} boxShadow={2} borderRadius={6} p={3}>
                <MBox display={"flex"} alignItems={"center"}>
                <MBox className={"teamInfo"}>
                <Typography className="mainHeading" gutterBottom component="h4" variant="h4">Sending and Receiving Coins</Typography>

                <MTypography variant={"body2"}> Transfer <span style={{color:'red'}}>funds</span> from one wallet to another.</MTypography>
                <MTypography variant={"body2"}> <span style={{color:'red'}}>Minimum 1 USD</span> and <span style={{color:'red'}}>Maximum 1000 USD</span>  can be transferred in one day.</MTypography>
                <br/>
                <MTypography variant={"body2"}> <span style={{color:'red'}}>0.0%</span>transfer charges will apply per transaction.</MTypography>
                <br/>
                <MTypography variant={"body2"}>For sending, Enter the username and email of the recipient and choose the amount to send. After you confirm the numbers, triple check them to avoid silly mistakes then hit “transfer funds”.</MTypography>
                <br/>
                <MTypography variant={"body2"}>Use values with up to two decimal positions</MTypography>
                </MBox>
                </MBox>
                </MBox>
                </Grid>
                <Grid item md={12} lg={6} >
                <MBox border={1} borderColor="grey.500" height={"100%"} boxShadow={2} borderRadius={6} p={3}>
                <MBox display={"flex"} flexWrap={'wrap'} alignItems={"center"}>

                <MBox className={"teamAvatar"} mt={2} mr={2} flexGrow={1}>
                <MTextField
                name="username"
                label="Recipient username
"
                variant="outlined"
                color="primary"
                size="small"
                type="text"
                fullWidth
                InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                <AccountCircle />
                </InputAdornment>
                )
            }}
                />
                </MBox>
                <MBox className={"teamAvatar"} mt={2} mr={2} flexGrow={1}>

                <MTextField
                name="sco_code"
                label="User Secret Code"
                variant="outlined"
                color="primary"
                size="small"
                type="text"
                fullWidth
                InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                <MailOutlineIcon />
                </InputAdornment>
                ),
            }}
                />
                </MBox>
                <MBox className={"teamAvatar"} mt={4} mr={2} flexGrow={1}>

                <MTextField
                name="number_of_coins"
                label="Amount"
                variant="outlined"
                color="primary"
                size="small"
                type="text"
                fullWidth
                InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                <small>Peacecoins:</small>
                </InputAdornment>
                )
            }}
                />
                </MBox>
                </MBox>
                <MBox mt={3} display="flex" justifyContent="center" className={"teamInfo"}>
                <MButton variant="contained" color="primary" type="submit">Transfer</MButton>
                </MBox>


                <br></br><br></br>
            {/* Transaction Fee: <span style={{color:'red'}}>Minimum 1 USD</span>
                        <MTypography variant={"body2"}>Use values with up to two decimal positions</MTypography> */}
                </MBox>


                </Grid>

                </Grid>
                </div>
                </MBox>
                </MForm>
                )}
                </MFormik>}

        </div>
    );
}

export default TransferCoin;