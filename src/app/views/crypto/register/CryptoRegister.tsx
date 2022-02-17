import React, { useState,useEffect } from 'react';
import { Row,Col,Container,Image } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import {useHistory} from 'react-router-dom'
import * as Yup from 'yup';
import './CryptoRegister.scss';
import { useToasts } from 'react-toast-notifications';
import {IoIosArrowRoundBack} from 'react-icons/io';
import {BsFillForwardFill} from 'react-icons/bs';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCurrentUserData } from '../../../store';
import { setReferral, showAlert } from 'src/app/store';
import PhoneNumberInput from 'src/app/components/third-party/phone-number-input/PhoneNumberInput';
import { useSelector } from 'react-redux';
  function CryptoRegistration(props:any) {
    const dispatch = useDispatch();
      const[formswitcher,FormSwitcher]=useState(false);
      // for get value of refferal
      const[refferal,Setreferal]=useState<any | null>(null);
      const[refferal_d,SetreferalId]=useState<any | null>(null);
      const[countries,setCountries] = useState<any | null>([]);
      // const[gender,setGender] = useState('');
      const baseurl = process.env.REACT_APP_API_END_POINT;
      useEffect(()=>{

       
          const rName = sessionStorage.getItem('rName');
          const referal  =  sessionStorage.getItem('message');
          if(rName && referal){
               rName ? Setreferal(rName):Setreferal(null);
              referal ? SetreferalId(referal):SetreferalId(null);
          }
          })

        //   useEffect for get country list 
        useEffect(()=>{
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
        },[])

      const ReferalSchema = Yup.object().shape({
          referal:refferal ? Yup.string():Yup.string()
              .min(2, 'Too Short!')
              .max(50, 'Too Long!')
              .required('Required'),

          firstName: Yup.string()
              .min(2, 'Too Short!')
              .max(50, 'Too Long!')
              .required('Required'),

          lastName: Yup.string()
              .min(2, 'Too Short!')
              .max(50, 'Too Long!')
              .required('Required'),

          userName: Yup.string()
              .min(2, 'Too Short!')
              .max(50, 'Too Long!')
              .required('Required'),

          email: Yup.string()
              .min(2, 'Too Short!')
              .max(50, 'Too Long!')
              .required('Required'),
          password:Yup.string().required('Password is required').min(8,'Password at least have 8 characters').max(20,'Password Maximum have 20 characters'),
          confrim_password:Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),

          street_1:formswitcher ? Yup.string().required('Address is required'):Yup.string(),
          street_2:formswitcher ? Yup.string():Yup.string(),
          city:formswitcher ? Yup.string().required('City is required'):Yup.string(),
          state:formswitcher ? Yup.string().required('State is required'):Yup.string(),
          zip_code:formswitcher ? Yup.string().required('Zip Code is required'):Yup.string(),
          country:formswitcher ? Yup.string().required('Country is required'):Yup.string(),
          mobile:formswitcher ? Yup.string().required('Country is required'):Yup.string(),

      });
      const { addToast } = useToasts();
      const history = useHistory();
      
      const NextStep = () =>
    {
        FormSwitcher (true)
    }
    const PreviousStep =()=>{
        FormSwitcher (false)
    }

    //    for test git
       const getRegisterData = async (data:any)=>{
           if(!data.gender){
                console.log('CONSOLE IN CRYPTO REGISTER');
           }else{
               await axios.post(baseurl+'/register', {
                   headers: {
                       'Access-Control-Allow-Origin': '*',
                       'Accept': '/',
                       'Content-type': 'application/json',
                   },
                   first_name: data.firstName,
                   referrer_id:refferal_d,
                   last_name:data.lastName,
                   username: data.userName,
                   gender:data.gender,
                   email:data.email,
                   password:data.password,
                   password_confirmation:data.confrim_password,
                   street_address:data.street_1,
                   city:data.city,
                   state:data.state,
                   country:data.country,
                   post_code:data.zip_code,
                   mobile:data.mobile,
               },)
                   .then(function (response) {

                       if(response.data.message && response.status == 200){

                           try{
                               localStorage.setItem("access_token",response.data.message);
                               sessionStorage.removeItem('rName');
                               const paidStats = localStorage.setItem('paid_status', response.data.user.paid_status);
                               const cyptoStatus = localStorage.setItem('cyptoStatus', '1');
                           }
                           catch(error){
                               console.log('localStorage in register',error)
                           }
                           dispatch(setCurrentUserData(response.data.user))
                           if(localStorage.getItem('access_token' ||' {}')){
                               // history.push('/client/checkout');
                               // window.location.reload();

                           }
                           dispatch(showAlert({
                               message: "You Registered Successfully",
                               messageType: 'success',
                               showAlertMessage: true
                           }));
                       }

                   })
                   .catch(function (error) {
                       console.log(error,'text error');
                       if(!error.response){
                           dispatch(showAlert({
                               message: 'something went wrong',
                               messageType: 'error',
                               showAlertMessage: true
                           }));
                       }else{

                           try{
                               if (error.response.data.message) {
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
                               }else if(error.response.statue === 500){
                                   dispatch(showAlert({
                                       message: 'something went wrong',
                                       messageType: 'error',
                                       showAlertMessage: true
                                   }));
                               }
                           }catch(err){
                               console.log('unable to handle error response');
                           }

                       }




                   });
           }


    }

      const [checkreferal, setReferal] = useState(null)


    return (
        <section id="registration" className="section">
            
        <Container>
            <Row className="m-0 justify-content-center">
            <Col md={3} className="regis-left">
             <h3 className="text-center my-2">Welcome to</h3>
             <Image src="https://media.peacecoin.io/logo.png" className="my-3" fluid/>
             <Image src="https://media.peacecoin.io/peace-coin-150.gif" className='mx-auto d-block mt-5 pt-5' fluid/>
            </Col>
            <Col md={9} className="regis-right">
            <h3 className="text-center mt-2">Create Account</h3>
            <div className="text-center mt-5">
                <span className={`text-light step1 ${!formswitcher? 'active' : ''}`}>Step 1</span> 
                <span className={`text-light step2 ${formswitcher? 'active' : ''}`}>Step 2</span>
            </div>
                <Formik
                    initialValues={{
                        referal: '',
                        firstName: '',
                        lastName: '',
                        userName: '',
                        email:'',
                        password: '',
                        confrim_password: '',
                        street_1:'',
                        street_2:'',
                        country:'',
                        city:'',
                        state:'',
                        zip_code:'',
                        mobile:'',
                        gender:'male'

                    }}
                    validationSchema={ReferalSchema}
                    onSubmit={values => {
                        getRegisterData(values)

                    }}
                >
                    {({dirty, submitForm, errors, touched , validateForm, values,isValidating,isValid ,setFieldValue}) => (
                        <Form className="">

                        <Row className={" " +(formswitcher ? 'd-none':'') }>

                        <Col lg={12} className={"col-auto"}>
                            <Field
                                placeholder="Referral Name"
                                name="referal"
                                value={refferal && refferal}
                                className={" " + (refferal ? 'readonly':'')}
                            />
                            <div className="text-danger"> <b>{errors.referal && touched.referal ? errors.referal : null }</b> </div>
                        </Col>
                         
                        
                        <Col lg={6}>
                            <Field placeholder="First Name" name="firstName" />
                            <div className="text-danger"> <b>{errors.firstName && touched.firstName ? errors.firstName : null }</b> </div>
                        </Col>  
                        <Col lg={6}>
                            <Field placeholder="Last Name" name="lastName" />
                            <div className="text-danger"> <b>{errors.lastName && touched.lastName ? errors.lastName : null } </b></div>
                        </Col>  
                        <Col lg={6}>
                            <Field placeholder="Username" name="userName" />
                            
                            <div className="text-danger"> <b>{errors.userName && touched.userName ? errors.userName : null } </b></div>
                        </Col>  
                        <Col lg={6}>
                            <Field placeholder="Email" name="email"  />
                            
                            <div className='text-danger'> <b>{errors.email && touched.email ? errors.email : null } </b></div>
                        </Col>  
                        <Col lg={6}>
                            <Field placeholder="Password" name="password" type="password"/>
                            
                            <div className="text-danger"> <b>{errors.password && touched.password ? errors.password : null }</b> </div>
                        </Col>  
                        <Col lg={6}>
                            <Field placeholder="Confirm Password" name="confrim_password" type="password" />
                            
                            <div className="text-danger"> <b>{errors.confrim_password && touched.confrim_password ? errors.confrim_password : null }</b> </div>
                        </Col>
                            <Col lg={6}>
                                <div id="my-radio-group" className="f-16 font-weight-normal"></div>
                                <div role="group" aria-labelledby="my-radio-group">
                                    <label className="font-weight-lighter f-12">
                                        <Field type="radio" className="radioButton" name="gender"  value="male" />
                                        Male
                                    </label>
                                    <label className="ml-4 font-weight-lighter f-12">
                                        <Field type="radio" className="radioButton" name="gender" value="female" />
                                        Female
                                    </label>
                                    {/*<label className="ml-4 font-weight-lighter f-12">*/}
                                    {/*    <Field type="radio" className="radioButton" name="gender" value="other" />*/}
                                    {/*    Other*/}
                                    {/*</label>*/}
                                </div>

                            </Col>
                        {/*Next Button for go ahead*/}
                        <Col lg={12}>
                         <button
                            className="btn primaryButton mx-auto  my-30"
                            onClick={NextStep}
                             type="button" disabled={!(isValid && dirty)}>Next Step
                            <BsFillForwardFill/>
                         </button>
                        </Col>  
                     
                        </Row>


                               <div className={" "+(formswitcher ? 'd-block':'d-none')}>
                                <Row>

                                    <Col lg={12}><Field placeholder="Street Address one" name="street_1" /></Col>
                                    <div className="text-danger"> <b>{errors.street_1 && touched.street_1 ? errors.street_1 : null }</b> </div>
                                    <Col lg={12}><Field placeholder="Street Address Two (Optional)" name="street_2" /></Col>
                                    <div className="text-danger"> <b>{errors.street_2 && touched.street_2 ? errors.street_2 : null }</b> </div>
                                    <Col lg={6}>
                                        <Field name="country" className="countryselect" as="select">
                                          <option value="">Select Country </option>
                                          {
                                            countries.length ? 

                                              countries.map((country, index) => (
                                                <option key={country.id} value={country.country_name}>
                                                  {country.country_name}
                                                </option>
                                              ))
                                              :'Loading.........'
                                          }
                                       </Field>
                                        <div className="text-danger"> <b>{errors.country && touched.country ? errors.country : null }</b> </div>
                                    </Col>
                                    <Col lg={6}><Field placeholder="City" name="city" />
                                        <div className="text-danger"> <b>{errors.city && touched.city ? errors.city : null }</b> </div>
                                    </Col>
                                    <Col lg={6} className="mt-10 phnField">
                                        <PhoneNumberInput
                                            isInternationalCode={true}
                                            setValue={setFieldValue}
                                            isFormik={true}
                                        />
                                        {/* <small  className={'text-danger' +' '+ (!phoneHandler ? 'd-none' : '') }><b>Mobile number is required</b></small> */}
                                    </Col>
                                    <Col lg={6}><Field placeholder="State Province" name="state"/>
                                        <div className="text-danger"> <b>{errors.state && touched.state ? errors.state : null }</b> </div>

                                    </Col>

                                    <Col lg={6}><Field placeholder="Zip Code" name="zip_code" />
                                        <div className="text-danger"> <b>{errors.zip_code && touched.zip_code ? errors.zip_code : null }</b> </div>
                                    </Col>


                                </Row>
                                   <Row>
                                       <Col lg={6}><button className="btn primaryButton my-30 mx-auto"  type="button" onClick={PreviousStep}><IoIosArrowRoundBack/>Previous Step</button></Col>
                                       <Col lg={6}><button className="btn primaryButton my-30 mx-auto d-block d-inline" type="submit" disabled={!(isValid)}>Register</button></Col>
                                   </Row>
                               </div>
                        </Form>
                    )}
                </Formik>
                </Col>
            </Row>
            </Container>
        </section>

    )
}

export default CryptoRegistration
