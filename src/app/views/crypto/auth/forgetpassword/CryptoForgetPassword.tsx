import React, {useState} from 'react';
import { Container, Row,Col,Image } from 'react-bootstrap';
import './CryptoForgetPassword.scss';
import {NavLink} from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import {useHistory} from 'react-router-dom';
import axios from "axios";
function CryptoForgetPassword(props) {

    const { addToast } = useToasts();
    const history = useHistory();
    const initialState = {
        username:''
    }
    const[username, setUsername] = useState(initialState)
    const handleInputChange = (event:any) => {
        const { name, value } = event.target
        setUsername({ ...username, [name]: value })
    }
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const setUserName=(event:any)=>{
        event.preventDefault()
        if( username.username === ''){
            addToast('User Name is Required', { appearance: 'error',autoDismiss: true});
        }else{
            axios.post(baseurl+'/check_username', {
                username: username.username,
            })
                .then(function (response) {
                    if(response.status === 200 && response.data.message){
                        history.push(`/crypto/secret/code/${username.username}`)
                        addToast(response.data.message, { appearance: 'success',autoDismiss: true});

                    }

                })
                .catch(function (error) {
                    if(error.response.status === 401){
                        addToast('Referral not Matched', { appearance: 'error',autoDismiss: true});
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
                        <h4 className="secondaryHeading text-light text-center my-20">Forget Password</h4>
                        <p className="paragraph text-light text-center">Don't worry. Resetting your password is easy. Just tell us your username registered with Peacecoin. A reset password link will be sent on your email. </p>
                        <form>

                            <div className="form-group">
                                <input type="text" className="form-control my-20" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your User Name" name="username"  onChange={handleInputChange}/>
                            </div>
                            <button className="btn primaryButton mx-auto d-block" onClick={setUserName}>Submit</button>
                        </form>
                        <hr/>
                        <p className="paragraph d-inline text-light">New user? <NavLink exact to="/crypto/register">Sign up</NavLink></p>
                        <NavLink className="paragraph d-inline float-right" exact to="/crypto/login">Login</NavLink>
                    </Col>
                </Row>
            </Container>

        </section>
    );
}

export default CryptoForgetPassword;