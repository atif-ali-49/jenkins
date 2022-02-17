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
} from 'src/app/components/mui';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import * as Yup from 'yup';
import useStyles from './PromotionCheckoutStyles';
import InputMask from 'react-input-mask';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {showAlert } from 'src/app/store';
import axios from 'axios';

function PromotionCheckout() {

	// get current login user id here
	let login_user_id:any =  sessionStorage.getItem('browserKeys') || '{}';

	if(login_user_id == '{}'){
		login_user_id = 0;
	}else{
		let decrypted = CryptoJS.AES.decrypt(login_user_id, "Secret Passphrase");
		let decrypted_login_user_id= decrypted.toString(CryptoJS.enc.Utf8);
		login_user_id = JSON.parse(decrypted_login_user_id);
	}
	const history = useHistory();
	const dispatch = useDispatch();
	const classes = useStyles();
	const baseurl = process.env.REACT_APP_API_END_POINT;
	const [cartItems, setCartItems] = useState<null | any>([]);
	const [cardNumber, setCardNumber] = useState();
	const [loading, setLoading] = useState(false);
	const [cardExpiry, setCardExpiry] = useState();
	const [cardCsv, setCardCsv] = useState();
	useEffect(() => {
		let get_S1Items = JSON.parse(localStorage.getItem('S1') || '[]');
		get_S1Items.length !== 0  ? setCartItems(get_S1Items):history.goBack();

	},[]);

	const itemsPrice = cartItems.reduce((index, value) => index + value.qty * value.price, 0);
	const taxShippingCharges = cartItems.reduce((index, value) => index +   (value.tax/100) * itemsPrice + parseInt(value.shipping_charges), 0);

	const getPaymentDetail = async (values: any) => {


		setLoading(true);
		let checkout:any = [];
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
		let order = {
			'order': {
				'subtotal':itemsPrice,
				'total': itemsPrice + taxShippingCharges,
			}}
		checkout = cartItems;
		checkout.push(order,paymentDetail)
		await axios.post(baseurl + '/checkout', {
			checkout: JSON.stringify(checkout),
			user_id: login_user_id
		})
			.then(function (response) {
				 console.log(response)
				if (response.status === 200) {

					localStorage.removeItem('S1')
					history.push('/client/thank-you');
				}

			})
			.catch(function (error) {
				if (error.response.status === 500) {
					let get_S1Items = JSON.parse(localStorage.getItem('S1') || '[]');
					get_S1Items.length !== 0  && setCartItems(get_S1Items)
					dispatch(showAlert({
						message: "Please Check Your Provided Information",
						messageType: 'error',
						showAlertMessage: true
					}));
				}else if(error.response.status === 404){
					dispatch(showAlert({
						message: "1-S package is for specific countries, It does not support your country.",
						messageType: 'error',
						showAlertMessage: true
					}));
					// history.goBack();
				}else if(error.response.status === 301){
					dispatch(showAlert({
						message: "Something went wrong please try few moments later.",
						messageType: 'error',
						showAlertMessage: true
					}));
				}else{
					console.log(error);
					dispatch(showAlert({
						message:'something went wrong.',
						messageType: 'error',
						showAlertMessage: true
					}));
				}
			})
			.then(function () {
				setLoading(false);
			});
	}

	//  Function for Increment to cart Qty

	const itemQtyIncrement = (cart) =>{
		const exist = cartItems.find((x) => x.id === cart.id);
		if (exist) {

			   setCartItems(
					cartItems.map((x) =>
						x.id === cart.id ? {...exist, qty: exist.qty + 1} : x
					)
				);
		} else {
			setCartItems([...cartItems, {...cart, qty: 1}]);
		}

	}
	//  Function for Decrement to cart Qty
	const itemQtyDecrement = (cart) => {
		const exist = cartItems.find((x) => x.id === cart.id);
		if (exist) {
			if(exist.qty === 1){
				setCartItems(cartItems.filter((x) => x.id !== cart.id));
			}else{
				setCartItems(
					cartItems.map((x) =>
						x.id === cart.id ? { ...exist, qty: exist.qty - 1 } : x
					)
				);
			}
		}
	};

	//  Function for Delete to cart Item
	const deleteItem = (cart) => {
		localStorage.removeItem('S1')
		dispatch(showAlert({
			message: "Product deleted from cart successfully",
			messageType: 'error',
			showAlertMessage: true
		}));
		history.push('/client/dashboard');
	};

	// console.log(login_user_id,'login_user_id')
	return (
		<>
			<MBox className="pageHeader" display="flex" justifyContent="space-between" alignItems="center">
				<MBox>
					<MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Checkout - 1 Summit</MTypography>
					 <RouterBreadcrumbs />
				</MBox>
			</MBox>

			<MBox className="contentBox" component={MPaper}>

				<MGrid container spacing={2} justify="center" alignItems="center">
					{
						<>
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

										getPaymentDetail(values).then(() => {
											setSubmitting(false);
										})
											.catch(() => {
												setSubmitting(false);
											})

									}}
								>
									{({ values, handleChange}: any) => (

										<MForm>
											<MGrid container spacing={2}>
												<MGrid item xs={12}>
													{
													cartItems.length !== 0 &&
													cartItems.slice(0,1).map((item) =>
													<>
												 <Card className={classes.checkoutCard} variant="outlined">
													<CardContent>
														<MBox textAlign="center"><small>We charge {`${item.tax.toFixed(2)}%`} on each purchase with respect to subtotal.</small></MBox>
														<MBox>
														<h2>{item.title}</h2>
														</MBox>													
													{/* <MBox display="flex" justifyContent="space-between" className={classes.CheckoutDetailCover}  alignItems="center" m={1} p={1}  > */}
														<p><span>Subtotal :</span> ${itemsPrice.toFixed(2)}</p>
														<p><span>Tax :</span> ${item.tax > 0 ? ((item.tax/100) * itemsPrice).toFixed(2) : 0}</p>
														<p><span>Shipping Charges :</span> ${item.shipping_charges > 0 ? parseFloat(item.shipping_charges).toFixed(2):0}</p>
														<p><span>Total :</span> ${(itemsPrice + taxShippingCharges).toFixed(2)} </p>
													{/* </MBox> */}
												  </CardContent>		
												 </Card>	
                                                        </>
															)

														}

															
													
												</MGrid>
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



												<MBox m={1}>
													<MButton size="fullWidth" className="btnMedium" variant="contained" color="primary" type="submit" disabled={loading} loading={loading}>Submit</MButton>
												</MBox>

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
						</>
					}
				</MGrid>
			</MBox>
			{/*confirm Box for Auto Pay Packages*/}

		</>
	)
}

export default PromotionCheckout;
