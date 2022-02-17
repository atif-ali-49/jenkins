import React, { useState, useEffect } from 'react';
import {
    MBox,
    MGrid,
    MTypography,
    MTextField,
    MForm,
    MFormik,
    MButton,
    MPaper,
    MAlert,
} from 'src/app/components/mui';
import { Formik } from 'formik';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import * as Yup from 'yup';
import useStyles from './CheckoutStyles';
import InputMask from 'react-input-mask';
import PaymentCard from './PaymentCard';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { resetStore } from 'src/app/store'
import { setReferral, showAlert } from 'src/app/store';
import Moment from 'moment';
import axios from 'axios';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


//********************* for Dialog Box *******************
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import { setCurrentUserData } from 'src/app/store';
function ExpressCard() {
    const history = useHistory();
    let currentDate = new Date()
    const dispatch = useDispatch();
    const classes = useStyles();
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const [selectedDate, setSelectedDate] = React.useState(new Date(currentDate));
    const [open, setOpen] = useState(false);
    // let cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const [dob, setDob] = useState({ myDate: new Date() });
    const [cardHolderName, setCardHolderName] = useState();
    const [cardNumber, setCardNumber] = useState();
    const [loading, setLoading] = useState(false);
    const [cardExpiry, setCardExpiry] = useState();
    const [cardCsv, setCardCsv] = useState();
    const [order, setOrder] = useState<any | null>([]);
    const [joiningPkgData, setJoiningPkgData] = useState<any | null>({});
    const userData = useSelector((store: any) => store.auth.currentUser);
    const [datepicker, setDatePicker] = useState(false);
    const [term_error, setTermError] = useState(false);
    const[countries,setCountries] = useState<any | null>([]);
    const [terms, setTerms] = useState(false);
    const [expressCard, setExpressCard] = useState();
    useEffect(() => {
        // getCountries();
        sessionStorage.getItem('browserpkg') ? setDatePicker(true) : setDatePicker(false);
    }, [])

    const getCountries = () =>{
        axios.get(baseurl+'/country_list')
            .then(function (response) {
                // handle success
                if(response.status === 200){
                    setCountries(response.data.country)
                }

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    const getPaymentDetail = async (values: any) => {
        let paidStatusLocalStorage:any = localStorage.getItem('paid_status')
        setLoading(true);
        let cart: any;
        let paymentDetail = {
            'payment': {
                'cardNumber': values.cardNumber,
                'cardExpiry': values.cardExpiry,
                'cardCsv': values.cardCsv,
                'street_address': values.street_address,
                'country': values.country,
                'state': values.state,
                'zip_code': values.zip_code,
            },
        }

        if (userData.paid_status == 1) {

            let cartProduct = JSON.parse(localStorage.getItem('cart') || '{}');
            let ibo = JSON.parse(localStorage.getItem('ibo') || '{}');
            //  if only products  in cart
            if (cartProduct.length !==0 && !ibo.id) {

                cart = cartProduct;
                let order = localStorage.getItem('browserKey') || '{}';
                let decrypted = CryptoJS.AES.decrypt(order, "Secret Passphrase");
                let decryptedOrder = decrypted.toString(CryptoJS.enc.Utf8);
                let finalOrder = JSON.parse(decryptedOrder);
                // finalOrder = parseFloat(finalOrder).toFixed(2);
                cart.push(finalOrder, paymentDetail);
                // console.log(cart,'cartProduct fffff');
                // return false;
            }
            //  if ibo and products both in cart
            else if (cartProduct.length ==0 && ibo.id) {
                cart = [];
                let ibo = JSON.parse(localStorage.getItem('ibo') || '{}');
                cart = cartProduct;
                let order = localStorage.getItem('browserKey') || '{}';
                let decrypted = CryptoJS.AES.decrypt(order, "Secret Passphrase");

                let decryptedOrder = decrypted.toString(CryptoJS.enc.Utf8);
                let finalOrder = JSON.parse(decryptedOrder);
                let finalTotal = parseInt(finalOrder.order.total) + parseInt(ibo.price);
                let orderIbo = {
                    'order': {
                        'subtotal': finalTotal,
                        'total': finalTotal
                    },
                }
                cart.push(ibo, orderIbo, paymentDetail);
                // console.log(cart,'if product pkgs and apparels + ibo')
                //  if only Ibo  in cart
            } else {
                cart = [];
                let order = {
                    'order': {
                        'subtotal': ibo.price,
                        'total': ibo.price
                    },
                }
                Object.assign(ibo, { qty: "1" });
                cart.push(ibo, order, paymentDetail)
            }

        }
        //  if paid status is zero and join packages not paid
        else {
            cart = [];

            let order = {
                'order': {
                    'subtotal': joiningPkgData.price,
                    'total': joiningPkgData.price
                },
            }

            Object.assign(joiningPkgData, { qty: "1" });


            cart.push(joiningPkgData, order, paymentDetail)

        }

        // console.log(cart,'cartProduct of cart');
        // return false;
        //
        await axios.post(baseurl + '/checkout', {
            checkout: JSON.stringify(cart),
            user_id: userData.id
        })
            .then(function (response) {
                if (response.status === 200 && response.data.message) {

                    try {
                        const paidStats = localStorage.setItem('paid_status', response.data.user.paid_status);
                    } catch (err) {
                        console.log(err);
                    }

                    localStorage.removeItem('cart');
                    localStorage.removeItem('browserKey');
                    localStorage.removeItem('ibo');

                    if (localStorage.getItem('paid_status') !== null && localStorage.getItem('paid_status') !== undefined && localStorage.getItem('paid_status') !== '') {

                        dispatch(showAlert({
                            message: 'Payment Successfully Done',
                            messageType: 'success',
                            showAlertMessage: true
                        }));


                        if(paidStatusLocalStorage > 0){

                            dispatch(showAlert({
                                message: 'Payment Successfully Done',
                                messageType: 'success',
                                showAlertMessage: true
                            }));
                            // window.location.reload();
                            getUserProfileData();
                        }else{
                            // return false;
                            setTimeout(()=>{
                                history.push('/client/dashboard');
                                window.location.reload();
                            },3000);
                        }



                    }

                }

            })
            .catch(function (error) {

                if(error.response.status === 500){
                    dispatch(showAlert({
                        message: "Please Check Your Provided Information",
                        messageType: 'error',
                        showAlertMessage: true
                    }));
                }else{
                    dispatch(showAlert({
                        message: "Internal Server Error",
                        messageType: 'error',
                        showAlertMessage: true
                    }));
                }
            })
            .then(function () {
                setLoading(false);
            })
    }
    // logout
    const logOut = () => {
        axios.post(baseurl + '/logout')
            .then(function (response) {
                if (response.status === 200) {
                    dispatch(resetStore());
                    localStorage.clear();
                    sessionStorage.clear();
                    history.push('/');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    // ********************************* terms and conditions check functions **************************************

    const AccetpTermsConditions = (e: any) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setTerms(value);
        handleClickOpen(value);
    }

    const ExpressCard = (e:any)=>{
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setExpressCard(value)
        // console.log(value,'xzxxc vxcvcxvcxv')
    }
    const handleClickOpen = (value) => {
        setOpen(value);
    };

    const handleClose = () => {
        sessionStorage.removeItem('browserpkg');
        history.push('/client/dashboard');
        setOpen(false);
    };

    const getUserProfileData = async () => {
        await axios.get(baseurl + '/profile_show')
            .then(function (response) {
                // handle success
                if (response.status === 200 && response.data.message)
                    //   console.log(response.data.user,'at index')
                    dispatch(setCurrentUserData(response.data.user));
                history.push('/client/dashboard');
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    const submitAutoPay = async (values: any) => {
        setLoading(true);
        if (!terms) {
            setTermError(true)
            return false;
        } else {
            let year_months = values.cardExpiry.split('/');
            axios.post(baseurl + '/autopay_registry', {
                street_address:values.street_address,
                country:values.country,
                state:values.state,
                zip_code:values.zip_code,
                cardnumber:values.cardNumber,
                cvv:values.cardCsv,
                expiryMM:year_months[0],
                expiryYY:year_months[1],
                date:Moment(selectedDate).format('YYYY-MM-DD') ? Moment(selectedDate).format('YYYY-MM-DD') : Moment(currentDate).format('YYYY-MM-DD'),
                pkg:sessionStorage.getItem('browserpkg'),
                user_id:userData.id
            })
                .then(function (response) {
                    // console.log(response);
                    if (response.status === 200 && response.data.message) {
                        sessionStorage.removeItem('browserpkg');
                        dispatch(showAlert({
                            message: 'You have successfully subscribed autopay',
                            messageType: 'success',
                            showAlertMessage: true
                        }));
                        history.push('/client/auto-pay/transaction');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    setLoading(false);
                });

        }
    }
    return (
        <>
            <MBox className="pageHeader" display="flex" justifyContent="space-between" alignItems="center">

                {/*<MBox>*/}
                {/*    <MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Checkout Express</MTypography>*/}
                {/*    {userData.paid_status == 1 && <RouterBreadcrumbs />}*/}
                {/*</MBox>*/}
                <MBox>
                    {userData.paid_status === 0 && <MButton className="btnMedium" variant="contained" color="primary" type="submit" onClick={() => logOut()}>Logout</MButton>}
                </MBox>
            </MBox>

            <MBox className="contentBox" component={MPaper}>
                <MGrid container spacing={3} justify="center" alignItems="center">
                    {userData.paid_status == 0 && <PaymentCard setJoiningPkgData={setJoiningPkgData} />}
                </MGrid>
                <MGrid container spacing={2} justify="center" alignItems="center">
                    <MGrid item md={7}>
                        <MFormik

                            initialValues={{
                                cardNumber: '',
                                cardExpiry: '',
                                cardCsv: '',
                                country: '',
                                state:'',
                                street_address:'',
                                zip_code:''
                            }}

                            validationSchema={
                                Yup.object().shape({
                                    cardExpiry: Yup.string().required("card expiry is required"),
                                    cardNumber: Yup.string().test("cardNumber", "Invalid Card Number", (val = "") => {
                                        const val_length_without_dashes = val.replace(/-|_/g, "").length;
                                        return val_length_without_dashes === 15;
                                    }),
                                    cardCsv: Yup.string().required("cvv number is required").min(4).max(4),
                                    country: Yup.string().required("country is required"),
                                    state: Yup.string().required("state is required"),
                                    zip_code: Yup.string().required("zip code is required"),
                                    street_address: Yup.string().required("street address is required"),
                                })
                            }

                            onSubmit={(values: any, { resetForm, setSubmitting }) => {
                                if (datepicker) {
                                    submitAutoPay(values).then(() => {
                                        setSubmitting(false);
                                    })
                                        .catch(() => {
                                            setSubmitting(false);
                                        })
                                } else {
                                    getPaymentDetail(values).then(() => {
                                        setSubmitting(false);
                                    })
                                        .catch(() => {
                                            setSubmitting(false);
                                        })
                                }
                            }}
                        >
                            {({ values, handleChange}: any) => (

                                <MForm>
                                    {/* {!isValid ? setShake(true): ''} */}
                                    <MGrid container spacing={2}>
                                        <MGrid item xs={12}>
                                            {/*<MBox mb={1}>*/}
                                            {/*    <FormControl component="fieldset">*/}
                                            {/*        <FormGroup aria-label="position" row>*/}
                                            {/*            <FormControlLabel*/}
                                            {/*                value={terms}*/}
                                            {/*                control={<Checkbox color="primary" />}*/}
                                            {/*                label="American Express Card"*/}
                                            {/*                labelPlacement="end"*/}
                                            {/*                onChange={(e) => ExpressCard(e)}*/}
                                            {/*            />*/}
                                            {/*        </FormGroup>*/}
                                            {/*    </FormControl>*/}
                                            {/*</MBox>*/}
                                            <MBox className="formFieldWrapper" mb={1}>
                                                <MTextField
                                                    label="Street Address"
                                                    variant="outlined"
                                                    color="primary"
                                                    multiline
                                                    size="small"
                                                    row={3}
                                                    type="text"
                                                    name="street_address"
                                                    fullWidth
                                                />
                                            </MBox>
                                        </MGrid>
                                        <MGrid item xs={4}>
                                            <MBox mb={1}>
                                                {/* <MAlert severity="warning">*Shipping address must be your current residence address</MAlert> */}
                                            </MBox>
                                            <MBox className="formFieldWrapper" mb={1}>
                                                <MTextField
                                                    label="Country"
                                                    variant="outlined"
                                                    color="primary"
                                                    multiline
                                                    size="small"
                                                    type="text"
                                                    name="country"
                                                    fullWidth
                                                />
                                            </MBox>
                                        </MGrid>
                                        <MGrid item xs={4}>
                                            <MBox mb={1}>
                                                {/* <MAlert severity="warning">*Shipping address must be your current residence address</MAlert> */}
                                            </MBox>
                                            <MBox className="formFieldWrapper" mb={1}>
                                                <MTextField
                                                    label="State"
                                                    variant="outlined"
                                                    color="primary"
                                                    multiline
                                                    size="small"
                                                    type="text"
                                                    name="state"
                                                    fullWidth
                                                />
                                            </MBox>
                                        </MGrid>

                                        <MGrid item xs={4}>
                                            <MBox mb={1}>
                                                {/* <MAlert severity="warning">*Shipping address must be your current residence address</MAlert> */}
                                            </MBox>
                                            <MBox className="formFieldWrapper" mb={1}>
                                                <MTextField
                                                    label="Zip Code"
                                                    variant="outlined"
                                                    color="primary"
                                                    multiline
                                                    size="small"
                                                    type="text"
                                                    name="zip_code"
                                                    fullWidth
                                                />
                                            </MBox>
                                        </MGrid>
                                        {


                                                <>
                                                    <MGrid item sm={6} xs={12}>
                                                        <MBox className="formFieldWrapper" mb={1}>
                                                            <InputMask
                                                                mask='9999-9999-9999-999'
                                                                value={cardNumber}
                                                                onChange={handleChange}
                                                            >
                                                                {() =>
                                                                    <MTextField
                                                                        name="cardNumber"
                                                                        label="Express Card Number"
                                                                        variant="outlined"
                                                                        color="primary"
                                                                        size="small"
                                                                        placeholder="**** **** **** ***"
                                                                        type="text"
                                                                        fullWidth
                                                                        onKeyDown={setCardNumber(values.cardNumber)}

                                                                    />
                                                                }
                                                            </InputMask>
                                                        </MBox>
                                                    </MGrid>
                                                    <MGrid item sm={6} xs={12}>
                                                        <MBox className="formFieldWrapper" mb={1}>
                                                            <InputMask
                                                                mask='9999'
                                                                value={cardCsv}
                                                                onChange={handleChange}
                                                            >
                                                                {() =>
                                                                    <MTextField
                                                                        name="cardCsv"
                                                                        label="Express Cvv"
                                                                        placeholder="1734"
                                                                        variant="outlined"
                                                                        color="primary"
                                                                        size="small"
                                                                        type="text"
                                                                        fullWidth
                                                                        onKeyDown={setCardCsv(values.cardCsv)}
                                                                    />
                                                                }
                                                            </InputMask>
                                                        </MBox>
                                                    </MGrid>
                                                </>
                                        }
                                        <MGrid item sm={6} xs={12}>
                                            <MBox className="formFieldWrapper" mb={1}>
                                                <InputMask
                                                    mask='99/9999'
                                                    value={cardExpiry}
                                                    onChange={handleChange}
                                                >
                                                    {() =>
                                                        <MTextField
                                                            name="cardExpiry"
                                                            label="Card Expiration"
                                                            placeholder="01/2023"
                                                            variant="outlined"
                                                            color="primary"
                                                            size="small"
                                                            type="text"
                                                            fullWidth
                                                            onKeyDown={setCardExpiry(values.cardExpiry)}
                                                        />
                                                    }
                                                </InputMask>
                                            </MBox>
                                        </MGrid>

                                        <MGrid item sm={6} xs={12} md={6}>
                                            <MBox className="formFieldWrapper" mb={1}>
                                                {
                                                    datepicker &&
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <KeyboardDatePicker
                                                            // disableToolbar
                                                            variant="inline"
                                                            inputVariant="outlined"
                                                            emptyLabel="mm / dd / yyyy"
                                                            size="small"
                                                            format="MM/dd/yyyy"
                                                            fullWidth
                                                            id="date-picker-inline"
                                                            label="Select AutoPay Date"
                                                            value={selectedDate}
                                                            disableFuture={false}
                                                            disablePast={true}
                                                            InputProps={{ readOnly: true }}
                                                            maxDateMessage="You can't select future date"
                                                            onChange={handleDateChange}
                                                            KeyboardButtonProps={{
                                                                'aria-label': 'change date',
                                                            }}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                }
                                            </MBox>
                                        </MGrid>

                                        {datepicker ?
                                            <MGrid container spacing={3} >
                                                <MGrid item sm={6} xs={12}>
                                                    <MBox display="flex" justifyContent="space-between" paddingLeft={2} >


                                                        <MBox>
                                                            <FormControl component="fieldset">
                                                                <FormGroup aria-label="position" row>
                                                                    <FormControlLabel
                                                                        value={terms}
                                                                        control={<Checkbox color="primary" />}
                                                                        label="Accept the terms and conditions"
                                                                        labelPlacement="end"
                                                                        onChange={(e) => AccetpTermsConditions(e)}
                                                                    />
                                                                </FormGroup>
                                                                {
                                                                    term_error &&
                                                                    <small style={{ color: "red" }}>Terms and Conditions are
                                                                        Required</small>
                                                                }
                                                            </FormControl>
                                                        </MBox>
                                                    </MBox>
                                                </MGrid>
                                                <MGrid item sm={6} xs={12} >
                                                    <MBox display="flex" m={1} justifyContent="center" >
                                                        <MButton className="btnMedium"  variant="contained" color="primary" type="submit" disabled={loading} loading={loading}>Submit</MButton>
                                                    </MBox>
                                                </MGrid>
                                            </MGrid>
                                            :
                                            <MBox m={1}>
                                                <MButton className="btnMedium" variant="contained" color="primary" type="submit" disabled={loading} loading={loading}>Submit</MButton>
                                            </MBox>
                                        }
                                    </MGrid>
                                </MForm>
                            )}
                        </MFormik>

                    </MGrid>
                    <MGrid item lg={5} className={classes.cardposition} alignItems="center" container>
                        {/* <MBox className={`${classes.cardWrapper} ${shake && 'shakeElement'}`} px={3} py={4} item> */}
                        <MBox className={`${classes.cardWrapper}`} mt={2} px={3} py={2} item>
                            <MBox>
                                <img className={classes.imageWidth} src="https://media.peacecoin.io/logob.png" />
                            </MBox>
                            <MBox display="flex" justifyContent="flex-end" alignItems="center">

                                <MBox className={`chip`}><img width="60px" src="/img/client-dashboard/chip.png" alt="card chip" /> </MBox>
                            </MBox>
                            <MBox mb={2}>
                                <MBox className={`label`}>Card Number</MBox>
                                <MBox className={`value`}>{cardNumber}</MBox>
                            </MBox>
                            <MBox display="flex" justifyContent="space-between" alignItems="center">
                                <MBox>
                                    <MBox className={`label`}>Expiration Date</MBox>
                                    <MBox className={`value`}>{cardExpiry}</MBox>
                                </MBox>

                            </MBox>
                            <MBox display="flex" justifyContent="space-between" alignItems="flex-end">
                                <MBox className={`cardHolderName`}>{''}</MBox>
                                <MBox>
                                    <MBox className={`label`}>CVV</MBox>
                                    <MBox className={`value`}>{cardCsv}</MBox>
                                </MBox>
                            </MBox>

                        </MBox>
                    </MGrid>
                </MGrid>
            </MBox>
            {/*confirm Box for Auto Pay Packages*/}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Terms and Conditions"}</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText id="alert-dialog-description">
                        We may collect and use personal data when we do business with you or when you do business with those that use our services. Some of our services may be
                        accessed directly by you, including through our websites that reference this policy (e.g. Peacecoin.com) (collectively “Sites”). Many of our services are provided to others in
                        connection with their own business and activities, and you may engage with Peacecoin services as part of another’s service, such as when you make a payment to a
                        merchant and we provide the payment processing services to that merchant through Payment Checkout (collectively, we refer to Sites and direct and indirect services as “Services”).
                        This policy applies to Peacecoin’s own Services. Websites, products and services of third-parties and some affiliates of Peacecoin are subject to their
                        own separate privacy policies.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Disagree</Button>
                    <Button type="submit" color="primary" autoFocus onClick={() => {
                        terms && setOpen(false);
                    }}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ExpressCard
