import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';

function PrivateRoute ({component: Component, ...props}) {
    const history = useHistory();
    const id = useSelector((store:any) => store.auth.currentUser.id);
    const [isPaidStatus, setIsPaidStatus] = useState<null | number>(2);
    const iboStatus = useSelector((store: any) => store.auth.currentUser.ibo_status);
    const paidStatus = useSelector((store:any) => store.auth.currentUser.paid_status);
    const token = localStorage.getItem('access_token');
 
    const getPaidStatus = async () => {
        
        try{
            const paidStats = await localStorage.getItem('paid_status');
            setIsPaidStatus(parseInt(paidStats!));
        }catch(err){
            console.log(err)
        }

    }

    const checkIboStatus = ()=> {
        if(props.isIboRequired === true && iboStatus == 0){
            history.push('/client/dashboard');
        }
    }
    
    useEffect(()=>{
        checkIboStatus();
    },[props.isIboRequired])
    
    useEffect(()=>{
        getPaidStatus().then(()=>{
            if(isPaidStatus == 0){
                history.push('/client/checkout');
            }
        });
    },[isPaidStatus])
    return (

        <Route {...props} render={props => (
             (token) ?

                <Component {...props} />

            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;