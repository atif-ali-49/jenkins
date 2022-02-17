import React,{useState,useEffect} from 'react';
import './Product.scss';
import axios from 'axios';
import {useDispatch} from "react-redux";
import {showAlert, cryptoCart} from "src/app/store";
function Product(props:any) {
    const[products,setProducts] = useState<any> ([]);
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const [temp, setTemp] = useState(false);
    const [storageArray,setStorageArray] =  useState<null | any>([]);
    const [cartItems, setCartItems] = useState<null | any>([]);
    const[loading,setLoading] = useState(true);
    const dispatch  = useDispatch();
    const getProducts = () =>{
        axios.get(baseurl+'/guest_package')
            .then(function (response) {
                // handle success
                setProducts(response.data.smart_pay_packages)
            })
            .catch(function (error) {
                console.log(error)
            })
            .then(function () {
                setLoading(false);
            });
    }
    // if product exist in cart then set it in existing cartItems state
    useEffect(() => {
        let get_cartItems = JSON.parse(localStorage.getItem('crypto_cart') || '[]');
        get_cartItems.length !== 0 ?     setStorageArray(get_cartItems):setStorageArray([]);
        get_cartItems.length !== 0  && setCartItems(get_cartItems)

    },[]);
    // for set items in redux and local Storage
    useEffect(() => {
        if(temp) {
            // const cart = [...storageArray, ...cartItems];
            localStorage.setItem('crypto_cart', JSON.stringify(cartItems));
            setCartItems(cartItems);
            dispatch(cryptoCart(cartItems));
            setTemp(false);
        }

    }, [cartItems]);
    useEffect(()=>{
        getProducts();
    },[]);

    const addToCart = (apparel:any) => {
        setTemp(true);
        const exist = cartItems.find((x:any) => x.id == apparel.id);
        if (exist) {
            console.log('in exist in apparels')
            setCartItems(
                cartItems.map((x:any) =>
                    x.id == apparel.id ? {...exist, qty: exist.qty + 1} : x
                )
            );
            dispatch(showAlert({
                message: "Apparel added to cart successfully",
                messageType: 'success',
                showAlertMessage: true
            }));
        } else {
            console.log('not in exist in apparels')
            setCartItems([...cartItems, {...apparel, qty: 1}]);
            dispatch(showAlert({
                message: "Apparel added to cart successfully",
                messageType: 'success',
                showAlertMessage: true
            }));
        }

    }
    return (
        <section>
            <div className="demo pb-4"  style={{paddingTop:"50px"}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="text-effect my-5">
                                <h1 className="text-center">Retail Purchase</h1>
                            </div>
                        </div>

                        {
                            loading ?
                                <div className="spinner-border text-warning" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                :
                            products.length > 0 ?
                                products.map((item)=>
                                    <div className="col-lg-4 col-md-6 text-center" key={item.id}>
                                        <div className="pricingTable">
                                            <div className="pricingTable-header">
                                                <h3 className="title">{item.title}</h3>
                                                <div className="price-value">
                                                    <span className="currency">$</span>
                                                    <span className="amount">{item.price}</span>
                                                    <span className="amount-sm">00</span>
                                                </div>
                                            </div>
                                            <ul className="pricing-content">
                                                {
                                                    item.desc.split("/").map((description)=>(
                                                        <li>{description}</li>
                                                    ))
                                                }
                                            </ul>
                                            <button  className="pricingTable-signup" onClick={()=>addToCart(item)}>Add to cart</button>
                                        </div>
                                    </div>
                                )
                                :
                                <div className="row justify-content-center mt-5">
                                    <div className="col-sm-6">
                                        <img className="img-fluid" src="/img/no-data.png" alt='Data Not Found'></img>
                                    </div>
                                </div>
                        }

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Product;