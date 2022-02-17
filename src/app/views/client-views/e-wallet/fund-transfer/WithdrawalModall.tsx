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

export default function AlertDialog(props:any) {
const classes = useStyles(); 
const [otp, setOtp]=React.useState(false)
const[tax, setTax]=React.useState('')
const [loading, setLoading]=React.useState(false)
const [coins, setCoins]=React.useState<any | null>([])
const [userData, setUserData]=React.useState<any | null>({})
const baseUrl = process.env.REACT_APP_API_END_POINT;
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
  const [validateAmount, setValidateAmount]=React.useState(false)

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });
  
  function listTransactions(){
  setLoading(true);
        axios.get(baseUrl + '/withdraw_popup_data')
            .then(function (res) {
                if(res.status === 200){
                    setUserData(res.data.user);
					setTax(res.data.withdraw_charges)
					setCoins(res.data.coins)
                    // setTotalPages(res.data['transactions']['last_page']);
                }
            })
            .catch(function (error) {
                console.log('error transactions', error)
            })
            .then( ()=> setLoading(false));
    }
    console.log(userData)
		useEffect(()=>{
  		listTransactions();
 }, [])
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleClose = () => {
    props.setOpen(false);
  };
   const changeHandler = (e:any) => {
		const { name, value } = e.target;
		console.log(typeof +withdraw.amount)
		if(withdraw.amount < userData.pc_balance){
			setValidateAmount(false)
			setWithDraw(prevState => ({
			...prevState,
			[name]: value,
			}));
		}
		else{
          	setValidateAmount(true)
			setWithDraw(prevState => ({
			...prevState,
			}));
		}
    };

        // const takeAutocCompleteValue=(event, value)=>{
        //   setWithDraw(prevState=>({
        //      ...prevState,
        //      [withdraw.cointype]:value
        //   }))
        //   withdraw.cointype=value
        // }
        console.log(withdraw)
      const nextModal =()=>{
			if(withdraw.cointype =='' || withdraw.cointype ==null )  
				{
				alert('Please fill the Coin field')
				}
			if(withdraw.user_id_email =='' || withdraw.user_id_email ==null)
			{
				alert('Please fill the email/id field')
			}
			else if(withdraw.amount ==+'' || withdraw.amount ==null )
			{
				alert('Please fill the amount')
			}
			else if(withdraw.amount > userData.pc_balance )
			{
				alert('Invalid Amount Entr')
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
		fullWidth
		className={classes.root}
		
		// maxWidth="md"
      >
        
       <MBox display="flex" justifyContent="space-between">
		    <DialogTitle id="alert-dialog-title">{"Withdraw Coin"}</DialogTitle>       
         	<Button onClick={handleClose} color="primary" autoFocus><AiOutlineClose color='#000' /></Button>
		</MBox>    
        <DialogContent >
			<MBox mb={4}>
				<Autocomplete
				id="combo-box-demo"
				options={coins}
	            defaultValue={coins.find(v => v.name[0])} 
       			onChange={changeHandler}
				value={withdraw.cointype}
				getOptionLabel={(option:any) => option.name}
				size='small'
				renderInput={(params) => <TextField {...params} label="Select Coin" variant="outlined" />}
			
				/>
        {withdraw.cointype}
			</MBox>
				<MBox my={4}>                
					<TextField id="outlined-basic" fullWidth size="small"  value={withdraw.user_id_email}  name="user_id_email" onChange={changeHandler} label='Enter the User Id' variant="outlined"
					/>
					  
          {/* {withdraw.user_id_email} */}
			</MBox>
			<MBox my={4} position="relative">                
 				<TextField defaultValue={2}  id="outlined-basic" fullWidth  type='number' size="small" value={withdraw.amount} label='Withdraw Amount' name="amount"  onChange={changeHandler}  InputProps={{
					 endAdornment: <InputAdornment position="end"><img width="20px" src='/img/client-dashboard/pc-symbol.png'></img></InputAdornment>,
					}} variant="outlined"
				 />

          <MBox color="red" fontWeight="fontWeightMedium" style={{display:validateAmount? 'block' :'none'}}>Entered Amount is greater than current Balance {userData.pc_balance}</MBox>
          {/* {withdraw.amount} */}
				 <MBox className={classes.floatTextInfoTop}>{userData.pc_balance - withdraw.amount} PC 	<MBox className={classes.lighcolor} >Available Amount ?	</MBox ></MBox>
				 {/* <MBox className={classes.floatTextInfoBottom}>100 PC/100 PC <MBox className={classes.lighcolor}>24h remaining limit</MBox ></MBox> */}
			</MBox>
			<MBox fontWeight={700}>
				<Typography color="primary"  variant="h6">Receive Amount</Typography>
			</MBox>

			<MBox display="flex" justifyContent="space-between" alignItems="center">
               <MBox display="flex" flexDirection="column" width="50%">
				   <Typography variant="h6" >{withdraw.amount - ((+tax/100) * withdraw.amount)}</Typography>
				   <MBox display="flex" justifyContent="space-between">
					   <MBox className={classes.textFontWeight}><Typography color="primary">{(+tax/100) * withdraw.amount} PC as Tax ({tax}%)</Typography></MBox>
					   <MBox className={classes.textFontWeight}>Fee Included</MBox>
				   </MBox>
			   </MBox>
			   <MBox>
				   <Button onClick={nextModal} variant="contained" size="small" color="primary">Withdraw</Button>
			   </MBox>
			</MBox>
        </DialogContent>
        <MBox m={3} className={classes.checkboxContainer} background={"#afffaf"}  p={1} borderRadius="5px">

		    <FormControlLabel
        	control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Please make sure that email/user id on invex matches the email/user id entered above to avoid withdrawal losses"
      />
        </MBox>
		
      </Dialog>
	  <OtpModal open={otp} object={withdraw} setOpen={setOtp}/>
    </div>
  );
}
