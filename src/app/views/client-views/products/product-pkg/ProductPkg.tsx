import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NoData } from 'src/app/components';
import { MBox, MCircularProgress, MPaper, MTypography } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import { showAlert, updateCart,setCurrentUserData } from 'src/app/store';
import GreetingComponent from 'src/app/views/client-views/products/greeting/GreetingComponent';
import SmartCard from '../../smart-pay/SmartCard';
import useStyles from './ProductPkgStyles';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
function ProductPkg() {
    const classes = useStyles();
    const vip_status = useSelector((store: any) => store.auth.currentUser.vip_status);
    const ibo_status = useSelector((store: any) => store.auth.currentUser.ibo_status);
    const vip_expiry = useSelector((store: any) => store.auth.currentUser.vip_expiry);
    // for add product to cart vip_expiry
    const [currentProductArray,setCurrentProductArray] =  useState<null | any>([]);
    const[tempProduct, setTempProduct] =  useState(false);
    const [storageArray,setStorageArray] =  useState<null | any>([]);
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const[packages,getPackages] = useState<null | any>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    let cart:any = [];
    const dispatch = useDispatch();
    //get user profile data
    const getUserProfileData = async () => {
        await axios.get(baseurl + '/profile_show')
            .then(function (response) {
                // handle success
                if (response.status === 200 && response.data.message)
                    //   console.log(response.data.user,'at index')
                    dispatch(setCurrentUserData(response.data.user))
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    // get local storage
    useEffect(() => {
        setStorageArray(JSON.parse(localStorage.getItem('cart') || '[]'));
        setCurrentProductArray(JSON.parse(localStorage.getItem('cart') || '[]'));
        getUserProfileData();
    }, []);
    //  for getting all packages from backend
    useEffect(()=>{
        setLoading(true);
        axios.get(baseurl+'/smart_pay_packages')
        .then(function (response) {
                
                // handle success
                if(response.status === 200){
                    getPackages(response.data.smart_pay_packages);
                }
            })
            .catch(function (error) {
                setLoading(false);
                console.log(error)
            })
            .then(function () {
                setLoading(false);
            })
    },[])
    //for set items in redux and Local Storage
    useEffect(() => {
        if(tempProduct) {
             // cart = [...storageArray, ...currentProductArray];
            cart = currentProductArray;
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch(updateCart(cart));
            setTempProduct(false);
        }
        
    },[currentProductArray]);
    //   function for add product to cart and  local storage
    // console.log( ibo_status,' ibo_status ddddd')
    const addProduct = (products) => {
        setTempProduct(true);
        const  exist = currentProductArray.find((x:any) => x.uuid === products.uuid);
        
        // console.log('ibo_status', typeof(ibo_status));
        if(ibo_status === 0){
            setOpen(true);
        }
        if (exist) {
            dispatch(showAlert({
                message: "You can only add one quantity of vip package",
                messageType: 'info',
                showAlertMessage: true
            }));
        }else{
            if(ibo_status === 0){
                setOpen(true);
            }
            setCurrentProductArray([...currentProductArray, {...products, qty: 1}]);
            dispatch(showAlert({
                message: "Product added to cart successfully",
                messageType: 'success',
                showAlertMessage: true
            }));
        }
    }
    let IboObject = packages.find((item)=> item.category === 'ibo');
    const handleClickOpen = () => {
        setOpen(false);
    };

    const handleClose = () => {

        let IboObject = packages.find((item)=> item.category === 'ibo');
        // localStorage.setItem('ibo',JSON.stringify(IboObject));
        const  exist = currentProductArray.find((x:any) => x.uuid === IboObject.uuid);
        if (exist) {

            dispatch(showAlert({
                message: "Ibo already exist in your cart",
                messageType: 'info',
                showAlertMessage: true
            }));
        }else{
            setTempProduct(true);
            setCurrentProductArray([...currentProductArray, {...IboObject, qty: 1}]);
            dispatch(showAlert({
                message: "Ibo added to cart successfully",
                messageType: 'success',
                showAlertMessage: true
            }));
        }
        setOpen(false);
    };

    return (
        <div>
            <MBox className="pageHeader">
				<MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Package</MTypography>
				<RouterBreadcrumbs />
            </MBox>   
            {
                loading ?
                <MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
                    <MCircularProgress />
                </MBox>
                :

            <MBox className="contentBox" component={MPaper}>

            {
                    vip_status == 0  &&
                    <MBox my={2}>
                        <MTypography className="mainHeading" align="center" gutterBottom component="h1" variant="h4">VIP Buyers Club</MTypography>
                    </MBox>
            }

                   {
                       vip_status == 0 ?
                       <>
                       <Grid container justify="center" spacing={3}>

                       {
                           packages.length !== 0 ? packages.map((product) => (
                                   
                                    product.category === 'vip' &&
                                       <SmartCard
                                           key={product.uuid}
                                           btnColor={classes.goldbackground}
                                           access="IBO Access"
                                           colordiv={classes.goldbackground}
                                           topstyle={classes.topstyle}
                                           bottomstyle={classes.bottomstyle}
                                           name={product.title}
                                           price={parseInt(product.price)}
                                           // coins={product.sp_coin}
                                           cryptoCoin={product.cryptoCoin}
                                           product={product.sp_coin}
                                           pro={product}
                                           category={'product'}
                                           vip_status={vip_status}
                                           getProductArray={addProduct}
                                           desc={product.desc}
                                           IboObject={IboObject}

                                       />
                               ))

                               :

                               <MBox mb={1} borderRadius={'4px'}>
                                   <NoData/>
                               </MBox>
                       }
                   </Grid>
                       </>
                           :
                          < GreetingComponent vip_expiry={vip_expiry}/>
                   }

            </MBox>
            }
            <div>
                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"(for VIP purchase) - Add to cart: would you like to upgrade to IBO as well?"}</DialogTitle>
                    <DialogContent>
                        {/*<DialogContentText id="alert-dialog-description">*/}
                        {/*   You want to subscribe Ibo?*/}
                        {/*</DialogContentText>*/}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Yes
                        </Button>
                        <Button onClick={handleClickOpen} color="primary" autoFocus>
                             No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default ProductPkg
