import './Apparel.scss';
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {showAlert, cryptoCart} from "../../../store";
import axios from "axios";

function Apparel(props:any) {
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const[apparels,setApparels] = useState<null | any>([]);
    const [storageArray,setStorageArray] =  useState<null | any>([]);
    const [temp, setTemp] = useState(false);
    const [cartItems, setCartItems] = useState<null | any>([]);
    const dispatch  = useDispatch();
    const[loading,setLoading] = useState(true);
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
    // for getting all type  of apparels
    const getApparels = () =>{
        axios.get(baseurl+'/apparels')
            .then(function (response) {
                // handle success
                setApparels(response.data.apparels)

            })
            .catch(function (error) {
                console.log(error)
            })
            .then(function () {
                setLoading(false);
            });
    }
    // for add to cart products
    useEffect(()=>{
        getApparels();
    },[]);
    const addToCart = (apparel:any) => {
        setTemp(true);
        const exist = cartItems.find((x:any) => x.id == apparel.id);
        if (exist) {
            // console.log('in exist in apparels')
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
            // console.log('not in exist in apparels')
            setCartItems([...cartItems, {...apparel, qty: 1}]);
            dispatch(showAlert({
                message: "Apparel added to cart successfully",
                messageType: 'success',
                showAlertMessage: true
            }));
        }

    }
    const selectColor = (event,apparel:any) =>{
        // console.log(event.target.value)
        if(event.target.value == 'color'){
            apparel.hasOwnProperty('selectedColor') && delete apparel.selectedColor;
        }else{
            setApparels(
                apparels.map((x:any) =>
                    x.id == apparel.id ? {...apparel, selectedColor: apparel.selectedColor = event.target.value} : x
                )
            );
        }
    }
    const selectSize = (event,apparel:any) =>{
        if(event.target.value == 'size'){
            apparel.hasOwnProperty('selectedSize') && delete apparel.selectedSize;

        }else{
            setApparels(
                apparels.map((x:any) =>
                    x.id == apparel.id ? {...apparel, selectedSize: apparel.selectedSize = event.target.value} : x
                )
            );
        }
    }
    // console.log(apparels,'apparels apparels')
    return (
        <div id="product">

         <div className="container">
            <div className="row">
                <div className="col-12 text-center">
                    <h1 className="mb-5">Designer style men and women polo shirts</h1>
                    <h4>Order Today your Peacecoin Apparel for Men and Women available in all sizes. Peacecoin Apparel
                        is proud to introduce its line of high quality custom designer Polo Shirts both for Men and
                        Women made by Peacecoin Apparel for Peacecoin. </h4>
                </div>
            </div>
            <div className="row justify-content-center mt-5">

                {
                    loading ?
                        <div className="spinner-border text-warning" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        :
                    apparels.length !== 0 ?
                        apparels.map((item) =>

                            <div className="col-lg-3 col-md-4 col-sm-6" key={item.id}>
                                <div className="product-grid">
                                    <div className="product-image">
                                        <a href="#" className="image">
                                            {
                                                item.app_iamges.map((img)=>
                                                    <img className="pic-1" src={img.image_path}></img>
                                                )
                                            }

                                            {/*<img className="pic-2" src="https://media.peacecoin.io/product1.png"></img>*/}
                                        </a>
                                        <span className="product-hot-label">Price ${item.price}</span>
                                        {/* <ul className="product-links">
                                            <li><a href="#" data-tip="Add to Wishlist"><i className="fa fa-heart"></i></a></li>
                                            <li><a href="#" data-tip="Compare"><i className="fa fa-random"></i></a></li>
                                            <li><a href="#" data-tip="Quick View"><i className="fa fa-search"></i></a></li>
                                        </ul> */}
                                    </div>

                                    <div className="product-content">
                                        <h3 className="title"><a href="#">{item.title}</a></h3>
                                        {
                                            JSON.parse(item?.size).length !== 0 &&
                                            <select className="form-select m-2" aria-label="Default select example" onChange={(e)=>selectSize(e,item)}>
                                                {
                                                    <>
                                                        <option selected>size</option>
                                                        {
                                                            JSON.parse(item?.size).map((size) => <option value={size}>{size}</option> )
                                                        }
                                                    </>
                                                }
                                            </select>
                                        }
                                        {
                                            JSON.parse(item?.color).length !== 0 &&
                                            <select className="form-select m-2" aria-label="Default select example" onChange={(e)=>selectColor(e,item)}>
                                                {
                                                    <>
                                                        <option selected>color</option>
                                                        {
                                                            JSON.parse(item?.color).map((colors) => <option value={colors} >{colors}</option> )
                                                        }
                                                    </>
                                                }
                                            </select>
                                        }
                                        <button data-toggle="modal" onClick={()=> addToCart(item)} className="btn primaryButton f-16">Add to cart</button>
                                    </div>
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
        <div className="modal fade" id="exampleModalCenterTwo"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content"  style={{backgroundColor:"#dcdbdb"}}>
          <div className="modal-header">
            <h5 className="text-center" id="exampleModalLongTitle">System Upgrades</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body text-center">
                <img src="https://s3.us-east-2.amazonaws.com/b.peacecoin.io/frontend/images/cartwork.svg" className="img-fluid mb-3"></img>
         <h5 className="font-weight-light">Shopping cart temporarily down for system upgrades, <b>will be back in 48 hours!</b></h5>

          </div>

        </div>
      </div>
    </div>
        </div>
    );
}

export default Apparel;