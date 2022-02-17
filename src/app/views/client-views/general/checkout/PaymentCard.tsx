import React, {useEffect, useState} from 'react';
import { MBox, MTypography } from 'src/app/components/mui';
import useStyles from './PaymentCardStyles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListView from '../../smart-pay/ListView';
import axios from 'axios'
import { AnySrvRecord } from 'dns';
import { showAlert } from 'src/app/store';
import {useSelector} from 'react-redux';
function PaymentCard(props:any) {
    const classes = useStyles();
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const[packages,getPackages] = useState<null | any>([]);
    const token =  useSelector((store: any) => store.auth.token);
    const getJoiningPackage = async ()=>{
     await axios.get(baseurl+'/smart_pay_packages',
     {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
        }
    }
     )
       .then(function (response) {
           // handle success
           if(response.status === 200){
               getPackages(response.data.smart_pay_packages);
               
           }
       })
       .catch(function (error) {
            console.log(error)
       })
    }

   
    useEffect(()=>{
       getJoiningPackage();
    },[])

    function setJoiningPackageData(data:any){
        props.setJoiningPkgData(data);
    }

    return (
        <Grid item lg={4}>
            <div className={classes.parentCard}>
                <MBox className={classes.smartcard}>
                        
                        <List className={classes.ListParent}>
                          { 
                              
                          packages.length ? packages.map((product:any)=>(
                            
                            product.category === 'joining' &&
                            <>
                             {
                                setJoiningPackageData(product)
                             }
                           
                            <MTypography className="mainHeading" component="h1" variant="h4">{product.title}</MTypography>
                           <MTypography className="mainHeading" gutterBottom component="h1" variant="h6">$ {product.price}</MTypography> 
                           {
                           product.desc.split("/").map((item:any)=>
                           <ListView  feature={item} />
                           
                           )}
                           </>
                           )):""
                        
                         }
							    
                        </List>
                </MBox>
                <span className={`${props.topstyle} ${props.colordiv}`}></span>
                <span className={`${props.bottomstyle} ${props.colordiv}`}></span>
            </div>
        </Grid>         
        
    )
}

export default PaymentCard
