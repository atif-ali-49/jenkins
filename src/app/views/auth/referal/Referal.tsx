import React, { useState,useEffect } from 'react';
import { Row,Col,Container } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {useHistory} from 'react-router-dom';
import './Referal.scss';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { setReferral, showAlert } from 'src/app/store';
import {useDispatch} from 'react-redux';

const ReferalSchema = Yup.object().shape({
    referal: Yup.string()
      .required('Referral Username Required '),
  });



const VerifyRef = () => {
        const { addToast } = useToasts();
        const history = useHistory();
        const dispatch = useDispatch();
        const baseurl = process.env.REACT_APP_API_END_POINT;
    //  declare this function for axios request to check referal
   const CheckReferal=(values:any)=>{

            if(values.referal.trim() == ''){
                dispatch(showAlert({
                    message: "Please type proper username",
                    messageType: 'error',
                    showAlertMessage: true
                }));
                return false;
            }

            axios.post(baseurl+'/check_username_exit', {
                username: values.referal,
            })
          .then(function (response) {
              // for redirect to Login after success
            if(response.status === 200 && response.data.message){
                localStorage.removeItem('access_token');
                localStorage.removeItem('cart');
                dispatch(setReferral(values.referal));
                dispatch(showAlert({
                    message: "Referral Matched",
                    messageType: 'success',
                    showAlertMessage: true
                }));
                history.push(`/register/${response.data.message}`)
            }

          })
          .catch(function (error) {
              if(!error.response){
                dispatch(showAlert({
                    message: 'something went wrong',
                    messageType: 'error',
                    showAlertMessage: true
                }));
              }else{
                if (error.response.status === 400) {

                    if(error.response.data.message.username){
                        dispatch(showAlert({
                            message: error.response.data.message.username[0],
                            messageType: 'error',
                            showAlertMessage: true
                        }));
                    }else{
                        dispatch(showAlert({
                            message: error.response.data.message,
                            messageType: 'error',
                            showAlertMessage: true
                        }));
                    }
                    
                  }else{
                      dispatch(showAlert({
                        message: 'something went wrong',
                        messageType: 'error',
                        showAlertMessage: true
                    }));
                  }
              }
          });

   }
    
    return( 
        <section id="referal">
        <Container>
           
            <Row className="align-items-center mt-5 border no-gutter">
            <Col md={7}>
            <h1 className="text-center my-5">Enter Your Referral</h1> 
                <Formik
                    initialValues={{
                        referal: ''
                    }}
                    validationSchema={ReferalSchema}
                    onSubmit={async (values) => {
                      //  declare this function for axios request to check referal
                        CheckReferal(values);
                      
                    }}
                >
                    {({ submitForm, errors, touched }) => (
                        <Form className="d-flex flex-column">
                            <Field className="p-3" name="referal" placeholder="Referral Username" />
                            <div className="text-danger text-center"> <b>{errors.referal && touched.referal ? errors.referal : null }</b> </div>
                            <button className="btn primaryButton mx-auto d-block my-30" type="submit">Check Now</button>
                           
                        </Form>
                    )}
                </Formik>
                </Col>
                <Col md={5}>
                    <div className="referal-img faq_mobile">
                     <img className="img-fluid float-right"  src={'img/ref.svg'}></img>
                    </div>
                </Col>
            </Row>
            </Container>
        </section>
       
    )
}

export default VerifyRef;	