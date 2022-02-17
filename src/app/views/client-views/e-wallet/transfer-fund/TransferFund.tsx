import React from 'react';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import {
    MGrid,
    MBox,
    MTypography,
    MPaper
} from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import Box from "@material-ui/core/Box";
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import useStyles from './TransferFundStyle';

function TransferFund(props:any) {
    return (
        <div>
              <Box className="pageHeader">
              <Typography className="mainHeading" gutterBottom component="h1" variant="h4">Transfer Funds</Typography>
              <RouterBreadcrumbs />
          </Box>
          <MBox className="contentBox" component={MPaper}>
              <div>
                  <Grid container spacing={3}>
                      <Grid item md={12} lg={6}>
                          <MBox border={1} borderColor="grey.500" boxShadow={2} borderRadius={6} p={3}>
                              <MBox display={"flex"} alignItems={"center"}>
                                  <MBox className={"teamInfo"}>
                                  <Typography className="mainHeading" gutterBottom component="h4" variant="h4">Sending and Receiving Funds</Typography>

                                      <MTypography variant={"body2"}> Transfer <span style={{color:'red'}}>funds</span> from one wallet to another.</MTypography>
                                      <MTypography variant={"body2"}> <span style={{color:'red'}}>Minimum 1 USD</span> and <span style={{color:'red'}}>Maximum 1000 USD</span>  can be transferred in one day.</MTypography>
                                  <br/>
                                  <MTypography variant={"body2"}> <span style={{color:'red'}}>0.0%</span>transfer charges will apply per transaction.</MTypography>
                                  <br/>
                                  <MTypography variant={"body2"}>For sending, Enter the username and email of the recipient and choose the amount to send. After you confirm the numbers, triple check them to avoid silly mistakes then hit “transfer funds”.</MTypography>
                                  <br/>
                                    <MTypography variant={"body2"}>Use values with up to two decimal positions</MTypography>
                                  </MBox>
                                </MBox>
                          </MBox>
                      </Grid>
                      <Grid item md={12} lg={6} >
                          <MBox border={1} borderColor="grey.500" boxShadow={2} borderRadius={6} p={3}>
                              <MBox display={"flex"} flexWrap={'wrap'} alignItems={"center"}>
                               
                                  <MBox className={"teamAvatar"} mt={2} mr={2} flexGrow={1}>
                                    <TextField
                                    id="standard-basic"
                                    label="Recipient username"
                                    fullWidth
                                    InputProps={{
                                     startAdornment: (
                                      <InputAdornment position="start">
                                        <AccountCircle />
                                      </InputAdornment>
                                     ),
                                    }}
                                    />
                                  </MBox>
                                  <MBox className={"teamAvatar"} mt={2} mr={2} flexGrow={1}>
                                      <TextField
                                          id="standard-basic"
                                          label="Recipient Email"
                                          fullWidth
                                          InputProps={{
                                              startAdornment: (
                                                  <InputAdornment position="start">
                                                      <MailOutlineIcon />
                                                  </InputAdornment>
                                              ),
                                          }}
                                      />
                                  </MBox>
                                  <MBox className={"teamAvatar"} mt={2} mr={2} flexGrow={1}>
                                      <TextField
                                          id="standard-basic"
                                          label="Amount"
                                          fullWidth
                                          InputProps={{
                                              startAdornment: (
                                                  <InputAdornment position="start">
                                                      <AttachMoneyIcon />
                                                  </InputAdornment>
                                              ),
                                          }}
                                      />
                                  </MBox>
                              </MBox>
                                <MBox mt={3} display="flex" justifyContent="center" className={"teamInfo"}>
                                      <Button variant="contained" color="primary">Transfer</Button>
                                  </MBox>
                              
                            
                          <br></br><br></br>
                          Transaction Fee: <span style={{color:'red'}}>Minimum 1 USD</span>
                        <MTypography variant={"body2"}>Use values with up to two decimal positions</MTypography>
                          </MBox>

                          
                      </Grid>

                  </Grid>
              </div>
          </MBox>
        </div>
    );
}

export default TransferFund;