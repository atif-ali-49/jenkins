import React from 'react';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    MGrid,
    MBox,
    MTypography,
    MPaper

} from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import Box from "@material-ui/core/Box";
import useStyles from './DepositFundStyle'
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";

function DepositFund(props:any) {
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event:any) => {
      setAge(event.target.value);
    };
    return (
      <>
          <Box className="pageHeader">
              <Typography className="mainHeading" gutterBottom component="h1" variant="h4">Deposit Funds</Typography>
              <RouterBreadcrumbs />
          </Box>
          <MBox className="contentBox" component={MPaper}>
              <div>
                  <Grid container spacing={2}>
                      <Grid item md={12} lg={7}>
                          <MBox border={1} borderColor="grey.500" boxShadow={2} borderRadius={6} p={3}>
                              <MBox display={"flex"} alignItems={"center"}>
                                  <MBox className={"teamInfo"}>
                                  <Typography className="mainHeading" gutterBottom component="h6" variant="h4">Peacecoin</Typography>

                                      <MTypography variant={"body2"}>The Peacecoin Inc. Company offers PEACE Cryptocurrencies, the Peacecoin Club membership and precious high valued metals through its own manufacturing company, the Peacecoin Jewelry Inc. Peacecoin Technologies & I.T. deploys 24/7 live secure and reliable servers across four strategic continents and countries which collectively powers what is known as the “PEACECOIN MOVEMENT”.</MTypography>
                                  </MBox>
                                </MBox>

                                <MBox display={"flex"} alignItems={"center"}>
                                    <MBox className={"teamAvatar"} mt={2} flexGrow={1}>
                                       <Typography className="mainHeading" gutterBottom component="h1" variant="h6">Bank Account Details</Typography>
                                       <MTypography variant={"body2"}>Bank: Bank of America </MTypography>
                                       <MTypography variant={"body2"}>A/C Title: PEACECOIN INC</MTypography>
                                       <MTypography variant={"body2"}>A/C Number: 3251415000500</MTypography>
                                       <MTypography variant={"body2"} pt={5}>Bank: Bank of America </MTypography>
                                       <br></br><br></br>
                                       
                                       <MTypography variant={"body2"}>Routing Number: 121000358</MTypography>
                                       <MTypography variant={"body2"}>Swift Code: B0FAUS3N </MTypography>
                                    </MBox>

                                   

                                    <MBox className={"teamAvatar"} mt={2}>
                                       <MTypography variant={"body2"}>Address</MTypography>
                                       <MTypography variant={"body2"}>127 S Brand Blvd., STE B102</MTypography>
                                       <MTypography variant={"body2"}>Glendale CA 91204</MTypography>
                                    </MBox>
                                     
                                   </MBox>
                          </MBox>
                      </Grid>
                      <Grid item md={12} lg={5}>
                          <MBox border={1} borderColor="grey.500" boxShadow={2} borderRadius={6} p={3}>
                              <MBox display={"flex"} justifyContent="center" flexWrap="wrap" alignItems={"center"}>
                               
                                    <MBox className={"teamAvatar"} mr={2}>
                                        <TextField id="standard-basic" label="Amount" />
                                    </MBox>
                                    <MBox className={"teamInfo"}>   
                                            <FormControl >
                                                <Autocomplete
                                                    id="Currency"
                                                    options={currencySymbols}
                                                    getOptionLabel={(option) => option.title}
                                                    style={{ width: 200 }}

                                                    renderInput={(params) => <TextField {...params} label="Currency"  />}
                                                />
                                        </FormControl>                    
                                   </MBox>                                 
                              </MBox>
                              
                              <MBox display="flex" mt={5} justifyContent="center" alignItems={"center"}>
                                <Button variant="contained" color="primary">
                                Submit
                               </Button>
                              
                          </MBox>
                          <br></br><br></br>
                              <MTypography variant={"body2"}>Use values with up to two decimal positions</MTypography>
                          </MBox>

                          
                      </Grid>

                  </Grid>
              </div>
          </MBox>
      </>
    );
}
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const currencySymbols = [
    { title: 'Eth', year: 1994 },
    { title: 'BTC', year: 1972 },
    { title: 'USD', year: 1974 },

];

export default DepositFund;