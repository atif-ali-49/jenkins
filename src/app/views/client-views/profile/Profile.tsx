import DateFnsUtils from '@date-io/date-fns';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {BsPaperclip} from 'react-icons/bs'
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import React, { createRef, useEffect, useState } from 'react';
import {MBox, MTypography, MForm, MFormik, MTextField, MButton} from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import { MCircularProgress } from 'src/app/components/mui';

import PhoneNumberInput from 'src/app/components/third-party/phone-number-input/PhoneNumberInput';
import useStyles from './ProfileStyles';
import * as Yup from "yup";
import AlertDialog from './W9UploadDialog'
import axios from 'axios';
import {useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { setCurrentUserData } from '../../../store';
import {useDispatch} from 'react-redux';
import { showAlert } from "src/app/store";
import moment from "moment";
import {AiOutlineFolderOpen} from 'react-icons/ai'

    interface TabPanelProps {
        children?: React.ReactNode;
        index: any;
        value: any;
        className:any;
    }
  
  function TabPanel(props: TabPanelProps) {
     
      const UserData = useSelector((store: any) => store?.auth?.currentUser);
      const { children, className, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <MBox p={3}>
            <MTypography>{children}</MTypography>
          </MBox>
        )}
      </div>
    );
  }
  
  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function Profile(props:any) {
    const UserData = useSelector((store: any) => store?.auth?.currentUser);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const  history = useHistory();
    const [gender, setGender] = useState(UserData?.gender!==null ? UserData?.gender : 'male');
    const { addToast } = useToasts();
    const [profileSrc, setProfileSrc] = React.useState('');
    const [profileImgObj, setProfileImgObj] = React.useState<any>({});
    const [w9PdfObj, setW9PdfObj] = React.useState<any>({});
    const [openW9UploadModal, setOpenW9UploadModal] = React.useState(false);
    const baseUrl = process.env.REACT_APP_API_END_POINT;
    const [dob, setDob] = useState(UserData.birth_day ? UserData.birth_day : new Date());
    const[loading, setLoading]= useState(false);

    const handleChange_picker =  (date) => {
        // alert( moment(date).format("YYYY-MM-DD") )
       // setDob((moment(date).format("YYYY-MM-DD")));

        setDob(date);

    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {setValue(newValue)};
    
  const uploadW9Form = async ()=> {
    setLoading(true);
    let formData = new FormData();
    if(Object.keys(w9PdfObj).length === 0 && w9PdfObj.constructor === Object){
        dispatch(showAlert({
            message: "W9 Form pdf is required",
            messageType: 'error',
            showAlertMessage: true
        }));
    }else{
        formData.append('pdf',  w9PdfObj)
    }
    axios({
        method: "post",
        url: baseUrl+'/w9form',
        data: formData,
        headers: { 'content-type': 'multipart/form-data' }
    })
    .then((res)=>{
        if(res.status === 200){
            setOpenW9UploadModal(false);
            dispatch(showAlert({
                message: "W9 form uploaded successfully",
                messageType: 'success',
                showAlertMessage: true
            }));
        }
    })
    .catch(function (err) {
        console.log(err);
    })
    .then(()=> setLoading(false))
  }

    const handleChangeGenderRadioGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender((event.target as HTMLInputElement).value);
    };


    return (
        <div>
            <MBox  className="pageHeader">
				<MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Profile Edit</MTypography>
				<RouterBreadcrumbs />
            </MBox>   
            <MBox className="contentBox" component={Paper}>
                <Tabs value={value} className={classes.tabs} onChange={handleChange} aria-label="simple tabs example" indicatorColor="primary" textColor="primary">
                    <Tab label="Profile Settings" {...a11yProps(0)} />
                    <Tab label="Change Password" {...a11yProps(1)} />
                    <Tab label="W9 Form" {...a11yProps(2)} />
                </Tabs>
                <TabPanel className={classes.tabspanel}  value={value} index={0}>
                    <>
                        <MFormik
                            // enableReinitialize="true"
                        
                            initialValues={{
                                first_name:UserData?.first_name,
                                last_name:UserData?.last_name,
                                email:UserData?.email,
                                mobile: UserData?.mobile ? UserData?.mobile :8752,
                                tax_id:UserData?.tax_id?UserData?.tax_id: '',
                                birth_day: UserData?.birth_day? dob:'',
                                beneficiary:UserData?.beneficiary ? UserData.beneficiary :'',
                                company:UserData?.company?UserData.company:'',
                                state:UserData?.state,
                                city:UserData?.city? UserData.city:'',
                                country:UserData?.country?UserData.country:'',
                                post_code:UserData?.post_code?UserData.post_code:'',
                                street_address:UserData?.street_address?UserData.street_address: '',
                                gender: UserData?.gender!==null ? UserData?.gender:gender,
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    first_name:Yup.string().required('First Name is required').max(20,'max 20 characters'),
                                    last_name:Yup.string().required('Last Name is required').max(20,'max 20 characters'),
                                    // email:Yup.string().required('Email is required'),
                                    mobile:Yup.string().required('Mobile is required'),
                                    birth_day: Yup.string(),
                                    tax_id:Yup.string().required('tax id is required'),
                                    beneficiary:Yup.string().required('Beneficiary is required'),
                                    company:Yup.string(),
                                    country:Yup.string().required('Country is required'),
                                    city:Yup.string().required('City is required'),
                                    state:Yup.string().required('State is required'),
                                    post_code:Yup.string().required('Postal Code is required'),
                                    gender:Yup.string().required(),
                                    street_address:Yup.string().required('Street Address is required'),

                                })
                            }
                            onSubmit={(values: any) => {
                                setLoading(true);
                                let formData = new FormData();
                                formData.append('first_name',values.first_name);
                                formData.append('last_name',values.last_name);
                                formData.append('email',values.email);
                                formData.append('mobile',values?.mobile);
                                formData.append('gender', gender);
                                formData.append('tax_id',values.tax_id);
                                formData.append('birth_day', moment(dob).format("YYYY-MM-DD") );
                                formData.append('beneficiary',values.beneficiary ? values.beneficiary :'');
                                formData.append('company',values.company);
                                formData.append('country',values.country);
                                formData.append('city',values.city);
                                formData.append('state',values.state);
                                formData.append('post_code',values.post_code);
                                formData.append('street_address',values.street_address);

                                if(Object.keys(profileImgObj).length === 0 && profileImgObj.constructor === Object){
                                    formData.append('profile_image',  '')
                                }else{
                                    formData.append('profile_image',  profileImgObj)
                                }
                                axios({
                                    method: "post",
                                    url: baseUrl+'/profile_update/' + UserData?.id,
                                    data: formData,
                                    headers: { 'content-type': 'multipart/form-data' }
                                })
                                .then(function (response){
                                    if(response.status === 200){
                                    dispatch(setCurrentUserData(response.data.user))
                                        history.push('/client/user/profile');
                                        dispatch(showAlert({
                                            message: "Profile Update Successfully",
                                            messageType: 'success',
                                            showAlertMessage: true
                                        }));
                                    }
                                })
                                .catch(function (error) {
                                    if(error){
                                        dispatch(showAlert({
                                            message: "Something Went Wrong.",
                                            messageType: 'error',
                                            showAlertMessage: true
                                        }));
                                    }
                                    console.log(error);
                                })
                                .then(()=>{
                                    setLoading(false);
                                })
                            }}
                        >
                            {({errors, setFieldValue, values, touched, isValid}) => (
                                
                            <MForm noValidate autoComplete="off">
                                <Grid container justify="center">
                                    <Grid item lg={8} md={12}>
                                        <MBox align="center" my={3} >                
                                            {
                                                profileSrc !== '' ?
                                                <Avatar alt="Remy Sharp" src={profileSrc} className={classes.avatarStyle} />
                                                :
                                                <Avatar alt="Remy Sharp"  src={UserData?.path ? UserData?.path  :"/img/client-dashboard/avatar.jpg"} className={classes.avatarStyle} />
                                            }
                                            <MBox  mt={2}>
                                                <MTypography  gutterBottom component="h5" color="primary" variant="h6">{UserData?.username}</MTypography>
                                            </MBox>               
                                            {/*<MTypography  gutterBottom component="h5" color="secondary" className={classes.smallDetailsAvatar} variant="body2"></MTypography>*/}
                                            {/*<MTypography  gutterBottom component="h5" color="secondary" className={classes.smallDetailsAvatar} variant="body2">Member Since Feb 10, 2021</MTypography>*/}
                                             
                                            <MBox display="flex" justifyContent="center">
                                                <MButton className={classes.uploadBtn} variant="contained" color="primary" component="label" size="small">
                                                    Upload File
                                                    <input  type="file" hidden 
                                                        accept="image/png, image/jpeg"
                                                        onChange={(event: any) => {
                                                            let fileObj = event.currentTarget.files[0];
                                                            if(typeof fileObj  !== 'undefined' && typeof fileObj  !== null){
                                                                let fileType =  fileObj['type'];
                                                                if(fileType.includes("jpeg") || fileType.includes("jpg") || fileType.includes("png") || fileType === "jpeg" || fileType === "jpg") {
                                                                    setProfileImgObj(event.currentTarget.files[0]);
                                                                    setProfileSrc(event.target.files[0] && URL.createObjectURL(event.target.files[0]));
                                                                }else{
                                                                    dispatch(showAlert({
                                                                        message: "You can choose only jpg or png image",
                                                                        messageType: 'error',
                                                                        showAlertMessage: true
                                                                    }));
                                                                }
                                                            }
                                                        }}
                                                        />
                                                </MButton>                                             
                                            </MBox> 
                                        </MBox>  
                                    </Grid>
                                    <Grid item lg={8}>
                                        <Grid item lg={6} md={12}>
                                            <MTypography  gutterBottom component="h1" variant="h6">Basic Info</MTypography>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item lg={6} xs={12}>
                                                <MBox className="formFieldWrapper" mb={1}>
                                                    <MTextField id="outlined-basic" size="small" fullWidth label="First Name *" variant="outlined"  name='first_name' />
                                                </MBox>
                                            </Grid>
                                            <Grid item lg={6} xs={12}>
                                                <MBox className="formFieldWrapper" mb={1}>
                                                    <MTextField id="outlined-basic" size="small" fullWidth label="Last Name *" variant="outlined" name="last_name"/>
                                                </MBox>
                                            </Grid>
                                            <Grid item lg={6} xs={12}>
                                                <MBox className="formFieldWrapper" mb={1}>
                                                    <MTextField id="outlined-basic"  size="small" value={UserData.email} fullWidth label="Email *" variant="outlined" name='email' disabled/>
                                                </MBox>
                                            </Grid>
                                            <Grid item lg={6} xs={12}>
                                                <MBox className="formFieldWrapper" mb={1}>
                                                     <PhoneNumberInput
                                                        isInternationalCode={true}
                                                        setValue={setFieldValue}
                                                        isFormik={true}
                                                        component={MTextField}
                                                        name="mobile"
                                                        value={UserData?.mobile ? UserData?.mobile :'+1' }
                                                        isInvalid={ errors.mobile === undefined ? false : true}
                                                    />
                                                </MBox>
                                            </Grid>
                                            
                                            <Grid item lg={6} xs={12}>
                                                <MBox className="formFieldWrapper" mb={1}>  
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <small>Date of Birth *</small>
                                                        <KeyboardDatePicker
                                                            // disableToolbar

                                                            inputVariant="outlined"
                                                            emptyLabel="dd/MM/yyyy"
                                                            size="small"
                                                            format="dd/MM/yyyy"
                                                            fullWidth
                                                            id="date-picker-inline"

                                                            value={dob}
                                                            disableFuture={true}
                                                            InputProps={{ readOnly: true }}
                                                            maxDateMessage={'Future date is not allowed'}
                                                            onChange={
                                                                (val)=> handleChange_picker(val)

                                                            }
                                                            KeyboardButtonProps={{
                                                                'aria-label': 'change date',
                                                            }}
                                                            name='birth_day'
                                                        />

                                                    </MuiPickersUtilsProvider>
                                                    {errors.birth_day && touched.birth_day ? (
                                                        <div className="LinkDanger Mui-error">{errors.birth_day}</div>
                                                    ): ''}
                                                </MBox>
                                            </Grid>
                                            <Grid item lg={6} xs={12}>

                                                <MBox className="formFieldWrapper" mt={3}>
                                                    <MTextField size="small" id="outlined-basic" fullWidth label="Tax ID/SSN *" variant="outlined" name='tax_id' />
                                                </MBox>
                                            </Grid>
                                            <Grid item lg={6} xs={12}>
                                                <MBox className="formFieldWrapper" mb={1}>
                                                    <MTextField size="small" id="outlined-basic" fullWidth label="Beneficiary *"  variant="outlined" name='beneficiary' />
                                                </MBox>
                                            </Grid>
                                            <Grid item lg={6} xs={12}>
                                                <MBox className="formFieldWrapper" mb={1}>
                                                    <MTextField size="small" id="outlined-basic" fullWidth label="Company"  variant="outlined" name='company' />
                                                </MBox>
                                            </Grid>
                                            <Grid item lg={6} xs={12}>
                                                <MBox className="formFieldWrapper" mb={3}>
                                                    <FormControl component="fieldset">
                                                        <RadioGroup  row aria-label="gender *" name="gender" value={gender} onChange={handleChangeGenderRadioGroup} defaultValue={gender}>
                                                            <FormControlLabel value="male" control={<Radio  color="primary" />} label="Male" />
                                                            <FormControlLabel value="female" control={<Radio  color="primary" />} label="Female" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </MBox>
                                            </Grid>
                                        </Grid>
                                        <MBox mt={1} mb={3}>
                                            <hr/>
                                        </MBox>
                                        <MBox mt={2}>
                                            <MTypography className="mainHeading" gutterBottom component="h1" variant="h6">Shipping Address</MTypography>
                                        </MBox>
                                        <Grid container spacing={2}>
                                            <Grid item lg={6} xs={12}>
                                                <MBox className="formFieldWrapper" mb={1}>
                                                    <MTextField size="small" fullWidth label="Street Address One *" variant="outlined"  name='street_address' />
                                                </MBox>
                                            </Grid>
                                            <Grid item lg={6} xs={12}>
                                                <MBox className="formFieldWrapper" mb={1}>
                                                    <MTextField size="small" fullWidth label="Street Address Two (Optional)" variant="outlined"  name="street_address2" />
                                                </MBox>
                                            </Grid>
                                            <Grid item lg={6} xs={12}>
                                                <MBox className="formFieldWrapper" mb={1}>
                                                    <MTextField size="small" fullWidth label="Zip Code *" variant="outlined"  name="post_code" />
                                                </MBox>
                                            </Grid> 
                                            <Grid item lg={6} xs={12}>
                                                <MBox className="formFieldWrapper" mb={1}>
                                                    <MTextField size="small" fullWidth label="Country *" variant="outlined"  name="country"/>
                                                </MBox>
                                            </Grid>
                                            <Grid item lg={6} xs={12}>
                                                <MBox className="formFieldWrapper" mb={1}>
                                                    <MTextField size="small" fullWidth label="City *" variant="outlined"  name="city"/>
                                                </MBox>
                                            </Grid>
                                            <Grid item lg={6} xs={12}>
                                                <MBox className="formFieldWrapper" mb={1}>
                                                    <MTextField size="small" fullWidth label="state *" variant="outlined" name="state"/>
                                                </MBox>
                                            </Grid>
                                            <Grid item lg={6}>
                                                <MButton fullWidth color="primary" loading={loading} variant="contained" type="submit">Update Profile</MButton>
                                            </Grid>
                                        </Grid>
                                </Grid>
                                </Grid>
                            </MForm>
                            )}
                        </MFormik>
                    </>
                </TabPanel>

                <TabPanel className={classes.tabs} value={value} index={1}>
                    <Grid container spacing={2} justify="center">
                        <Grid item lg={6}>
                            <MFormik
                                enableReinitialize="true"
                                initialValues={{
                                    old_password:'',
                                    password:'',
                                    confirm_password:"",
                                }}
                                validationSchema={
                                    Yup.object().shape({
                                        old_password:Yup.string().required('Old Password is required').min(8,'Password at least have 8 characters').max(20,'Password Maximum have 20 characters'),
                                        password:Yup.string().required('Password is required').min(8,'Password at least have 8 characters').max(20,'Password Maximum have 20 characters'),
                                        confirm_password:Yup.string().oneOf([Yup.ref('password')], 'Password and Confirm Password MisMatch'),
                                    })
                                }
                                onSubmit={(values: any) => {
                                    setLoading(true);
                                    axios.put(baseUrl+'/reset_password/'+UserData?.id, {
                                        old_password:values.old_password,
                                        password:values.password,
                                        password_confirmation:values.confirm_password,
                                        // id:UserData.id ? UserData.id : '',
                                    })
                                    .then(function (response) {
                                        if(response.status === 200){
                                            localStorage.removeItem("access_token");
                                            history.push('/referal');
                                            addToast('Password Changed Successfully...', { appearance: 'success', autoDismiss: true, PlacementType: 'bottom-left'})
                                        }
                                    })
                                    .catch(function (error) {
                                        if(error.response.status === 404){
                                            addToast('Something Went Wrong', { appearance: 'error', autoDismiss: true, PlacementType: 'bottom-left'})
                                        }
                                    })
                                    .then(()=>{
                                        setLoading(false);
                                    })
                                }}
                            >
                                {({setFieldValue}) => (
                                    <MForm>
                                        <MBox mb={3} className="formFieldWrapper">
                                            <MTextField size="small" id="outlined-basic" fullWidth label="Old Password" variant="outlined" type='password' name="old_password" />
                                        </MBox>
                                        <MBox mb={3} className="formFieldWrapper">
                                            <MTextField size="small" id="outlined-basic" fullWidth label="New Password" variant="outlined" type='password' name='password' />
                                        </MBox>
                                        <MBox mb={3} className="formFieldWrapper">
                                            <MTextField size="small" id="outlined-basic" fullWidth label="Confirm Password" variant="outlined" type='password' name='confirm_password' />
                                        </MBox>
                                        <MBox>
                                            <MButton fullWidth color="primary" variant="contained" type="submit" loading={loading} disabled={loading}>Submit</MButton>
                                        </MBox>
                                    </MForm>
                                )}
                            </MFormik>
                        </Grid>
                    </Grid> 
                </TabPanel>
                <TabPanel className={classes.tabspanel}  value={value} index={2}>
                    <MBox>
                        <MBox>
                            <MButton variant="outlined"  className={'btnSmall'} color="secondary" size="small" href="https://media.peacecoin.io/fw9.pdf">Download w9 form </MButton>
                        </MBox>
                        <MBox mt={3}>
                            <MBox mb={1}>Please upload filled w9 form here.</MBox>
                            <MButton variant="contained" onClick={()=>setOpenW9UploadModal(true)} className={'btnSmall'} color="primary" size="small" >Upload w9 form </MButton>
                        </MBox>
                     </MBox>

                        <Dialog
                            open={openW9UploadModal}
                            onClose={()=>setOpenW9UploadModal(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            className={classes.dialogBoxContainer}>
                            <DialogTitle id="alert-dialog-title">{"W9 Form"}</DialogTitle>
                            <DialogContent dividers>
                                <DialogContentText className={classes.contentTitle}>Upload your signed W9 form</DialogContentText>
                                <DialogContentText component="label" className={classes.dottedBorderContainer} id="alert-dialog-description">                                    
                                    <AiOutlineFolderOpen fontSize="20px" />
                                    <span className={classes.spanText}>
                                    {
                                        Object.keys(w9PdfObj).length === 0 && w9PdfObj.constructor === Object ?
                                        'Please click here to upload file'
                                        :
                                        w9PdfObj['name']
                                    }
                                    </span>
                                    <input type="file" hidden
                                        accept="application/pdf"
                                        onChange={(event: any) => {
                                            let fileObj = event.currentTarget.files[0];
                                            if(typeof fileObj  !== 'undefined' && typeof fileObj  !== null){
                                                let fileType =  fileObj['type'];
                                                console.log('typo', fileObj)
                                                if(fileType.includes("pdf")){
                                                    setW9PdfObj(event.currentTarget.files[0]);
                                                }else{
                                                    dispatch(showAlert({
                                                        message: "You can choose only pdf file",
                                                        messageType: 'error',
                                                        showAlertMessage: true
                                                    }));
                                                }
                                            }
                                        }}
                                    />
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <MButton onClick={()=>setOpenW9UploadModal(false)} size="small" color="secondary">Close</MButton>
                                <MButton onClick={uploadW9Form} size="small" color="primary" variant="contained" type="submit" loading={loading} disabled={(loading) || (Object.keys(w9PdfObj).length === 0 && w9PdfObj.constructor === Object)}>Upload</MButton>
                            </DialogActions>
                    </Dialog>
                </TabPanel>
            </MBox>
        </div>
    )
}

export default Profile;