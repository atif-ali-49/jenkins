import React,{useEffect,useState} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import CartCard from './CartCard'
import { NavLink } from 'react-router-dom'
import {useHistory} from "react-router-dom";
import {showAlert, cryptoCart} from "src/app/store";
import {useDispatch} from "react-redux";

function Cart() {
    const history = useHistory();
	const dispatch = useDispatch();
	const[frontCart,setFrontCart]= useState<null | any >([]);
	const[shippingChargers , setShippingCharges] = useState(0);
	useEffect(()=>{
		let get_cartItems = JSON.parse(localStorage.getItem('crypto_cart') || '[]');
		get_cartItems.length !==0 && setFrontCart(get_cartItems);
	},[]);


	// for calculate price or subtotal of a order
	const itemsPrice = frontCart.reduce((index, value) => index + value.qty * value.price, 0);
	// for calculate tax 10.25 percent on a sub total of a order
	let tax = (10.25/100) * itemsPrice;



	useEffect(() => {
		localStorage.setItem('crypto_cart', JSON.stringify(frontCart));
		dispatch(cryptoCart(frontCart));
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

							{frontCart.map((item) =>
								<CartCard
									key={item.id}
									apparels={item}
									img={item.app_iamges !== null ? item.app_iamges : 'imageNot'}
									shipping_charges={item.shipping_charges}
									setShippingCharges={setShippingCharges}
									itemQtyIncrement={itemQtyIncrement}
									itemQtyDecrement={itemQtyDecrement}
									deleteItem={deleteItem}

								/>
							)}

						</Col>:
							<Col lg={9} className='text-center mx-auto'>

								<h1>Your Cart is Empty</h1>
								<div className="mt-20 text-white">
									<NavLink exact to="/crypto/product"><button className="btn btn-warning f-16  border-radius-0 text-white">Continue Shopping</button></NavLink>
								</div>
							</Col>
					}

					{
						frontCart.length > 0 &&
						<Col lg={3}>
						<div className="total-cover my-3 text-right">
							<small>We calculate 10.25% tax on subtotal </small>
							<div className="mt-3 d-flex justify-content-between">
								<p className="text-muted m-0">SubTotal</p>
								<h6>${itemsPrice}</h6>
							</div>
							<div className="mt-3 d-flex justify-content-between">
								<p className="text-muted m-0">Shipping Charges</p>
								<h6>${shippingChargers}</h6>
							</div>

							<div className="mt-3 d-flex justify-content-between">
								<p className="text-muted m-0">Tax</p>
								<h6>${tax.toFixed(2)}</h6>
							</div>
							<div className="mt-3 d-flex justify-content-between">
								<p className="text-muted m-0 f-16"><b>Grand Total</b></p>
								<h6>
									<b>${parseInt(itemsPrice) + parseInt(String(shippingChargers)) + parseInt(String(tax))}</b>
								</h6>
							</div>
							<hr></hr>
							<div className="mt-20">
								<NavLink exact to="/crypto/order/summary">
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
