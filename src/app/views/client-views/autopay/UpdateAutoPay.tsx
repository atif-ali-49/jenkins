import React, {useState, useEffect} from 'react'
import { MBox, MTypography, MPaper, MCircularProgress,MButton } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import useStyles from './AutoPayStyles';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import AutoPayCard from "./AutoPayCard";

function UpdateAutoPay(props:any) {
    const classes = useStyles();
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const [loading, setLoading] = useState(false);
    const[packages,getPackages] = useState<null | any>([]);
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
        getAllPkgs();
    },[])
    return (

        <div>
            <MBox className="pageHeader">
                <MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Auto Pay Update</MTypography>
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

                            <MBox my={2}>
                                <MTypography className="mainHeading" align="center" gutterBottom component="h1" variant="h4">Monthly AutoPay Plan</MTypography>
                            </MBox>
                        }
                        <Grid container justify="center" spacing={3}>
                            {
                                packages.length !==0  ?  packages.map((pkg)=>(
                                        (pkg.category === 'smart_pay' || pkg.category==='vip') ?
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
                                                updatePkgTrue={true}
                                                selectedpkgbtn={pkg.title.includes('Silver') ? classes.silverbackground : pkg.title.includes('Gold') ? classes.goldbackground : classes.platinumbackground}
                                                selectedpkgbackgroundcolor={pkg.title.includes('Silver') && classes.selectedpkgbackgroundcolorsilver || pkg.title.includes('Gold') && classes.selectedpkgbackgroundcolorgold || pkg.title.includes('Platinum') &&  classes.selectedpkgbackgroundcolorplatinum || pkg.title.includes('IBO') && classes.selectedpkgbackgroundcolorplatinum ||pkg.title.includes('VIP') && classes.selectedpkgbackgroundcolorplatinum }
                                            />

                                            : ''
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
    );
}

export default UpdateAutoPay;