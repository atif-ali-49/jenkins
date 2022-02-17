import React,{useEffect,useState} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import CartCard from './CartCard';
import { NavLink } from 'react-router-dom';
import {useHistory} from "react-router-dom";
import {showAlert, updateFrontCart} from "../../store";
import {useDispatch} from "react-redux";

function Cart() {
    const history = useHistory();
	const dispatch = useDispatch();
	const[frontCart,setFrontCart]= useState<null | any >([]);
	const[shippingChargers , setShippingCharges] = useState(0);
	useEffect(()=>{
		let get_cartItems = JSON.parse(localStorage.getItem('front_cart') || '[]');
		get_cartItems.length !==0 && setFrontCart(get_cartItems);
	},[]);
	// for calculate price or subtotal of a order
	const itemsPrice = frontCart.reduce((index, value) => index + value.qty * value.price, 0);
	const tax = frontCart.reduce((index, value) =>  index + ( value.price * value.tax/100 )*value.qty, 0);
	const shipping_charges = frontCart.reduce((index, value) => index + value.qty * value.shipping_charges, 0);

	useEffect(() => {
		localStorage.setItem('front_cart', JSON.stringify(frontCart));
		dispatch(updateFrontCart(frontCart));
	},[frontCart]);

	//  Function for Increment to cart Qty

	const itemQtyIncrement = (cart) =>{
		const exist = frontCart.find((x) => x.uuid === cart.uuid);
		if (exist) {
			setFrontCart(
				frontCart.map((x) =>
					x.uuid === cart.uuid ? {...exist, qty: exist.qty + 1} : x
				)
			);
		} else {
			setFrontCart([...frontCart, {...cart, qty: 1}]);
		}
	}

	//  Function for Decrement to cart Qty
	const itemQtyDecrement = (cart) => {
		const exist = frontCart.find((x) => x.uuid === cart.uuid);
		if (exist) {
			if(exist.qty === 1){
				setFrontCart(frontCart.filter((x) => x.uuid !== cart.uuid));
			}else{
				setFrontCart(
					frontCart.map((x) =>
						x.uuid === cart.uuid ? { ...exist, qty: exist.qty - 1 } : x
					)
				);
			}
		}
	};
	//  Function for Delete to cart Item
	const deleteItem = (cart) => {
		setFrontCart(frontCart.filter((x) => x.uuid !== cart.uuid));
		dispatch(showAlert({
			message: "Product deleted from cart",
			messageType: 'error',
			showAlertMessage: true
		}));
	};
	// for set shipping charges
	const  setShippCharges  =  (shippingCharges) =>{
       sessionStorage.setItem('shippingCharges',shippingCharges)
	}
	return (
		<section id="cart" className="section">
			<Container>
				<Row>
                    <Col className="text-center" lg={12}>
					   <h1 className="font-weight-light">Welcome to your Cart</h1>
					   <hr></hr>
					</Col>
					{
						frontCart.length > 0 ?
						<Col lg={9}>
							{
								frontCart.map((item) =>
									<CartCard
										key={item.id}
										apparels={item}
										img={item.app_iamges !== null ? item.app_iamges : 'imageNot'}
										shipping_charges={item.shipping_charges}
										setShippingCharges={setShippingCharges}
										itemQtyIncrement={itemQtyIncrement}
										itemQtyDecrement={itemQtyDecrement}
										deleteItem={deleteItem}
										itemTx={item.tax}
										itemPrice={item.price}
										itemQty = {item.qty}

									/>
								)
							}
						</Col>:

                            <>
							<Col lg={9} className='text-center mx-auto'>

								<h1>Your Cart is Empty</h1>
								<div className="mt-20 text-white">
									<NavLink exact to="/product"><button className="btn btn-warning f-16  border-radius-0 text-white">Continue Shopping</button></NavLink>
								</div>
							</Col>
								{/*{setDisableBtn(true)}*/}
							</>

					}

					{
						frontCart.length > 0 &&
						<Col lg={3}>
						<div className="total-cover my-3 text-right">
							{/*<small>We calculate 10.25% tax on subtotal</small>*/}
							<div className="mt-3 d-flex justify-content-between">
								<p className="text-muted m-0">SubTotal</p>
								<h6>${parseFloat(itemsPrice).toFixed(2)}</h6>
							</div>
							<div className="mt-3 d-flex justify-content-between">
								<p className="text-muted m-0">Shipping Charges</p>
								<h6>${shipping_charges.toFixed(2)}</h6>
							</div>

							<div className="mt-3 d-flex justify-content-between">
								<p className="text-muted m-0">Tax</p>
								<h6>${tax.toFixed(2)}</h6>
							</div>
							<div className="mt-3 d-flex justify-content-between">
								<p className="text-muted m-0 f-16"><b>Grand Total</b></p>
								<h6>
									<b>${((itemsPrice + shipping_charges) + tax).toFixed(2)}</b>
								</h6>
							</div>
							<hr></hr>
							<div className="mt-20">

								<NavLink exact to="/client/payment/type">
									<button className="btn btn-secondary f-16 btn-block border-radius-0"
											onClick={() => setShippCharges(shippingChargers)}>Proceed to checkout
									</button>
								</NavLink>
							</div>
						</div>

					</Col>}
				</Row>
			</Container>
		</section>
	)
}

export default Cart
