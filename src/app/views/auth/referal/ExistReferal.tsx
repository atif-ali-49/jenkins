import React, { useEffect } from 'react';
import { Row,Col,Container } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Referal.scss';
import { setReferral,showAlert } from "src/app/store";


const ReferalSchema = Yup.object().shape({
referal: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Referral Username Required '),
});
const baseurl = process.env.REACT_APP_API_END_POINT;
function ExistReferal(props:any) {
    const history = useHistory();
    const dispatch = useDispatch();

    const CheckReferal=(values:any)=>{

        axios.post(baseurl + '/check_username_exit', {
            username: values.referal,

              })
              .then(function (response) {
                  if(response.status === 200 && response.data.message){
                      localStorage.removeItem('access_token');
                      localStorage.removeItem('cart');
                      dispatch(setReferral(values.referal));
                      history.push(`/login`)
                        dispatch(showAlert({
                            message: "Referral Matched",
                            messageType: 'success',
                            showAlertMessage: true
                        }));
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
                    dispatch(showAlert({
                        message: error.response.data.message,
                        messageType: 'error',
                        showAlertMessage: true
                    }));
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
    return (
        <section id="referal">
        <Container>
           
            <Row className="align-items-center mt-5 border no-gutter">
            <Col md={7}>
            <h1 className="text-center my-5">Enter Your Username</h1> 
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
                            <Field className="p-3" name="referal" placeholder="Username" />
                            
                            <div className="text-danger text-center"> <b>{errors.referal && touched.referal ? errors.referal : null }</b> </div>
                            <button className="btn primaryButton mx-auto d-block my-30" type="submit">Check Now</button>                           
                        </Form>
                    )}
                </Formik>
                </Col>
                <Col md={5}>
                    <div className="referal-img faq_mobile">
                     <img className="img-fluid float-right"  src={'img/referal.svg'}></img>
                    </div>
                </Col>
            </Row>
            </Container>
        </section>
    );
}

export default ExistReferal;