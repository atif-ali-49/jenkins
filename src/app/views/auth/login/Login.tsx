import React,{useEffect, useState} from 'react'
import './Login.scss'
import {Link} from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios'
import { setCurrentUserData } from '../../../store';
import { Col, Container, Form, Image, Row } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { showAlert } from 'src/app/store';
const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [getusername,setUsername]=useState<any | null>(null);

  const initialState = {
    username:'',
    password:'',
    remeberMe:false
}
  const [users, setUser] = useState(initialState);
  const[loading,setLoading] = useState(false);
  const Userreferral = useSelector((store: any) => store.auth.referral);
  const [username,checkUsername]=useState(false);
  const [showPass,setShowPassword]=useState(false);



const [passlength,checkpasslength]=useState(false);
const handleInputChange = (event:any) => {
  const { name, value } = event.target
  setUser({ ...users, [name]: value });
}
 const toggler=()=>{
  if(showPass){
    setShowPassword(false)
  }else{
    setShowPassword(true)
  }
 }
const keyDown = (e:any) =>{
  if (e.keyCode === 8) {
    setUsername('');
      console.log('delete');
  }
}

useEffect(()=>{
  if(Userreferral!=='' && Userreferral!==null){
    setUsername(Userreferral);

    setUser(prevState => ({
      ...prevState,
      username:Userreferral
    }));
  }
  // else{
  //   history.push('/exist');
  // }
},[Userreferral]);

const baseurl = process.env.REACT_APP_API_END_POINT;

function onSubmit(event:any) {

  event.preventDefault();
  if(users.password.length < 8){
    checkpasslength(true)
    return false;
  }
  setLoading(true);
  const user_name = users.username;
  const baseurl = process.env.REACT_APP_API_END_POINT;
   axios.post(baseurl+'/login', {
      username: user_name,
      password: users.password,
    })
    .then(function (response) {
      setLoading(false);
      if(response.status === 200 && response.data.message)
        // console.log(response.data.success,'response.data.user')
        dispatch(setCurrentUserData(response.data.user))
        try{
          localStorage.setItem("access_token", response.data.success);
					const paidStats = localStorage.setItem('paid_status',response.data.user.paid_status);
					// console.log('setting now')
				}catch(err){
					console.log(err);
				}

				localStorage.removeItem('cart');
				localStorage.removeItem('browserKey');
        sessionStorage.removeItem('rName');
				
				if(localStorage.getItem('paid_status')!==null && localStorage.getItem('paid_status')!==undefined && localStorage.getItem('paid_status') !== ''){
					history.push('/client/dashboard');
          // window.location.reload();
				}
        
       dispatch(showAlert({
        message: "successfully Logged in",
        messageType: 'success',
        showAlertMessage: true
      }));
      
      })
    .catch(function (error) {
      setLoading(false);
      if(error.response.status === 422 ){
        // console.log(error.response.data.message)
        dispatch(showAlert({
          message: error.response.data.message,
          messageType: 'error',
          showAlertMessage: true
        }));
      }else{
        dispatch(showAlert({
          message: "something went wrong",
          messageType: 'error',
          showAlertMessage: true
        }));
      }
    });
}
  // @ts-ignore
  return (
  <section id="login">
    <Container>
      <Row className="align-items-center justify-content-center">
        <Col md={10} className="login-back">
          <div className="row align-items-center">
            <div className="col-md-6 login-left">
              <Image src="https://media.peacecoin.io/peace-coin-150.gif" fluid className="mx-auto d-block" alt="image - peacecoin" />
            </div>
              
            <Col md={6}>
              <h1 className=" mt-3 text-center text-light">Welcome to</h1>
              <Image src="https://media.peacecoin.io/logow.png" className="img-fluid logopeace mx-auto d-block" alt="image - peacecoin" />
              <p className="text-light text-center mt-3">Please Check that you are visiting <Link to="/">peacecoin.com</Link></p>
              <Form  onSubmit={onSubmit}>
        
                <div className="form-group"> 
                  <input 
                  type="text" 
                  className={"form-control input-lg"}
                  name="username" 
                  id="user-name" 
                  placeholder="Username" 
                  value={users.username}
                  required
                  onChange={handleInputChange}
                  onKeyDown={keyDown}
                  />                                    
                   { 
                   username ?
                      <span className="help-block font-small-3 text-danger">
                            UserName  Required 
                      </span> : ''
                   }
                                   
                  <hr className="login-line"/>
                </div>


                {/* Password New Changes 30/12/2021 */}

                 
             <div className="input-group mb-2">
                <input 
                  type={!showPass ? 'password' : 'text'}
                  className="form-control input-lg " 
                  id="password" 
                  name="password" 
                  value={users.password}
                  placeholder="Password" 
                  required data-validation-required-message="Password field is required."
                  onChange={handleInputChange}
                   />
               <div className="input-group-append">
                <div className="input-group-text bg-transparent border-0">
                <span>
                      {
                        showPass ?<i className="fa fa-eye text-light" onClick={toggler}> </i> : <i className="fa fa-eye-slash text-light" aria-hidden="true" onClick={toggler}></i>
                      }
                </span>
                
                </div>
               
              </div>
              
                  
              </div>
              <div >
              <hr className="login-line"/>
                  {
                     passlength  &&
                      <span className="help-block font-small-3 text-danger">Password must have at least 8 characters</span>
                    } 
                  </div>
                 
                <div className="form-check d-inline">
                  <input 
                  type="checkbox" 
                  className="form-check-input" 
                  name="remeberMe" 
                  id="exampleCheck1" 
                  checked={users.remeberMe}
                  onChange={handleInputChange}
                  />

                  <label className="form-check-label text-light">Remember me</label>
                  <span className="help-block font-small-3 text-danger"></span>   
                </div>
                <p className="text-light text-right mb-3 d-inline float-right"><Link to="/forgetpassword">Forgot Password?</Link></p>
                <button className="btn primaryButton mx-auto d-block my-30" type="submit" disabled={loading}>Login</button>
              </Form>
            </Col>
          </div>
        </Col>
      </Row>
    </Container>  
  </section> 
)}

export default Login;
