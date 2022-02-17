import './Apparel.scss';
import axios from 'axios';
import {useState,useEffect} from "react";
import {showAlert, updateFrontCart} from "../../store";
import {useDispatch} from "react-redux";
import Chip from '@material-ui/core/Chip';
function Apparel(props:any) {
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const[apparels,setApparels] = useState<null | any>([]);
    const [storageArray,setStorageArray] =  useState<null | any>([]);
    const [temp, setTemp] = useState(false);
    const [cartItems, setCartItems] = useState<null | any>([]);
    const[loading,setLoading] = useState(true);
    const dispatch  = useDispatch();
    // if product exist in cart then set it in existing cartItems state
    useEffect(() => {
        let get_cartItems = JSON.parse(localStorage.getItem('front_cart') || '[]');
        get_cartItems.length !== 0 ?     setStorageArray(get_cartItems):setStorageArray([]);
        get_cartItems.length !== 0  && setCartItems(get_cartItems)

    },[]);
    // for set items in redux and local Storage Amir
    useEffect(() => {
        if(temp) {
            // const cart = [...storageArray, ...cartItems];
            localStorage.setItem('front_cart', JSON.stringify(cartItems));
            setCartItems(cartItems);
            dispatch(updateFrontCart(cartItems));
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

            }).then(()=>{
            setLoading(false);
        });
    }
    // for add to cart products
    useEffect(()=>{
        getApparels();
    },[]);
    const addToCart = (apparel:any) => {
       if(apparel.hasOwnProperty('selectedColor') && apparel.hasOwnProperty('selectedSize') ){
           setTemp(true);
           const exist = cartItems.find((x:any) => x.id == apparel.id);
           if (exist) {
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
       }else{
           dispatch(showAlert({
               message: "Please Select color and size",
               messageType: 'info',
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
             {

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
                                                <img className="pic-1" src={item.app_iamges[0].image_path}></img>                                                                                                                                 
                                         </a>
                                         <span className="product-hot-label">Price ${item.price}</span>
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

                                         {
                                             item.available_qty > 0?
                                             <button data-toggle="modal" onClick={() => addToCart(item)}
                                                     className="btn primaryButton f-16 m-2">Add to cart
                                             </button>
                                         :
                                             <Chip

                                             size="small"
                                             label="Out of Stock"
                                             color="secondary"
                                             />
                                         }

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

             }
        </div>


        </div>
    );
}

export default Apparel;