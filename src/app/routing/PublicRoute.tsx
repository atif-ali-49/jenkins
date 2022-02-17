import {useEffect} from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
const PublicRoute = ({component: Component, restricted, ...props}) => {
    const history = useHistory();
    const isLoggedIn = useSelector((store:any) => store.auth.isLoggedIn);
    const paidStatus = useSelector((store:any) => store.auth.currentUser.paid_status);
    const checkRplicaStatus = ()=> {
        sessionStorage.getItem('rName');
        if(props.replicaStatus === true){
        }else{
            history.push('/');
        }
    }

    useEffect(()=>{
        checkRplicaStatus();
    },[props.replicaStatus])
    // window.onload = function() {
    //     history.goBack();
    // }
    return (
        
        <Route {...props} render={props => (

            (restricted && isLoggedIn && paidStatus === 1) ?

                <Redirect to="/client/dashboard" />

            : <Component {...props} />

        )} />
    );
};

export default PublicRoute;
// for testing purpose 