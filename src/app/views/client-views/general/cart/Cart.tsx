import {useState,useEffect} from 'react'
import { MBox, MTypography, MPaper } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import {NavLink} from 'react-router-dom'
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStyles from './CartStyles'
import Avatar from '@material-ui/core/Avatar';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Button from '@material-ui/core/Button';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import { IconButton } from '@material-ui/core';
import {useSelector,useDispatch} from "react-redux";
import {updateCart} from "src/app/store";
import {showAlert} from "src/app/store";
import {useHistory} from "react-router-dom";

function Cart() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const[cartItems, setCartItems] = useState<null | any>([]);
    const history = useHistory();

    // const itemsPrice = cartItems.reduce((index, value) => index + value.qty * value.price, 0);
    let tax = 10;
    const cartObject = useSelector((store: any) => store.cart.cart_items);
     
     useEffect(() => {
         sessionStorage.removeItem('browserpkg');
         let cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
         setCartItems(cartItems);
        },[])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        dispatch(updateCart(cartItems));
    },[cartItems])


    //  Function for Increment to cart Qty
    //  console.log(cartObject,'cartObject')
    const itemQtyIncrement = (cart) =>{
        const exist = cartItems.find((x) => x.uuid === cart.uuid);
        if (exist) {
            exist.category == 'vip' || exist.category == 'ibo' ?
                dispatch(showAlert({
                    message: "You can  add only one quantity of vip & Ibo package",
                    messageType: 'info',
                    showAlertMessage: true
                }))
            :
                setCartItems(
                cartItems.map((x) =>
                    x.uuid === cart.uuid ? {...exist, qty: exist.qty + 1} : x
                )
            );
        } else {
            setCartItems([...cartItems, {...cart, qty: 1}]);
        }

    }
    //  Function for Decrement to cart Qty
    const itemQtyDecrement = (cart) => {
        const exist = cartItems.find((x) => x.uuid === cart.uuid);
        if (exist) {
           if(exist.qty === 1){
               setCartItems(cartItems.filter((x) => x.uuid !== cart.uuid));
           }else{
               setCartItems(
                   cartItems.map((x) =>
                       x.uuid === cart.uuid ? { ...exist, qty: exist.qty - 1 } : x
                   )
               );
           }
        }
    };

    //  Function for Delete to cart Item
    const deleteItem = (cart) => {
        if(cart.category === 'vip'){
            setCartItems(cartItems.filter((x) => x.uuid !== cart.uuid));
        }else{
            setCartItems(cartItems.filter((x) => x.uuid !== cart.uuid));
            dispatch(showAlert({
                message: "Product deleted from cart",
                messageType: 'error',
                showAlertMessage: true
            }));
        }

    };
         
         function checkcondition(category,item,obj){
           if (category =='smart_pay')
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
            else if (category=='apparels')
               {
                   // console.log(obj.app_iamges,'sdddddddddddddddddddddddddd sdfffffffffffff sdffffffffffff sdffffffffff sdfffff')
                return obj.app_iamges[0].image_path;

               }

            else if(category=='vip'){
                 return '/img/vip_pak.png'
            }


    
         }

    //      for check vip and ibo
    const ViewSummery = ()=>{
        let checkVip =  cartItems.find(item => item.category == 'vip');
        checkVip === undefined ? checkVip = '0' : checkVip = '1';
        let checkIbo =  cartItems.find(item => item.category == 'ibo') ;
        checkIbo === undefined ? checkIbo = '0' : checkIbo = '1';
        if(checkIbo === '1' && checkVip === '0'){
            dispatch(showAlert({
                message: "Purchase Vip for IBO Subscription",
                messageType: 'error',
                showAlertMessage: true
            }));
        }else{
            history.push('/client/order-summary')
        }
    }

    return (
        <div>
            <MBox className="pageHeader">
				<MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Cart</MTypography>
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


                                { cartObject.map((item:any) => (
                                    <TableRow key={item.uuid }>

                                        {/*title of product*/}

                                        <TableCell>
                                            <MBox display="flex" alignItems="center">
                                                <Avatar alt="Remy Sharp" className={classes.avatar} variant="square" src={checkcondition(item.category,item.title,item)} />
                                                       
                                                <MBox ml={2}>
                                                    <MBox>{item.title}</MBox>
                                                    {
                                                        (item?.selectedSize && item?.selectedSize) &&
                                                        <>
                                                            <MBox>Size  : {item?.selectedSize}</MBox>
                                                            <MBox>Color : {item?.selectedColor}</MBox>
                                                        </>
                                                    }
                                                    <IconButton onClick={()=>{deleteItem(item)}}><DeleteOutlineOutlinedIcon className={classes.delIcon}/></IconButton>
                                                </MBox>
                                            </MBox>
                                        </TableCell>


                                        {/*Price of product*/}
                                        <TableCell align="right">{parseFloat(item.price).toFixed(2)}</TableCell>

                                        {/*Price of product*/}
                                        <TableCell align="center">
                                            <MBox display="flex" justifyContent="center" alignItems="center">
                                                <IconButton onClick={()=>{itemQtyDecrement(item)}}> <RemoveRoundedIcon fontSize="small"/></IconButton>
                                                <MBox mx={1}>{item.qty}</MBox>
                                                <IconButton onClick={()=> itemQtyIncrement(item)}>
                                                    <AddRoundedIcon fontSize="small"/>
                                                </IconButton>
                                            </MBox>
                                        </TableCell>
                                        { /*Quantity of product and Action Button*/ }
                                       <TableCell align="right">{(parseFloat(item.price) * parseFloat(item.qty)).toFixed(2)}</TableCell>
                                       
                                       
                                    </TableRow>
                                ))}
                                <br></br>


                            </TableBody>

                        </Table>

                        <MBox align="right" my={3} mr={2}>
                            {/*<NavLink exact to="/client/order-summary"><Button variant="contained" className="btnMedium" color="secondary" onClick={ViewSummery()}>View Summary</Button></NavLink>*/}
                           <Button variant="contained" className="btnMedium" color="secondary" onClick={ViewSummery}>View Summary</Button>
                        </MBox>
                    </TableContainer>
                    :
                    <MTypography>Cart is empty</MTypography>
                }
            </MBox>
        </div>
    )
}

export default Cart
