import React,{useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { MBox, MGrid,MPaper } from 'src/app/components/mui';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from './WithDrawalStyles';
import {AiOutlineClose} from 'react-icons/ai'
import OtpModal from './OtpModal'
import Input from '@material-ui/core/Input';
import axios from 'axios'
import { Formik, Field, Form } from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function AlertDialog(props:any) {
    const classes = useStyles();
    const [otp, setOtp]=React.useState(false)
    const[tax, setTax]=React.useState('')
    const [loading, setLoading]=React.useState(false)
    const [coins, setCoins]=React.useState<any | null>([])
    const [userData, setUserData]=React.useState<any | null>({})
    const baseUrl = process.env.REACT_APP_API_END_POINT;
    const[coinType, setCoinType]=React.useState(1)
    const[userEmail, setUserEmail]=React.useState('')
    const[amount, setAmount]=React.useState <any | null>(null)
    interface IState{
        cointype:string,
        user_id_email:string,
        amount:number,
    }
    const initialState={
        cointype:'',
        user_id_email:'',
        amount:0
    }
    const [withdraw, setWithDraw]=React.useState(initialState);
    const [validateAmount, setValidateAmount]=React.useState(false);
    const [validateEmail, setValidateEmail]=React.useState(false);

    const [state, setState] = React.useState({
        terms_Condition:false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handleClose = () => {
        props.setOpen(false);
        setAmount('');
        setUserEmail('');

    };

    function userEmailHandler(e){
        if(userEmail =='' || userEmail ==null){
            setValidateEmail(true)
            setUserEmail(e.target.value)
        }
        else{
            setValidateEmail(false)
            setUserEmail(e.target.value)
        }
    }
    function amountHandler(e){
        if(e.target.value >= 0){
            if(e.target.value > props.userData.pc_balance) {
                setValidateAmount(true)
            }
            else {
                setValidateAmount(false)
                setAmount(e.target.value)
            }
        }
    }
    const coinHandler = (event) => {
        setCoinType(event.target.value)
    };
    const nextModal =()=>{
        if(userEmail =='' || userEmail ==null)
        {
            setValidateEmail(true)
        }
        else if(amount ==+'' || amount ==null )
        {
            setValidateAmount(true)
        }
        else if(amount > props.userData.pc_balance )
        {
            setValidateAmount(true)
        }
        else
        {props.setOpen(false);
            setOtp(true)
        }
    }
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableBackdropClick
                fullWidth
                className={classes.root}

                // maxWidth="md"
            >

                <MBox display="flex" justifyContent="space-between">
                    <DialogTitle id="alert-dialog-title">{"Withdraw Coin Request"}</DialogTitle>
                    <Button onClick={handleClose} color="primary" autoFocus><AiOutlineClose color='#000' /></Button>
                </MBox>


                {
                    props.userData.twofa_status ?
                        <>
                            <DialogContent >
                                <FormControl   className={classes.formControl} >
                                    <Select
                                        native
                                        onChange={coinHandler}
                                        variant='outlined'
                                        fullWidth

                                        value={coinType}
                                        disabled
                                    >
                                        {/* <option value="nabeel">ok</option>	 */}
                                        {props.coins && props.coins.map((item:any)=>{
                                            return(
                                                <option selected value={item.id} key={item.id}>{item.name}</option>
                                            )})}
                                    </Select>

                                </FormControl>
                                {/* {coinType} */}
                                <MBox my={4}>
                                    <TextField id="outlined-basic" fullWidth size="small"  value={userEmail}  onChange={userEmailHandler} label='PeaceCoin Wallet Address on Invex Exchange' variant="outlined"
                                    />
                                    <MBox color="red" fontWeight="fontWeightMedium" style={{display:validateEmail? 'block' :'none'}}>PeaceCoin Wallet Address on Invex Exchange is Required</MBox>

                                    {/* {withdraw.user_id_email} */}
                                </MBox>
                                <MBox my={4} position="relative">
                                    <TextField  id="outlined-basic" fullWidth  type='number' size="small" value={amount} label='Withdraw Amount'  onChange={amountHandler}  InputProps={{
                                        endAdornment: <InputAdornment position="end"><img width="20px" src='/img/client-dashboard/pc-symbol.png'></img></InputAdornment>,
                                    }} variant="outlined"
                                    />

                                    <MBox color="red" fontWeight="fontWeightMedium" style={{display:validateAmount? 'block' :'none'}}>Entered Amount must be between 1 and {props.userData.pc_balance}.</MBox>
                                    {/* {withdraw.amount} */}
                                    <MBox className={classes.floatTextInfoTop}>{props.userData.pc_balance - amount} PC 	<MBox className={classes.lighcolor} >Available Amount ?	</MBox ></MBox>

                                </MBox>
                                <MBox m={3} className={classes.checkboxContainer} background={"#afffaf"}  p={1} borderRadius="5px">

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={state.terms_Condition}
                                                onChange={handleChange}
                                                name="terms_Condition"
                                                color="primary"
                                            />
                                        }
                                        label="Please make sure that email/user id on invex matches the email/user id entered above to avoid withdrawal losses"
                                    />
                                </MBox>
                                <MBox fontWeight={700}>
                                    <Typography color="primary"  variant="h6">Receive Amount</Typography>
                                </MBox>

                                <MBox display="flex" justifyContent="space-between" alignItems="center">
                                    <MBox display="flex" flexDirection="column" width="50%">
                                        <Typography variant="h6" >{amount - (parseFloat(props.tax)/100) * amount}</Typography>
                                        <MBox display="flex" justifyContent="space-between">
                                            <MBox className={classes.textFontWeight}><Typography color="primary">{(parseFloat(props.tax)/100 ) * amount} PC as Tax ({props.tax}%)</Typography></MBox>
                                            <MBox className={classes.textFontWeight}>Fee Included</MBox>
                                        </MBox>
                                    </MBox>
                                    <MBox>
                                        <Button onClick={nextModal} variant="contained" size="small" color="primary" disabled={!state.terms_Condition}>Proceed</Button>
                                    </MBox>
                                </MBox>



                            </DialogContent>

                        </>
                        :
                        <MBox>
                            <MBox display="flex" justifyContent="center"><img src="/img/client-dashboard/sand-clock.png"></img></MBox>
                            <MBox m={3} textAlign="center" fontSize="18px" color="red"><b>{props.userData.user_message} </b></MBox>
                        </MBox>
                }
            </Dialog>

            <OtpModal open={otp}
                      coinType={coinType}
                      amount={amount}
                      tax={props.tax}
                      userEmail={userEmail}
                      setOpen={setOtp}
                      withDrawList={props.withDrawList}
                      setUserEmail={setUserEmail}
                      setAmount={setAmount}
            />

        </div>
    );
}
