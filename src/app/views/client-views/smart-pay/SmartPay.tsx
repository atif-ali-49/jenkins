import React, { useState, useEffect } from 'react';
import { MBox, MTypography, MPaper, MCircularProgress } from 'src/app/components/mui';
import { RouterBreadcrumbs } from '../../../mui';
import useStyles from './SmartPayStyles'
import Grid from '@material-ui/core/Grid';
import SmartCard from './SmartCard';
import { showAlert, updateCart } from 'src/app/store';
import { useDispatch } from "react-redux";
import { NoData } from 'src/app/components';
import axios from "axios";
import { pbkdf2 } from 'crypto';


function SmartPay() {
    const classes = useStyles();
    const [cartpkg, setCartPkg] = useState<null | any>([]);
    const [storageArray, setStorageArray] = useState<null | any>([]);
    const [tempPkg, setTempPkg] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const [packages, getPackages] = useState<null | any>([]);
    // for set items in redux and Local Storage


    useEffect(() => {
        setCartPkg(JSON.parse(localStorage.getItem('cart') || '[]'));
    }, []);
    useEffect(() => {

        if (tempPkg) {

            const cart = [...storageArray, ...cartpkg];
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch(updateCart(cart));
            setTempPkg(false);

        }
    }, [cartpkg]);
    //  for getting all packages from backend
    useEffect(() => {
        setLoading(true);
        axios.get(baseurl + '/smart_pay_packages')
            .then(function (response) {
                // handle success
                if (response.status === 200) {
                    getPackages(response.data.smart_pay_packages);
                    setLoading(false);
                }

            })
            .catch(function (error) {
                console.log(error);
            })
            .then(() => {
                setLoading(false)
            });
    }, []);

    // add to cart pkg
    const addPkg = (pkg: any) => {
        setTempPkg(true);
        const exist = cartpkg.find((x: any) => x.uuid === pkg.uuid);
        if (exist) {
            setCartPkg(
                cartpkg.map((x: any) =>
                    x.uuid === pkg.uuid ? { ...exist, qty: exist.qty + 1 } : x
                )
            );
            dispatch(showAlert({
                        message: "Package added to cart successfully",
                        messageType: 'success',
                        showAlertMessage: true
                    }));
        } else {

            setCartPkg([...cartpkg, { ...pkg, qty: 1 }]);
            dispatch(showAlert({
                        message: "Package added to cart successfully",
                        messageType: 'success',
                        showAlertMessage: true
                    }));
        }
    }

    return (
        <div>
            <MBox className="pageHeader">
                <MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Smart Pay Packages</MTypography>
                <RouterBreadcrumbs />
            </MBox>
            <MBox className="contentBox" component={MPaper}>
                <Grid container justify="center" spacing={3}>
                    {loading ?
                        <MBox
                            display="flex"
                            alignItems="center"
                            textAlign="center"
                            height="auto"
                            justifyContent="center"
                            className={classes.circular}>
                            <MCircularProgress />
                        </MBox> : <>
                            {
                                packages.length ?
                                    packages.map((pkg) => (

                                        pkg.category == 'smart_pay' ?
                                            <SmartCard
                                                key={pkg.uuid}
                                                btnColor={pkg.title.includes('Silver') ? classes.silverbackground : pkg.title.includes('Gold') ? classes.goldbackground : classes.platinumbackground}
                                                colordiv={pkg.title.includes('Silver') ? classes.silverbackground : pkg.title.includes('Gold') ? classes.goldbackground : classes.platinumbackground}
                                                topstyle={classes.topstyle}
                                                bottomstyle={classes.bottomstyle}
                                                name={pkg.title}
                                                desc={pkg.desc}
                                                price={pkg.price}
                                                access="IBO Access"
                                                pkgCoins={pkg.sp_coin}
                                                cryptoCoin={pkg.cryptoCoin}
                                                pkg={pkg}
                                                getPkgArray={addPkg}
                                            /> : ''

                                    ))

                                    :

                                    <MBox mb={1} borderRadius={'4px'}>
                                        <NoData />
                                    </MBox>
                            }
                        </>
                    }
                </Grid>
            </MBox>
        </div>
    )
}

export default SmartPay
