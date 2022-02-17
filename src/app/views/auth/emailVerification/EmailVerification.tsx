import React, {useState} from 'react'
import { Container, Row,Col,Image } from 'react-bootstrap'
import './EmailVerification.scss'
import {NavLink} from 'react-router-dom'
import axios from "axios";
import { useToasts } from 'react-toast-notifications';
function EmailVerification() {
    const { addToast } = useToasts();
    const initialState = {
        opt:''
    }
    const [opt, setOpt] = useState(initialState)
    const handleInputChange = (event:any) => {
        const { name, value } = event.target
        setOpt({ ...opt, [name]: value })
    }
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const TestOpt =()=>{
        if( opt.opt.length <= 5){
            addToast('OTP must have 6 digit Code', { appearance: 'error',autoDismiss: true});
        }else{
            axios.post(baseurl+'/check_secret_code', {
                otp: opt.opt,
                username:localStorage.getItem('referal') ? localStorage.getItem('referal') :''
            })
                .catch(function (error) {
                    console.log(error);
                });
        }


    }

    return (
       <section className="section">
           <Container>
               <Row className="justify-content-center">
                 <Col lg={7} className="forgetpassword py-30">
                <Image src="https://media.peacecoin.io/logowb.png" className="mx-auto d-block" /> 
                <h4 className="secondaryHeading text-light text-center my-20">Enter Your Code</h4>
                <p className="paragraph text-light text-center">A four digit code has been sent to your email Address <br></br>Please enter that code for your verification </p>
                <form>

                <div className="form-group">
                <input type="number" className="form-control my-20" placeholder="Enter OTP Code" name="opt"  required max="5" onChange={handleInputChange} />
               </div>
               <NavLink exact to="#"><button type="submit" className="btn primaryButton mx-auto d-block" onClick={TestOpt}>Submit</button></NavLink>
              </form>

                </Col>  
               </Row>
           </Container>

       </section>
    )
}

export default EmailVerification
