import Header from './header/Header';
import Footer from './footer/Footer';
import CryptoHeader from './header/CryptoHeader';
import CryptoFooter from './footer/CryptoFooter';
import Routing from 'src/app/routing';
import { useLocation, useHistory } from 'react-router-dom';
import {useEffect,useState} from 'react';
import './index.scss';
import {updateFrontCart,cryptoCart} from "../../../store";
import {useDispatch} from "react-redux";
export default function PublicLayout(props:any) {
      const location = useLocation();
      const history = useHistory();
      let currentUrl =  window.location.pathname
      const[setpages,setCryptoPages] = useState(false);
      const[fullPageLoader, setFullPageLoader] = useState(true);
      const[setcrptostatus,setCrptoStatus] = useState(false);
      const pushToCheckout = () =>{
        setCrptoStatus(false);
        history.push('/client/checkout');
        localStorage.removeItem('cyptoStatus');              
      }
      const dispatch = useDispatch();
      useEffect(() => {
        const timer = setTimeout(() => {
          setFullPageLoader(false);
        }, 1000);
          return () => clearTimeout(timer);
        },[]);


    useEffect(()=>{
      let pathname = location.pathname.split('/');
      if( (pathname[1] === 'client') ){
        // nothing
      }else{
        require('src/app/styles/PublicLayout.scss');
      }
	  });
    
  useEffect(()=>{
      let pathname = location.pathname.split('/');
      let rName=  sessionStorage.getItem('rName');
      let paidStatus = localStorage.getItem('cyptoStatus');
      paidStatus !== null && setCrptoStatus(true);
      // for crypto pages access
      if( (pathname[1] === 'crypto' && rName !== null) ){
        setCryptoPages(true);
      }else{
        setCryptoPages(false);
        sessionStorage.removeItem('rName');
      }
	});

    useEffect(() => {

        let cartItems = JSON.parse(localStorage.getItem('front_cart') || '{}');
        if (cartItems.length) {
            dispatch(updateFrontCart(cartItems));
        }
    }, []);
    useEffect(() => {

        let cartItems = JSON.parse(localStorage.getItem('crypto_cart') || '{}');
        if (cartItems.length) {
            dispatch(cryptoCart(cartItems));
        }
    }, []);
  return(
    <>  
      {fullPageLoader === true &&
        <div className={`fullPageLoader`}>{/* <img src="/img/peace-coin-150-min.gif" alt="loading..." /> */}</div>
      }
      <div className="public-layout">
        { setpages ? <CryptoHeader/> : setcrptostatus ?  pushToCheckout()  : <Header />}
        <main id="mainSetHeight" style={{marginTop:currentUrl === '/'? '0': '50px'}}>
          <Routing/>
        </main>
        { setpages ? <CryptoFooter/> : setcrptostatus  ?  pushToCheckout()  :<Footer /> } 
      </div>
    </>
  );
};

