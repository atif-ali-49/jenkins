import Grid from '@material-ui/core/Grid';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { MBox, MButton, MCircularProgress, MPaper, MTypography } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import AutoPayCard from './AutoPayCard';
import useStyles from './AutoPayStyles';
import GreetingComponent from "./GreetingComponent";
function AutoPay() {
    const classes = useStyles();
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const[packages,getPackages] = useState<null | any>([]);
    const[autopaypurchasedpkg,setAutoPayPurchasedPkg] = useState<null | any>({});
    const[autopaysetting,setAutoPaySetting] = useState<null | any>({});
    const [loading, setLoading] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(0);
    const [pkgswitcher,setPkSwitcher] = useState(false);
    const [open, setOpen] = useState(false);
    const[isUpdatePkg,setUpdatePkg] = useState(false);
    const dispatch = useDispatch();
    // for getting purchased pkgs and autoplay setting
    const autoPaySetting = async ()=>{
        setLoading(true);
        await axios.get(baseurl+'/get_autopay_setting')
            .then(function (response) {
                // handle success
                if(response.status === 200){
                    setAutoPaySetting(response.data.autopay_setting);
                    setAutoPayPurchasedPkg(response.data.selected_package);
                    if(pkgswitcher){
                        getAllPkgs();
                    }
                }

            })
            .catch(function (error) {
                if(error.response.status === 400){
                    getAllPkgs();
                }
                console.log(error);
            })
            .then(function () {
                setLoading(false);
            })
    }
    // for getting all pkgs
    const  getAllPkgs = async () => {
        setLoading(true);
       await  axios.get(baseurl+'/smart_pay_packages')
            .then(function (response) {
                // handle success
                if(response.status === 200){
                    getPackages(response.data.smart_pay_packages);
                }
            })
            .catch(function (error) {
                console.log(error)
            })
            .then(function () {
                setLoading(false)
            })
    }

    useEffect(()=>{
        autoPaySetting();

    },[pkgswitcher])

   return (
        <div>
            <MBox className="pageHeader" display="flex" alignItems="center" justifyContent="space-between">
                <MBox textAlign="left">
                    <MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Monthly Auto Pay</MTypography>
                </MBox>

                <MBox   textAlign="right">
                    {
                        autopaypurchasedpkg.id &&
                        <MButton href="#text-buttons" color="primary" onClick={() => { setUpdatePkg(false); setOpen(true);}}>Unsubscribe</MButton>
                    }
                </MBox>
				<RouterBreadcrumbs />
            </MBox>
            {
                        loading ?
                        <MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
                            <MCircularProgress />
                        </MBox>
                        :
                    <MBox className="contentBox" component={MPaper}>                    
                        <Grid container justify="center">
                               
                            {
                                autopaypurchasedpkg.uuid &&
                                    <>
                            <Grid item lg={12}>
                                <GreetingComponent />
                            </Grid>
                            <Grid item lg={12}>
                                {
                                    packages.length !==0 || autopaypurchasedpkg.id &&
                                    <MBox mb={3}>
                                        {/* <MTypography className="mainHeading" align="center" gutterBottom component="h1" variant="h4">Monthly Auto Pay Plan</MTypography> */}
                                        {
                                            autopaysetting &&
                                            <MTypography align="center" gutterBottom component="h6" variant="h6">
                                            Charge Date  <mark>{autopaysetting.date_to_charge}</mark> and Renewal Date <mark>{autopaysetting.renewal}</mark>
                                            </MTypography>
                                        }
                                    </MBox>
                                }
                            </Grid>   
                                    <AutoPayCard
                                        key={autopaypurchasedpkg.uuid}
                                        pkg_uuid={autopaypurchasedpkg.uuid}
                                        btnColor={autopaypurchasedpkg.title.includes('Silver') ? classes.silverbackground : autopaypurchasedpkg.title.includes('Gold') ? classes.goldbackground : classes.platinumbackground}
                                        colordiv={autopaypurchasedpkg.title.includes('Silver') ? classes.silverbackground : autopaypurchasedpkg.title.includes('Gold') ? classes.goldbackground : classes.platinumbackground}
                                        topstyle={classes.topstyle}
                                        bottomstyle={classes.bottomstyle}
                                        name={autopaypurchasedpkg.title}
                                        desc={autopaypurchasedpkg.desc}
                                        price={autopaypurchasedpkg.price}
                                        access="IBO Access"
                                        pkgCoins={autopaypurchasedpkg.sp_coin}
                                        cryptoCoin={autopaypurchasedpkg.cryptoCoin}
                                        autopaypurchasedpkg={autopaypurchasedpkg}
                                        id={autopaypurchasedpkg.id}
                                        purchased={true}
                                        setAutoPayPurchasedPkg={setAutoPayPurchasedPkg}
                                        setPkSwitcher={setPkSwitcher}
                                        pkgswitcher={pkgswitcher}
                                        open={open}
                                        setOpen={setOpen}
                                        isUpdatePkg={isUpdatePkg}
                                        setUpdatePkg={setUpdatePkg}
                                        selectedpkgbtn={autopaypurchasedpkg.title.includes('Silver') ? classes.silverbackground : autopaypurchasedpkg.title.includes('Gold') ? classes.goldbackground : classes.platinumbackground}
                                        selectedpkgbackgroundcolor={autopaypurchasedpkg.title.includes('Silver') && classes.selectedpkgbackgroundcolorsilver || autopaypurchasedpkg.title.includes('Gold') && classes.selectedpkgbackgroundcolorgold || autopaypurchasedpkg.title.includes('Platinum') && classes.selectedpkgbackgroundcolorplatinum || autopaypurchasedpkg.title.includes('IBO') && classes.selectedpkgbackgroundcolorplatinum ||autopaypurchasedpkg.title.includes('VIP') && classes.selectedpkgbackgroundcolorplatinum }
                                    />
                                </>
                            }
                            {
                                packages.length !==0  ?  packages.map((pkg)=>(
                                    
                                        (pkg.category === 'smart_pay' || pkg.category==='vip') &&
                                            <AutoPayCard
                                                key={pkg.uuid}
                                                pkg_uuid={pkg.uuid}
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
                                                id={pkg.id}
                                                pkgswitcher={pkgswitcher}
                                                setSelectedPackage={setSelectedPackage}
                                                selectedpkgbtn={pkg.title.includes('Silver') ? classes.silverbackground : pkg.title.includes('Gold') ? classes.goldbackground : classes.platinumbackground}
                                                selectedPackage={selectedPackage}
                                                selectedpkgbackgroundcolor={pkg.title.includes('Silver') && classes.selectedpkgbackgroundcolorsilver || pkg.title.includes('Gold') && classes.selectedpkgbackgroundcolorgold || pkg.title.includes('Platinum') &&  classes.selectedpkgbackgroundcolorplatinum || pkg.title.includes('IBO') && classes.selectedpkgbackgroundcolorplatinum ||pkg.title.includes('VIP') && classes.selectedpkgbackgroundcolorplatinum }
                                                />
                                    ))
                                :''

                                        // <MBox mb={1} borderRadius={'4px'}>
                                        //     <NoData />
                                        // </MBox>

                            }
                        </Grid>
                    </MBox>
            }

        </div>
    )
}



export default AutoPay
