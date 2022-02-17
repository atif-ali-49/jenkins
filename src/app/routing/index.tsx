import { useEffect, useState, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useHistory, withRouter,useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { setAuth, resetStore, showAlert } from 'src/app/store';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PrivateRouteImports from './route-imports/PrivateRouteImports';
import PublicRouteImports from './route-imports/PublicRouteImports';
import axios from "axios";
import { GiConsoleController } from 'react-icons/gi';
import { setCurrentUserData,setLanguages } from 'src/app/store';
function Routing(){
    const history = useHistory();
    const location = useLocation();
    
    const dispatch = useDispatch();
    const userData = useSelector((store: any) => store.auth.currentUser);
    const[token, setToken] = useState<any | null>(null);
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const[replicaStatus,setReplicaStatus] = useState<any | null>(false);
    const[switchregietr,setSwitchRegietr]=  useState<any | null>(false)
    let host = window.location.host;

    // armen.vcs.local/ local server replica testing url
    // let host = 'armen.peacecoin.com/crypto/register';
    // let url = window.location.href;
    //  let host = 'armen.peacecoin.com';
     let username = host.split('.');
     useEffect(()=>{
         let finalpathnameconsole = location.pathname;
          // console.log(finalpathnameconsole,'finalpathnameconsolesdfdsfdsfds')
         if( finalpathnameconsole === '/crypto/register'){
             setSwitchRegietr(true);
         }
     },[])

     useEffect(()=>{
         const accessToken = localStorage.getItem('access_token');
        const unauthorized = 401;
        axios.interceptors.response.use(
            response => response,
            error => {
                const {status} = error.response;
                if (status === unauthorized) {
                    try {
                        localStorage.removeItem('access_token');
                        dispatch(resetStore());

                        // dispatch(showAlert({
                        //     message: "Session has been expired Please login again.",
                        //     messageType: 'error',
                        //     showAlertMessage: true
                        // }));

                        if(accessToken){
                            localStorage.clear();
                            sessionStorage.clear();
                            history.push('/');
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                return Promise.reject(error);
            }
        );

    },[]);
    
    const accessToken = localStorage.getItem('access_token');
    
    useEffect(()=>{    
        const accessToken = localStorage.getItem('access_token');
        setToken(token);
        dispatch(setAuth(accessToken));
        if(accessToken !== null ||  accessToken!== undefined || accessToken !==''){
            setToken(token);
             dispatch(setAuth(accessToken));

        }else{
            dispatch(resetStore());
            window.location.reload();
        }
        
    },[accessToken]);

    useEffect(()=>{
            let pathname = location.pathname;
            let url =  window.location.href;

           if(url === "http://peacecoin.com/"){
                 history.push("/");
           }
           else if(username.length === 3 && pathname === '/' && url !== "http://peacecoin.com/"){
               verifyCryptoUser();
           }

           
    },[username]);

        const verifyCryptoUser = async ()=> {

             if(username.length === 3 && username[0] !== 'admin' && host.includes("peacecoin.com")){
               
                await axios.post(baseurl+'/check_username_exit', {
                    username: username[0]
                })
                .then(function (response){
                    if(response.status === 200 && response.data.message){
                        setReplicaStatus(true);
                        try{  
                            sessionStorage.setItem('rName', username[0]);
                            sessionStorage.setItem('message',response.data.message)
                            
                        }catch(err){
                            console.log('username catch', err);
                        }

                         if(switchregietr){
                             history.push('/crypto/home')
                             history.push('/crypto/register');
                         }else{
                             history.push('/crypto/home');
                         }
                    }
                })
                .catch(function (err) {
                    if(err.response.status === 401 || username.length !== 3){
                       
                        if( sessionStorage.getItem('rName') !== null){
                            sessionStorage.removeItem('rName');
                            sessionStorage.removeItem('message');
                            history.push('/'); 
                            window.location.reload(); 
                        }
                        
                    }
                })
            }
            else if(username[0] === 'admin'){
                //  alert(username[0])
                 return false;
            }
        }

    const getUserProfileData = async () => {
        await axios.get(baseurl + '/profile_show')
            .then(function (response) {
                // handle success

                if (response.status === 200 && response.data.message){
                    dispatch(setCurrentUserData(response.data.user))
                    dispatch(setLanguages(response.data.languages))
                }

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    return(
        <Suspense fallback={''}>
        {/* <Suspense fallback={<LinearProgress color="primary" />}> */}       
        <Switch>            
            {/* public routes | non-crypto*/}
            <PublicRoute exact restricted={false} path="/" component={PublicRouteImports.home} />
            <PublicRoute exact restricted={false} path="/blog" component={PublicRouteImports.blog} />
            <PublicRoute exact restricted={false} path="/certification" component={PublicRouteImports.certification} />
            <PublicRoute exact restricted={false} path="/movement" component={PublicRouteImports.peaceMovement} />
            <PublicRoute exact restricted={false} path="/contact" component={PublicRouteImports.contact} />
            <PublicRoute exact restricted={false} path="/faq/:id?" component={PublicRouteImports.faq} />
             <PublicRoute exact restricted={false} path="/donate" component={PublicRouteImports.donation} />
            <PublicRoute exact restricted={false} path="/view_attachment/:id?" component={PublicRouteImports.linkview} />
            <PublicRoute exact restricted={false} path="/team" component={PublicRouteImports.team} />
            <PublicRoute exact restricted={false} path="/terms" component={PublicRouteImports.terms} />
             <PublicRoute exact restricted={false} path="/business-promotion" component={PublicRouteImports.business} />
            <PublicRoute exact restricted={false} path="/apparel" component={PublicRouteImports.frontapparel} />
            <PublicRoute exact restricted={false} path="/product" component={PublicRouteImports.frontproduct} />
            <PublicRoute exact restricted={false} path="/privacy-policy" component={PublicRouteImports.privacy} />
            <PublicRoute exact restricted={false} path="/apparel" component={PublicRouteImports.apparel} />
            <PublicRoute exact restricted={false} path="/product" component={PublicRouteImports.product} />
            <PublicRoute exact restricted={true} path="/register/:name?" component={PublicRouteImports.register} />
            <PublicRoute exact restricted={true} path="/referal" component={PublicRouteImports.referal} />
            <PublicRoute exact restricted={true} path="/exist" component={PublicRouteImports.existReferal} />
            <PublicRoute exact restricted={true} path="/login" component={PublicRouteImports.login}/>
            <PublicRoute exact restricted={false} path="/cart" component={PublicRouteImports.cart}/>
            <PublicRoute exact restricted={false} path="/thank-you" component={PublicRouteImports.thankyou}/>
            <PublicRoute exact restricted={false} path="/order-summary" component={PublicRouteImports.orderSummary}/>
            <PublicRoute exact restricted={false} path="/ceo-message" component={PublicRouteImports.ceoMessage}/>
            <PublicRoute exact restricted={false} path="/blog/:id?/:title" component={PublicRouteImports.blogDetail}/>
            <PublicRoute exact restricted={true} path="/forgetpassword" component={PublicRouteImports.forgetPassword} />
            <PublicRoute exact restricted={true} path="/confirm-password" component={PublicRouteImports.confirmPassword} />
            <PublicRoute exact restricted={true} path="/secretcode/:username?" component={PublicRouteImports.secretCode} />
            {/*<PublicRoute exact restricted={true} path="/peacecoin/anniversary" component={PublicRouteImports.peaceMovement} />*/}
            <PublicRoute exact restricted={false} path="/business/training/checkout" component={PublicRouteImports.businesstraining} />

            {/* public routes | crypto */}
            <PublicRoute exact replicaStatus={replicaStatus} restricted={false} path="/crypto/about" component={PublicRouteImports.cryptoAbout} />
            <PublicRoute exact replicaStatus={replicaStatus} restricted={false} path="/crypto/home" component={PublicRouteImports.index} />
            {/* <PublicRoute exact replicaStatus={replicaStatus} restricted={false} path="/crypto/apparel" component={PublicRouteImports.apparel} /> */}
            {/* <PublicRoute exact replicaStatus={replicaStatus} restricted={false} path="/crypto/product" component={PublicRouteImports.product} /> */}
            <PublicRoute exact replicaStatus={replicaStatus} restricted={false} path="/crypto/metamask" component={PublicRouteImports.metaMask} />
            <PublicRoute exact replicaStatus={replicaStatus} restricted={false} path="/crypto/services" component={PublicRouteImports.services} />
            <PublicRoute exact replicaStatus={replicaStatus} restricted={false} path="/crypto/privacy-policy" component={PublicRouteImports.privacyCrypto} />
            <PublicRoute exact replicaStatus={replicaStatus} restricted={false} path="/crypto/terms" component={PublicRouteImports.cryptoTerms} />
            <PublicRoute exact replicaStatus={replicaStatus} restricted={false} path="/crypto/services" component={PublicRouteImports.services} />
            <PublicRoute exact replicaStatus={replicaStatus} restricted={false} path="/crypto/resources" component={PublicRouteImports.resource} />
            <PublicRoute exact replicaStatus={replicaStatus} restricted={false} path="/crypto/register" component={PublicRouteImports.cryptoregister} />
            <PublicRoute exact replicaStatus={replicaStatus} restricted={false} path="/crypto/login" component={PublicRouteImports.cryptologin} />
            <PublicRoute  exact replicaStatus={replicaStatus} restricted={false} path="/crypto/forget/password" component={PublicRouteImports.cryptoforgetpassword}  />
            <PublicRoute  exact replicaStatus={replicaStatus} restricted={false} path="/crypto/secret/code/:name?" component={PublicRouteImports.cryptosecretCode}  />
            <PublicRoute  exact replicaStatus={replicaStatus} restricted={false} path="/crypto/confirm/password" component={PublicRouteImports.cryptoconfirmPassword}  />
            <PublicRoute  exact replicaStatus={replicaStatus} restricted={false} path="/crypto/cart" component={PublicRouteImports.crypto_cart} />
            <PublicRoute  exact restricted={false}  path="/crypto/thank-you" component={PublicRouteImports.thankyou}/>
            <PublicRoute  exact  restricted={false} path="/american/express/card" component={PublicRouteImports.expresscard}  />
            <PublicRoute   exact restricted={false} path="/client/payment/type" component={PublicRouteImports.paymentType} />

            <PublicRoute  exact  restricted={false} path="/crypto/order/summary" component={PublicRouteImports.crypto_order}  />
            {/* private routes | client-site */}
            <PrivateRoute exact path="/client/dashboard" component={PrivateRouteImports.dashboard} />
            <PrivateRoute exact path="/client/coins/:id?/:title" component={PrivateRouteImports.coin} />            
            <PrivateRoute isIboRequired={true} exact path={"/client/peacemakers"} component={PrivateRouteImports.peaceMakers} />
            <PrivateRoute exact path="/client/ledger/register-transactions" component={PrivateRouteImports.registerLedger} />
            <PrivateRoute exact path="/client/ledger/ibo-transactions" component={PrivateRouteImports.iboLedger} />
            <PrivateRoute exact path="/client/ledger/package-transactions" component={PrivateRouteImports.packageLedger} />
            <PrivateRoute exact path="/client/executive-team" component={PrivateRouteImports.executiveTeam} />
            <PrivateRoute exact path="/client/resources" component={PrivateRouteImports.resource} />
            <PrivateRoute exact path="/client/:category/detail/:id?" component={PrivateRouteImports.newsDetail} />
            <PrivateRoute exact path="/client/:category/all" component={PrivateRouteImports.newsEventsListing} />
            <PrivateRoute exact path="/client/thank-you" component={PrivateRouteImports.thankyousecure} />
            <PrivateRoute exact path="/client/charts" component={PrivateRouteImports.btcUsd} />
            <PrivateRoute exact path="/client/ethusd" component={PrivateRouteImports.ethUsd} />
            <PrivateRoute exact path="/client/current-rank" component={PrivateRouteImports.currentRank} />
            <PrivateRoute exact path="/client/deposit/fund" component={PrivateRouteImports.depositFund} />
            <PrivateRoute exact path="/client/wallet/summary" component={PrivateRouteImports.walletSummary} />
            <PrivateRoute exact path="/client/transfer/fund" component={PrivateRouteImports.transferFund} />
            <PrivateRoute  exact path="/client/transfer/fund/withdrawalModal" component={PrivateRouteImports.WithdarawalModal} />
            <PrivateRoute exact path="/client/transfer/coins" component={PrivateRouteImports.transferCoin} />
            <PrivateRoute exact path="/client/profile" component={PrivateRouteImports.profile} />
            <PrivateRoute exact path="/client/support/tickets" component={PrivateRouteImports.ticketListing} />
            <PrivateRoute exact path="/client/products/package" component={PrivateRouteImports.productPkg} />
            <PrivateRoute exact path="/client/products/transaction" component={PrivateRouteImports.productTransaction} />
            <PrivateRoute exact path="/client/apparels/transaction" component={PrivateRouteImports.ApparelTransaction} />
            <PrivateRoute exact path="/client/fund/transfer" component={PrivateRouteImports.fundTransfer} />
            <PrivateRoute exact path="/client/support/create-ticket" component={PrivateRouteImports.createTicket} />
            <PrivateRoute exact path="/client/support/live-chat/:ticket" component={PrivateRouteImports.liveChat} />
            <PrivateRoute exact path="/client/smart-pay" component={PrivateRouteImports.smartPay} />
            <PrivateRoute exact path="/client/promotion/package/summit" component={PrivateRouteImports.s1package} />
             <PrivateRoute exact path="/client/promotion/package/summit-transactions" component={PrivateRouteImports.summitTransaction} />
            <PrivateRoute exact path="/client/promotion/checkout/s1" component={PrivateRouteImports.PromotionCheckout} />
            <PrivateRoute exact path="/client/apparels" component={PrivateRouteImports.apparels} />
            <PrivateRoute exact path="/client/apparels/detail/:id?" component={PrivateRouteImports.apparelDetail} />
            <PrivateRoute exact path="/client/user/profile" component={PrivateRouteImports.userProfile}  />
            {/* auto pay */}
            <PrivateRoute exact path="/client/auto-pay" component={PrivateRouteImports.autopay}  />
            <PrivateRoute exact path="/client/auto-pay/transaction" component={PrivateRouteImports.autopaytransactions} />
            <PrivateRoute exact path="/client/auto-pay/update" component={PrivateRouteImports.updateautopay} />
            <PrivateRoute exact path="/client/auto-pay/date/update" component={PrivateRouteImports.updateautopayDate} />
            <PrivateRoute exact path="/client/auto-pay/card/info/update" component={PrivateRouteImports.updatecardinfo} />
            {/* auto pay End */}
            <PrivateRoute exact path="/client/notifications" component={PrivateRouteImports.notifications} />
            <PrivateRoute exact path="/client/announcements" component={PrivateRouteImports.announcements} />
            <PrivateRoute exact path="/client/peace-wallet" component={PrivateRouteImports.peaceWallet} />
            <PrivateRoute exact path="/client/cart" component={PrivateRouteImports.cart} />
            <PrivateRoute exact path="/client/checkout/:param?" component={PrivateRouteImports.paymentType} />
            <PrivateRoute exact path="/client/profile/success" component={PrivateRouteImports.profileSuccess} />
            <PrivateRoute exact path="/client/upgrade/ibo" component={PrivateRouteImports.upGradeIbo} />
            <PrivateRoute exact path="/client/geo/chart" component={PrivateRouteImports.geoChart} />

            <PrivateRoute exact path="/client/order-summary" component={PrivateRouteImports.orderSummary} />
            <PrivateRoute exact path="/client/dummy" component={PrivateRouteImports. referredMembersList} />
            {/* Genelogy routes */}
           {/* { userData.ibo_status && userData.ibo_status === 1 ? */}
           {/* <> */}
                <PrivateRoute exact isIboRequired={true} path="/client/genelogy" component={PrivateRouteImports.genealogy} />
                <PrivateRoute exact isIboRequired={true} path="/client/genelogy/refer-members" component={PrivateRouteImports.referGenelogy} />

                <PrivateRoute exact  path="/client/genelogy/users-list" component={PrivateRouteImports.allUsersList} />

                <PrivateRoute  exact path="/client/university-notifications" component={PrivateRouteImports.universityNotifications} />
                <PrivateRoute  exact path="/client/university/courses" component={PrivateRouteImports.courses} />
                <PrivateRoute  exact path="/client/university/courses/courses-details/:id?" component={PrivateRouteImports.coursesDetails} />
                <PrivateRoute  exact path="/client/university/courses/courses-details/:id?/:uid?" component={PrivateRouteImports.coursesList} />
                <PrivateRoute  exact path="/client/university/courses/quiz-course/:id?/:lec_id?/:course_Id?" component={PrivateRouteImports.quizCourse} />
                <PrivateRoute  exact path="/client/university/area-coordinate" component={PrivateRouteImports.peacecoinAreaCordinate} />
                <PrivateRoute  exact path="/client/university/show_all_letures/:id" component={PrivateRouteImports.showallLecture} />
                <PrivateRoute  exact path="/client/university/show_user_course/:id?/:uid?" component={PrivateRouteImports.showusercourse} />
                <PrivateRoute  exact path="/client/genealogy/tree/UserGuide" component={PrivateRouteImports.userGuide} />
                
                {/*<PrivateRoute isIboRequired={true} path="/client/university/quiz/:id?/uid?/:title?" component={PrivateRouteImports.quizPdf} />*/}
                 <PrivateRoute  path="/client/university/quiz/:id/:uid/:title" component={PrivateRouteImports.quizPdf} />
                 <PrivateRoute  path="/client/university/course/certificate/:id?" component={PrivateRouteImports.certificate} />
                <PrivateRoute   path="/client/university/course/coin/transfer/:id?" component={PrivateRouteImports.coinTransfer} />
            {/* </>:
             <PrivateRoute exact path="/client/dashboard" component={PrivateRouteImports.dashboard} />
            } */}
            {/*for express card*/}
            <PrivateRoute exact path="/client/payment/types" component={PrivateRouteImports.paymentType} />
            {/* <Route exact path="/page-not-found" component={PublicRouteImports.page404} /> */}
            <Route exact path="/page-not-found" component={PublicRouteImports.page404} />
            <Route exact path="*">
                <Redirect to='/page-not-found'/>
            </Route>
        </Switch>
       </Suspense>
    )

}

export default withRouter(Routing);