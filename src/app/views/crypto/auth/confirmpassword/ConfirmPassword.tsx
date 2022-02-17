import React, {useState} from 'react'
import { Container, Row,Col,Image } from 'react-bootstrap'
import './ConfirmPassword.scss'
import { useToasts } from 'react-toast-notifications';
import axios from "axios";
import {useHistory} from 'react-router-dom'
function ConfirmPassword() {

    const history = useHistory(); 
    const initialState = {
        password:'',
        con_password:''
    }
    const { addToast } = useToasts();
    const [password, setPassword] = useState(initialState)
    const handleInputChange = (event:any) => {
        const { name, value } = event.target
        setPassword({ ...password, [name]: value })
    }
    const handleSubmit=(event:any)=>{
        event.preventDefault();
        let secret_code = sessionStorage.getItem('code');
        let username = sessionStorage.getItem('username');
        if(password.con_password.length < 8){
            
            addToast('password And Confirm Password has At Least 8 Characters', { appearance: 'error',autoDismiss: true});
        }else if (password.password != password.con_password){
            addToast('password And Confirm Password MisMatch', { appearance: 'error',autoDismiss: true});
        }else{
                const baseurl = process.env.REACT_APP_API_END_POINT;
                axios.put(baseurl+'/set_new_password', {
                    secret_code:secret_code,
                    username:username,
                    password: password.password,
                    password_confirmation:password.con_password

                }).then(function (response) {
                    if(response.status === 200 && response.data.message){
                        sessionStorage.removeItem('code');
                        sessionStorage.removeItem('username');
                        addToast('password reset successfully', { appearance: 'success',autoDismiss: true});
                        history.push('/crypto/login');
                    }

                })
                .catch(function (error) {
                    console.log(error)
                    addToast('Something Went Wrong Please Try Later', { appearance: 'error',autoDismiss: true});
                });
        }
    }
    return (
       <section className="section">
           <Container>
               <Row className="justify-content-center">
                 <Col lg={7} className="forgetpassword py-30">
                <Image src="https://media.peacecoin.io/logowb.png" className="mx-auto d-block" /> 
                <h4 className="secondaryHeading text-light text-center my-20">Please Confirm Your Password</h4>
                <form onSubmit={handleSubmit}>

                <div className="form-group">
                <input type="password" className="form-control my-20" placeholder="Enter Your Password" name="password" onChange={handleInputChange}/>
              </div>
  
            <div className="form-group">
            <input type="password" className="form-control my-20" placeholder="Confirm Your Password" name="con_password" onChange={handleInputChange}/>
             </div>
 <button  className="btn primaryButton mx-auto d-block" type="submit">Verify</button>
</form>
                </Col>  
               </Row>
           </Container>

       </section>
    )
}

export default ConfirmPassword
