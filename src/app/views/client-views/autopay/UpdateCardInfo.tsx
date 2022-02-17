import React, { useState, useEffect } from 'react';
import {
    MBox,
    MGrid,
    MTypography,
    MTextField,
    MForm,
    MFormik,
    MPaper, MButton,
} from 'src/app/components/mui';


import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import * as Yup from 'yup';
import useStyles from './UpDateAutoPayCardInfoStyle';
import InputMask from 'react-input-mask';
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setReferral, showAlert } from 'src/app/store';
import axios from 'axios';
function UpdateCardInfo(props:any) {
    const classes = useStyles();
    const [cardNumber, setCardNumber] = useState();
    const [loading, setLoading] = useState(false);
    const [cardExpiry, setCardExpiry] = useState();
    const [cardCsv, setCardCsv] = useState();
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const dispatch = useDispatch();
    const history = useHistory();
    const userData = useSelector((store: any) => store.auth.currentUser.id);
    // update auto pay card info
    const updateCardInfo = (values:any)=>{
        setLoading(true);
        let year_months = values.cardExpiry.split('/');
        axios.post(baseurl+'/update_autopay_card', {
            cardnumber: values.cardNumber,
            cvv: values.cardCsv,
            expiryMM: year_months[0],
            expiryYY: year_months[1],
            user_id: userData.id,
            country: values.country,
            state:values.state,
            street_address:values.street_address,
            zip_code:values.zip_code
        })
            .then(function (response) {
                if(response.status === 200){
                    history.push('/client/auto-pay');
                    dispatch(showAlert({
                        message: 'Your Card Info updated successfully',
                        messageType:'success',
                        showAlertMessage:true
                    }));
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                setLoading(false);
            });
    }
    return (
        <>
            <MBox className="pageHeader" display="flex" justifyContent="space-between" alignItems="center">
                <MBox>
                    <MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Update Card Information</MTypography>
                    <RouterBreadcrumbs />
                </MBox>
            </MBox>

            <MBox className="contentBox" component={MPaper}>

                <MGrid container spacing={2} justify="center" alignItems="center">
                    <MGrid item md={7}>
                        <MFormik

                            initialValues={{
                                // cardHolderName: '',
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
                                    // cardHolderName: Yup.string()
                                    // .required('Card holder name is required'),

                                    cardExpiry: Yup.string().required("card expiry is required"),

                                    cardNumber: Yup.string().test("cardNumber", "Invalid Card Number", (val = "") => {
                                            const val_length_without_dashes = val.replace(/-|_/g, "").length;
                                            return val_length_without_dashes === 16;
                                        }),

                                    cardCsv: Yup.string().required("Cvv number is required").min(3).max(3),
                                    country: Yup.string().required("country is required"),
                                    state: Yup.string().required("state is required"),
                                    zip_code: Yup.string().required("zip code is required"),
                                    street_address: Yup.string().required("street address is required"),
                                })
                            }

                            onSubmit={(values: any, { resetForm, setSubmitting }) => {

                                updateCardInfo(values);

                            }}
                        >
                            {({ isValid, dirty, isSubmitting, touched, values, setFieldValue, handleChange, errors, resetForm }: any) => (

                                <MForm>
                                    {loading && <div>loading...</div>}
                                    {/* {!isValid ? setShake(true): ''} */}
                                    <MGrid container spacing={2}>
                                        <MGrid item xs={12}>
                                            <MBox mb={1}>
                                                {/* <MAlert severity="warning">*Shipping address must be your current residence address</MAlert> */}
                                            </MBox>
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
                                        <MGrid item sm={6} xs={12}>
                                            <MBox className="formFieldWrapper" mb={1}>
                                                <InputMask
                                                    mask='9999-9999-9999-9999'
                                                    value={cardNumber}
                                                    onChange={handleChange}
                                                >
                                                    {() =>
                                                        <MTextField
                                                            name="cardNumber"
                                                            label="Card Number"
                                                            variant="outlined"
                                                            color="primary"
                                                            size="small"
                                                            placeholder="**** **** **** ****"
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
                                        <MGrid item sm={6} xs={12}>
                                            <MBox className="formFieldWrapper" mb={1}>
                                                <InputMask
                                                    mask='999'
                                                    value={cardCsv}
                                                    onChange={handleChange}
                                                >
                                                    {() =>
                                                        <MTextField
                                                            name="cardCsv"
                                                            label="Cvv"
                                                            placeholder="173"
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
                                        <MGrid item sm={6} xs={12}>
                                            <MBox className="formFieldWrapper" mb={1}>
                                                <MButton className="btnMedium" variant="contained" color="primary" type="submit" disabled={loading} loading={loading}>Update</MButton>
                                            </MBox>
                                        </MGrid>
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
          </>
    );
}

export default UpdateCardInfo;