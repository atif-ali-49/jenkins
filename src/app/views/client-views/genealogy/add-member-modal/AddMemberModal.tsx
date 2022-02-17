import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import {useEffect, useState} from 'react';
import { 
    MBox,
    MButton,
    MTextField,
    MForm,
    MFormik,MGrid}
from 'src/app/components/mui';
import axios from 'axios';
import * as Yup from 'yup';
import useStyles from './AddMemberModalStyle';
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import PhoneNumberInput from 'src/app/components/third-party/phone-number-input/PhoneNumberInput';
import { showAlert } from "src/app/store";
import { CountryDropdown } from 'src/app/components';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export function AddMemberModal(props:any) {
    const dispatch = useDispatch();
    const classes = useStyles({});
    const [loading, setLoading] = useState(false);
     const[countries, setCountries] = useState<any | null>([]);
    const [gender, setGender] = useState('male');
    const baseurl = process.env.REACT_APP_API_END_POINT;
    
    const addNewMemberToTree = async (values:any) => {
        setLoading(true);
        await axios.post(baseurl+'/new-member', {
            referral_id: values.referral_id,
            position_id: values.position_id,
            first_name: values.first_name,
            last_name: values.last_name,
            username: values.username,
            email: values.email,
            gender: values.gender,
            street_address: values.street_address,
            mobile: values.mobile,
            country: values.country,
            state: values.state,
            city: values.city,
            post_code: values.post_code,
            password: values.password,
            password_confirmation: values.password_confirmation,
            position:props?.emptyNodePosition
        })
        .then(function (response) {
            if(response.status === 201){
                dispatch(showAlert({
                    message: "New Member added",
                    messageType: 'success',
                    showAlertMessage: true
                }));
                props.setIsModal(false);
                props.setAddNewMember(true)
            }
        })
        .catch(function (error) {

            if(error.response.status == 422){

                if(!error.response){
                    dispatch(showAlert({
                        message: 'something went wrong',
                        messageType: 'error',
                        showAlertMessage: true
                    }));
                }else{

                    try{
                        if (error.response.data.message.email) {
                            dispatch(showAlert({
                                message: error.response.data.message.email,
                                messageType: 'error',
                                showAlertMessage: true
                            }));

                        }
                        if (error.response.data.message.first_name) {
                            dispatch(showAlert({
                                message: error.response.data.message.first_name,
                                messageType: 'error',
                                showAlertMessage: true
                            }));

                        }
                        if (error.response.data.message.username) {
                            dispatch(showAlert({
                                message: error.response.data.message.username,
                                messageType: 'error',
                                showAlertMessage: true
                            }));

                        }
                        if (error.response.data.message.password) {
                            dispatch(showAlert({
                                message: error.response.data.message.password,
                                messageType: 'error',
                                showAlertMessage: true
                            }));

                        }else if(error.response.status === 500){
                            dispatch(showAlert({
                                message: 'internal server error',
                                messageType: 'error',
                                showAlertMessage: true
                            }));
                        }
                    }catch(err){
                        // console.log(err ,'unable to handle error response');
                    }

                }
            }else {
                dispatch(showAlert({
                    message: 'something went wrong',
                    messageType: 'error',
                    showAlertMessage: true
                }));
            }

        })
        .then(()=>{
            setLoading(false);
        })

    }
  


    const handleChangeGenderRadioGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender((event.target as HTMLInputElement).value);
    };
       const getCountries = () =>{
		axios.get(baseurl+'/country_list')
			.then(function (response) {
				if(response.status === 200){
					setCountries(response.data.country)
				}
			})
			.catch(function (error){
				console.log(error);
			})
	}
	useEffect(()=>{
		getCountries();
	},[]);
    return (
        <Dialog className={classes.dialogWrapper} open={props.open} onClose={()=> props.setIsModal(false)} maxWidth="sm"  >
            <MFormik
                enableReinitialize="true"

                initialValues={{
                    referral_id: props.currentReferralId,
                    position_id: props.currentPositionId,
                    first_name: '',
                    last_name: '',
                    username: '',
                    email: '',
                    gender: 'male',
                    mobile: '',
                    street_address: '',
                    country: '',
                    state: '',
                    city: '',
                    post_code: '',
                    password: '',
                    password_confirmation: ''
                }}
                validationSchema={
                    Yup.object().shape({
                        first_name: Yup.string()
                            .min(1, 'min 1 character')
                            .max(20, 'max 20 characters')
                            .required('Required'),
                        last_name: Yup.string()
                            .min(1, 'min 1 character')
                            .max(20, 'max 20 characters')
                            .required('Required'),
                        username: Yup.string()
                            .min(3, 'min 3 character')
                            .max(20, 'max 20 character')
                            .required('Required'),
                            email: Yup.string()
                            .email("Email Format is invalid")
                            .matches(
                                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                , "Email Format is inValid")
                            .required("Email Field is required"),
                        gender: Yup.string().required(),
                        street_address: Yup.string().max(250, 'max 250 character').required('Shipping Address is required'),
                        country: Yup.string().required(),
                        state: Yup.string().required(),
                        city: Yup.string().required(),
                        post_code: Yup.string().required('zip code is required'),
                        mobile: Yup.string().required(),
                        password:Yup.string().required('Password is required').min(8).max(20),
                        password_confirmation:Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
                    })
                }
                onSubmit={(values: any, {resetForm}) => {
                    addNewMemberToTree(values).then(()=>{
                    })
                    .catch(err=>console.log(err))
                }}
            >
                {({ setFieldValue, errors,isValid }) => (
                    <MForm>
                        {/* {JSON.stringify(errors.country)} */}
                        <DialogTitle id="customized-dialog-title">Add Member</DialogTitle>
                            <DialogContent className={classes.dialogContent} dividers>
                                <MGrid container spacing={1}>
                                    <MGrid item lg={12}>
                                      <MBox mb={2} fontSize={"14px"}><Alert severity="info">While adding a new member let your sponsor know that this is not the start date. Your qualification date will start from your day of payment.</Alert></MBox>
                                    </MGrid>
                                    <MGrid item md={6} xs={12}>
                                        <MBox className="formFieldWrapper" mb={3}>
                                            <MTextField
                                                disabled={false}
                                                name="first_name"
                                                label="First Name"
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                placeholder="First Name"
                                                type="text"
                                                fullWidth
                                            />
                                        </MBox>
                                    </MGrid>
                                    <MGrid item md={6} xs={12}>
                                        <MBox className="formFieldWrapper" mb={3}>
                                            <MTextField
                                                disabled={false}
                                                name="last_name"
                                                label="last Name"
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                placeholder="Last Name"
                                                type="text"
                                                fullWidth
                                            />
                                        </MBox>
                                    </MGrid>
                                    <MGrid item md={6} xs={12}>
                                        <MBox className="formFieldWrapper" mb={3}>
                                            <MTextField
                                                disabled={false}
                                                name="username"
                                                label="Username"
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                placeholder="Username"
                                                type="text"
                                                fullWidth
                                            />
                                        </MBox>
                                    </MGrid>   
                                    <MGrid item md={6} xs={12}>
                                        <MBox className="formFieldWrapper" mb={3}>
                                            <MTextField
                                                disabled={false}
                                                name="email"
                                                label="Email"
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                placeholder="Email"
                                                type="email"
                                                fullWidth
                                            />
                                        </MBox>
                                    </MGrid>  
                                    <MGrid item md={6} xs={12} > 
                                        <MBox className="formFieldWrapper" mb={3}>
                                            <FormControl component="fieldset">
                                                <RadioGroup className={classes.gendergroup} row aria-label="position" name="position" value={gender} onChange={handleChangeGenderRadioGroup} defaultValue={gender}>
                                                    <FormControlLabel value="male" control={<Radio  color="primary" />} label="Male" />
                                                    <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                                                </RadioGroup>
                                            </FormControl>
                                        </MBox>
                                    </MGrid>  
                                    <MGrid item md={6} xs={12}>
                                        <MBox className="formFieldWrapper" mb={3}>
                                            <PhoneNumberInput
                                                isInternationalCode={true}
                                                setValue={setFieldValue}
                                                isFormik={true}
                                                component={MTextField}
                                            />
                                        </MBox>
                                    </MGrid>  
                                    <MGrid item xs={12}>
                                            <MBox className="formFieldWrapper" mb={3}>
                                                <MTextField
                                                    disabled={false}
                                                    name="street_address"
                                                    label="Shipping Address"
                                                    variant="outlined"
                                                    color="primary"
                                                    size="small"
                                                    placeholder="Shipping address"
                                                    type="text"
                                                    fullWidth
                                                    multiline
                                                    rows={3}
                                                />
                                            </MBox>
                                    </MGrid>  
                                    <MGrid item  md={6} xs={12} >
                                    {/* <MBox className="formFieldWrapper" mb={3}>
                                        <MTextField
                                            name="country"
                                            label="Country"
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            placeholder="Country"
                                            type="text"
                                            fullWidth
                                        /> */}
                                        {/* <CountryDropdown /> */}
                                    {/* </MBox> */}
                                     
                                        <MBox className="formFieldWrapper" mb={3}>
                                            <Autocomplete
                                                options={countries}
                                                getOptionLabel={(country:any) => country.country_name}
                                                autoHighlight
                                                onChange={(event, value) => setFieldValue('country',value.country_name)}
                                                renderInput={(params) => <TextField  {...params} label="Select Country"  size="small" variant="outlined" name="country" />}
                                            />
                                        </MBox>
                                     
                                </MGrid>  
                                    <MGrid item md={6} xs={12} >
                                        <MBox className="formFieldWrapper" mb={3}>
                                            <MTextField
                                                disabled={false}
                                                name="state"
                                                label="State"
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                placeholder="State"
                                                type="text"
                                                fullWidth
                                            />
                                        </MBox>
                                    </MGrid>  
                                    <MGrid item md={6} xs={12}>
                                            <MBox className="formFieldWrapper" mb={3}>
                                                <MTextField
                                                    disabled={false}
                                                    name="city"
                                                    label="City"
                                                    variant="outlined"
                                                    color="primary"
                                                    size="small"
                                                    placeholder="City"
                                                    type="text"
                                                    fullWidth
                                                />
                                            </MBox>
                                    </MGrid>  
                                    <MGrid item md={6} xs={12}>
                                            <MBox className="formFieldWrapper" mb={3}>
                                                <MTextField
                                                    disabled={false}
                                                    name="post_code"
                                                    label="Zip Code"
                                                    variant="outlined"
                                                    color="primary"
                                                    size="small"
                                                    placeholder="Zip Code"
                                                    type="text"
                                                    fullWidth
                                                />
                                            </MBox>
                                        </MGrid>  
                                    <MGrid item md={6} xs={12} >
                                            <MBox className="formFieldWrapper" mb={3}>
                                                <MTextField
                                                    disabled={false}
                                                    name="password"
                                                    label="Password"
                                                    variant="outlined"
                                                    color="primary"
                                                    size="small"
                                                    placeholder="Password"
                                                    type="password"
                                                    fullWidth
                                                />
                                            </MBox>
                                        </MGrid>  
                                    <MGrid item md={6} xs={12}>
                                            <MBox className="formFieldWrapper">
                                                <MTextField
                                                    disabled={false}
                                                    name="password_confirmation"
                                                    label="Confirm Password"
                                                    variant="outlined"
                                                    color="primary"
                                                    size="small"
                                                    placeholder="Confirm password"
                                                    type="password"
                                                    fullWidth
                                                />
                                            </MBox>
                                        </MGrid>  
                                </MGrid>
                            </DialogContent>
                            <DialogActions>
                                <MBox pt={1} pb={1} pr={2} display="flex" alignItems="center">
                                    <MBox mr={1}>
                                        <MButton href="#" className="LinkDanger" onClick={()=> props.setIsModal(false)}>Close</MButton>
                                    </MBox>
                                    {/*<MBox><MButton fullWidth color="primary" loading={loading} variant="contained" type="submit" >Submit</MButton></MBox>*/}
                                    <MBox><MButton fullWidth color="primary" loading={loading} variant="contained" type="submit" disabled={(loading===true) || (!isValid)}>Save</MButton></MBox>
                                </MBox>
                            </DialogActions>
                    </MForm>
            )}
        </MFormik>
        </Dialog>
    )
}
