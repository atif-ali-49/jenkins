import React from 'react';

import Typography from '@material-ui/core/Typography';
import Echart  from '../../charts/E-Wallet-Balance'
import {
    MGrid,
    MBox,
    MTypography,
    MPaper

} from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import Box from "@material-ui/core/Box";
import useStyles from './WalletSummaryStyle'
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { useSelector} from 'react-redux';
import { PieChart } from 'react-minimal-pie-chart';
function WalletSummary(props:any) {
    const classes = useStyles();
    const userData = useSelector((store: any) => store.auth.currentUser);
       let pcBalance = userData.e_balance ;
           if(pcBalance == null){
               pcBalance =0;
           }
    // let totalBalance:any = parseInt(userData.pc_balance) + pcBalance + parseInt(userData.commission_balance);
       // let totalBalance:any = pcBalance;
       // console.log( pcBalance,'totalBalance 4444')
    return (
        <>
            <Box className="pageHeader">
                <Typography className="mainHeading" gutterBottom component="h1" variant="h4">E-Wallet</Typography>
                <RouterBreadcrumbs />
            </Box>
            <MBox className="contentBox" component={MPaper}>
                <MGrid container spacing={2}>
                    <MGrid item md={4} lg={3} sm={6} xs={12}>
                        <MBox className={`${classes.statCard} blue`} p={2.5} display="flex" alignItems="center" justifyContent="space-between">
                            <MBox className="icon">
                                <PeopleAltIcon  fontSize="large" />
                            </MBox>
                            <MBox className="text">
                                <MTypography variant="h5" component="p">{userData.commission_balance ? parseInt(userData.commission_balance).toFixed(2):"0.00"}  USD</MTypography>
                                <MTypography variant="h6" component="p">Credit Balance</MTypography>
                            </MBox>
                            <MBox className={`${classes.bgBubble} lgBubble`}></MBox>
                            <MBox className={`${classes.bgBubble} smBubble`}></MBox>
                        </MBox>
                    </MGrid>
                    <MGrid item md={4} lg={3} sm={6} xs={12}>
                        <MBox className={`${classes.statCard} orange`} p={2.5} display="flex" alignItems="center" justifyContent="space-between">
                            <MBox className="icon">
                                <PeopleAltIcon  fontSize="large" />
                            </MBox>
                            <MBox className="text">
                                <MTypography variant="h5" component="p">{userData.e_balance ? parseInt(userData.e_balance).toFixed(2) : '0.00' } USD</MTypography>
                                <MTypography variant="h6" component="p">E-Wallet Balance</MTypography>
                            </MBox>
                            <MBox className={`${classes.bgBubble} lgBubble`}></MBox>
                            <MBox className={`${classes.bgBubble} smBubble`}></MBox>
                        </MBox>
                    </MGrid>
                    <MGrid item md={4} lg={3} sm={6} xs={12}>
                        <MBox className={`${classes.statCard} sky`} p={2.5} display="flex" alignItems="center" justifyContent="space-between">
                            <MBox className="icon">
                                <PeopleAltIcon  fontSize="large" />
                            </MBox>
                            <MBox className="text">
                                <MTypography variant="h5" component="p">0.00 USD</MTypography>
                                <MTypography variant="h6" component="p">Commision Balance</MTypography>
                            </MBox>
                            <MBox className={`${classes.bgBubble} lgBubble`}></MBox>
                            <MBox className={`${classes.bgBubble} smBubble`}></MBox>
                        </MBox>
                    </MGrid>
                    <MGrid item md={4} lg={3} sm={6} xs={12}>
                        <MBox className={`${classes.statCard} red`} p={2.5} display="flex" alignItems="center" justifyContent="space-between">
                            <MBox className="icon">
                                <PeopleAltIcon  fontSize="large" />
                            </MBox>
                            <MBox className="text">
                                <MTypography variant="h5" component="p">Peacecoin Balance</MTypography>
                                <MTypography variant="h6" component="p">{userData.pc_balance ? parseInt(userData.pc_balance).toFixed(2) : '0.00' }</MTypography>
                            </MBox>
                            <MBox className={`${classes.bgBubble} lgBubble`}></MBox>
                            <MBox className={`${classes.bgBubble} smBubble`}></MBox>
                        </MBox>
                    </MGrid>
                    

                </MGrid>
                    <MBox mt={4}>
                        <MGrid container justify="center" display="flex">
                            <MGrid item md={4} lg={3} sm={6} xs={12} spacing={2}>
                                    {/* <Echart pc_balance={parseInt(userData.e_balance).toFixed(2)} e_balance={parseInt(userData.pc_balance).toFixed(2)} /> */}

                                    {/* <PieChart
                                     data={[
                                    { title: 'PeaceCoin Wallet',value:userData.pc_balance , color: '#ef9318' },
                                    { title: 'E-Wallet Balance', value:userData.e_balance, color: '#00aeef' },
                                    { title: 'Commission Balance', value:userData.commission_balance, color: '#b70606' },
                                 ]} /> */}
                                 
                                   <br />
                                     {/* <MTypography variant="h5" align="center" mt={2} component="p">Total Balance  {totalBalance.toFixed(2)} </MTypography> */}
                                 
                            </MGrid>                
                        </MGrid>
                    </MBox>
                   
            </MBox>
        </>
    );
}

export default WalletSummary;