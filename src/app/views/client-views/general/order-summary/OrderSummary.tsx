import React, {useState,useEffect} from 'react'
import { MBox, MTypography, MPaper } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStyles from './OrderSummaryStyles'
import Button from '@material-ui/core/Button';
import {Link, NavLink,useHistory} from 'react-router-dom';
import {useSelector} from "react-redux";
import Avatar from "@material-ui/core/Avatar";


const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

function createRow(desc: string, qty: number, unit: number) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

interface Row {
  desc: string;
  qty: number;
  unit: number;
  price: number;
}

function subtotal(items: Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;


function OrderSummary() {
    const classes = useStyles();
    const history = useHistory();
    const cartObject = useSelector((store: any) => store.cart.cart_items);
    const itemsPrice = cartObject.reduce((index, value) => index + value.qty * value.price, 0);
    const tax = cartObject.reduce((index, value) =>  index + ( value.price * value.tax/100 )*value.qty, 0);
    const shipping_charges = cartObject.reduce((index, value) => index + value.qty * value.shipping_charges, 0);
    // let tax = (10.25/100) * itemsPrice;
    const[add, newadd]=useState(1)
    const [state, setState] = React.useState({
        checkedB: false,
       
      });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    let color = cartObject.find((item)=> item?.category == 'apparels');
    function addtion(){
      
   return newadd((add + 1))
         
    }
    function minus(){
        if(add > 1){
        return newadd((add - 1))
        }
    }
    function goToCheckout(){
        let order = {
            'order':{
                'subtotal': itemsPrice,
                 'total': parseFloat(itemsPrice + tax + shipping_charges).toFixed(2)
            },
        }
          let encrypted = CryptoJS.AES.encrypt( JSON.stringify(order), "Secret Passphrase");
          // @ts-ignore
          localStorage.setItem('browserKey', encrypted);
          history.push('/client/checkout');

    }
    function checkcondition(category,item,obj){
           if (category==='smart_pay')
            {
              if (item.includes('Silver')){
              return '/img/silver_pak.png'
              }
              else if (item.includes('Gold')){
              return '/img/gold_pak.png'
              }
              else{
              return '/img/platenum.png'
              }

            }
            else if (category==='apparels')
               {
                return obj.app_iamges[0].image_path;
               }
            else{
                 return '/img/vip_pak.png'
            }
         }

    return (

        <div>
            <MBox className="pageHeader">
				<MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Order Summary</MTypography>
				<RouterBreadcrumbs />
            </MBox>   
            <MBox className="contentBox" component={MPaper}>
                {cartObject.length ?

                    <TableContainer className={classes.tableContainer} component={Paper}>
                        <Table className={classes.table} aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>


                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="center">Qty.</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>


                                { cartObject.map((item) => (
                                    <TableRow key={item.id}>

                                        {/*title of product*/}

                                        <TableCell>
                                            <MBox display="flex" alignItems="center">
                                                <Avatar alt="Remy Sharp" className={classes.avatar} variant="square"
                                                        //  src={item.image ? item.image: 'https://peacecoin.io/app-assets/images/products/1613458630.png'}
                                                          src={checkcondition(item.category,item.title,item )}
                                                         /> 
                                                <MBox ml={2}>
                                                    <MBox>{item.title}</MBox>
                                                    {
                                                        (item?.selectedSize && item?.selectedSize) &&
                                                       <>
                                                           <MBox>Size  : {item?.selectedSize}</MBox>
                                                           <MBox>Color : {item?.selectedColor}</MBox>
                                                       </>
                                                    }
                                                    {/* <MBox>{item.tax}</MBox> */}
                                                </MBox>
                                            </MBox>
                                        </TableCell>

                                        {/*Price of product*/}
                                        <TableCell align="right">{item.price}</TableCell>

                                        {/*Price of product*/}
                                        <TableCell align="center">
                                            <MBox display="flex" justifyContent="center" alignItems="center">
                                                <MBox mx={1}>{item.qty}</MBox>

                                            </MBox>
                                        </TableCell>


                                        { /*Quantity of product and Action Button*/ }
                                        <TableCell align="right">{item.price * item.qty}</TableCell>
                                    </TableRow>
                                ))}
                                <br></br>


                            </TableBody>

                        </Table>
                        <MBox display="flex" mt={1} mb={3} justifyContent="flex-end">
                          {/*<MBox>We charge {cartObject[0].tax}% on each purchase with respect to subtotal. </MBox>*/}
                        </MBox>

                        <MBox display="flex" my={1} justifyContent="flex-end">
                            
                            <MBox className={classes.cartTotalCover} display="flex" justifyContent="space-between">
                                <MTypography className="mainHeading" gutterBottom component="h4"
                                             variant="body1">Subtotal</MTypography>
                                <MTypography className="mainHeading" gutterBottom component="h4"
                                             variant="body1">${itemsPrice.toFixed(2)}</MTypography>
                            </MBox>
                        </MBox>

                        <MBox display="flex" my={1} justifyContent="flex-end">
                            <MBox className={classes.cartTotalCover} display="flex" justifyContent="space-between">
                                <MTypography className="mainHeading" gutterBottom component="h4" variant="body1">Tax</MTypography>
                                <MTypography className="mainHeading" gutterBottom component="h4" variant="body1">${tax.toFixed(2)}</MTypography>
                            </MBox>
                        </MBox>

                        <MBox display="flex" my={1} justifyContent="flex-end">
                            <MBox className={classes.cartTotalCover} display="flex" justifyContent="space-between">

                                <MTypography className="mainHeading" gutterBottom component="h4" variant="body1">Shipping Charges</MTypography>
                                <MTypography className="mainHeading" gutterBottom component="h4" variant="body1">${parseFloat(shipping_charges).toFixed(2)}</MTypography>
                            </MBox>
                        </MBox>

                        <MBox display="flex" my={1} justifyContent="flex-end" align="right">
                            <MBox className={classes.cartTotalCover} display="flex" justifyContent="space-between">
                                <MTypography gutterBottom component="h4" variant="body1"><b>Total </b></MTypography>
                                <MTypography gutterBottom component="h4" variant="body1"><b>${parseFloat(itemsPrice + tax + shipping_charges).toFixed(2)}</b></MTypography>
                            </MBox>
                        </MBox>


                        <MBox display="flex" my={3} justifyContent={"space-between"} alignItems={"center"}>
                            <NavLink exact to="/client/cart">
                                <Button variant="outlined" className="btnMedium" color="primary">
                                    Back
                                </Button>
                            </NavLink>
                           <Button variant="contained" className="btnMedium" color="secondary" onClick={()=>goToCheckout()}>
                               Place Order
                           </Button>
                        </MBox>

                    </TableContainer>
                    :
                    <MTypography>Cart is empty</MTypography>
                }
            </MBox>
        </div>
    )
}

export default OrderSummary
