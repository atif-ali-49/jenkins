import React, {useState} from 'react';
import { Container, Row,Col,Image } from 'react-bootstrap';
import './SecretCodeStyle.scss';
import {NavLink} from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import {useHistory} from 'react-router-dom';
import axios from "axios";
import {useDispatch} from "react-redux";
function SecretCode(props:any) {
    const { addToast } = useToasts();
    let username = props.match.params.name;
    const history = useHistory();
    const dispatch = useDispatch();
    const initialState = {
        secret_code:''
    }
    const[secretcode, setSecretCode] = useState(initialState)
    const handleInputChange = (event:any) => {
        const { name, value } = event.target
        setSecretCode({ ...secretcode, [name]: value })
    }
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const SecretCode=(event:any)=>{
        event.preventDefault()
        if( secretcode.secret_code === ''){
            addToast('Secret Code is Required', { appearance: 'error',autoDismiss: true});
        }else{
            axios.post(baseurl+'/check_secret_code', {
                secret_code: secretcode.secret_code,
                username : username,
            })
                .then(function (response) {
                    if(response.status === 200 && response.data.message){
                        history.push('/crypto/confirm/password');
                        sessionStorage.setItem('code',secretcode.secret_code)
                        sessionStorage.setItem('username',username)
                        addToast("secret code matched", { appearance: 'success',autoDismiss: true});
                    }

                })
                .catch(function (error) {
                    if( error.response.status === 401){
                        addToast('Secret Code not Matched....', { appearance: 'error',autoDismiss: true});
                    }else{
                        addToast('Something Went Wrong', { appearance: 'error',autoDismiss: true});
                    }
                });
        }
    }
    return (
        <section className="section">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={7} className="forgetpassword py-30">

                        <Image src="https://media.peacecoin.io/logowb.png" className="mx-auto d-block" />
                        <h4 className="secondaryHeading text-light text-center my-20">OTP (One time password)</h4>
                        <p className="paragraph text-light text-center">Type the OTP which has sent to your email for resetting your password.</p>
                        
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control my-20" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your secret code" name="secret_code"  onChange={handleInputChange}/>
                            </div>
                            <button className="btn primaryButton mx-auto d-block" onClick={SecretCode}>Submit</button>
                        </form>
                        <hr/>
                        <p className="paragraph d-inline text-light">New user? <NavLink exact to="/crypto/register">Sign up</NavLink></p>
                        <NavLink className="paragraph d-inline float-right" exact to="/crypto/login">Login</NavLink>
                    </Col>
                </Row>
            </Container>

        </section>
    )
}

export default SecretCode
