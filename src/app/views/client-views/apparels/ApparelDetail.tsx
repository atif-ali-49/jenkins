import React, {useEffect, useState} from 'react';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CardMedia from '@material-ui/core/CardMedia';
import {MBox, MGrid, MPaper, MTypography} from '../../../../app/components/mui';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import {useDispatch} from "react-redux";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {updateCart} from "../../../store";
function ApparelDetail(props:any) {
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const[apparelDetail, getApparelDetail]=useState<null | any>({});
    const[color,getColor]= useState<null | any>([]);
    const[setSize,getSize] = useState<null | any>([]);
    // for cart handling
    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState<null | any>([]);
    const [temp, setTemp] = useState(false);
    const [storageArray,setStorageArray] =  useState<null | any>([]);
    // if product exist in cart then set it in existing cartItems state
    useEffect(() => {
        let get_cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        get_cartItems.length ?  setStorageArray(get_cartItems):setStorageArray([]);
        get_cartItems.length ?  setCartItems(get_cartItems):setCartItems([]);
      },[]);
 
    // for set items in redux and local Storage
    useEffect(() => {
        if(temp) {
            const cart = [...cartItems];
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch(updateCart(cart));
            setTemp(false);
        }

    }, [cartItems]);
  
    //  Function for add to cart setting in local  storage
    const addToCart = (apparel:any) => {
        setTemp(true);
        const exist = cartItems.find((x:any) => x.id === apparel.id);
        
        if (exist) {
            setCartItems(
                cartItems.map((x:any) =>
                    x.id === apparel.id ? {...exist, qty: exist.qty + 1} : x
                )
            );

        } else {
            setCartItems([...cartItems, {...apparel, qty: 1}]);
        }

    }
    
    // for get Detail of a
    useEffect(()=>{
       let id =  props.match.params.id
        // Make a request for a apparel with a given ID
        axios.get(baseurl+'/apparels/'+id)
            .then(function (response) {
                if(response.status === 200){
                    getApparelDetail(response.data.apparels)
                    getColor(JSON.parse(response.data.apparels.color))
                    getSize(JSON.parse(response.data.apparels.size))
              }
                
            })
            .catch(function (error) {
                // handle error
            })
            .then(function () {
                // always executed
            });
    },[]);
    
    
    return (

        <div>
            <MBox className="pageHeader">
                <MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Apparels</MTypography>
                <RouterBreadcrumbs />
            </MBox>
            <MBox className="contentBox" component={MPaper}>
                <MGrid
                    container
                    spacing={3}
                    direction="row"
                    justify="center"
                    alignItems="center">

                    {
                        apparelDetail?

                            <>
                                    <MGrid item xs={12} sm={12} md={4} lg={4}>
                                        <Card>
                                            <CardActionArea>

                                                <CardMedia
                                                    component="img"
                                                    alt="Contemplative Reptile"
                                                    height="auto"
                                                    image={'https://peacecoin.io/app-assets/images/products/1613458630.png'}
                                                    title="Contemplative Reptile"
                                                />
                                            </CardActionArea>
                                        </Card>
                                    </MGrid>
                                    <MGrid item xs={12} sm={12} md={6} lg={6} border={1}>
                                        <MBox textAlign="left" border={0.7}>
                                            <MBox p={5}>
                                                <h2>{apparelDetail.title} ({apparelDetail.brand})</h2>
                                                <br />
                                                <h4>$ {apparelDetail.price}</h4>
                                                <br />
                                                <MBox>
                                                    <h3>Description</h3>
                                                    <Typography variant="body2">
                                                        {apparelDetail.desc}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                       Shipping Charges :  ${apparelDetail.shipping_charges}
                                                    </Typography>



                                                    <MBox display="flex" mt={3}>
                                                        <MBox>

                                                                <InputLabel id="demo-simple-select-label">Color</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    // value={age}
                                                                    // onChange={handleChange}
                                                                >
                                                                    {
                                                                        color.map(color => (
                                                                        <MenuItem value={color}>{color}</MenuItem>
                                                                        ))

                                                                    }
                                                                </Select>

                                                        </MBox>

                                                        <MBox  mx="auto">
                                                                <InputLabel id="demo-simple-select-label">Size</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    // value={age}
                                                                    // onChange={handleChange}
                                                                >
                                                                    {
                                                                        setSize.map(setSize => (
                                                                            <MenuItem value={setSize}>{setSize}</MenuItem>
                                                                        ))

                                                                    }
                                                                </Select>

                                                        </MBox>

                                                        <MBox title="Add To Cart">
                                                            <IconButton  aria-label="cart basket" color="primary" onClick={()=> addToCart(apparelDetail)}>
                                                                <Badge color="primary">
                                                                    <ShoppingCartIcon />
                                                                </Badge>
                                                            </IconButton>
                                                        </MBox>
                                                    </MBox>
                                                </MBox>
                                            </MBox>
                                        </MBox>

                                    </MGrid>
                                </>



                        :'Loading ......................'
                    }

                    </MGrid>
            </MBox>
        </div>
    );
}
const top100Films = [
    { title: "Shawshank ", year: 1994 },
    { title: "Godfather", year: 1972 },
    { title: "Godfather", year: 1974 },
    { title: "Knight", year: 2008 },
    { title: "Angry", year: 1957 },
    { title: "Schindler", year: 1993 },
    { title: "Fiction", year: 1994 },
    { title: "Lord", year: 2003 },
    { title: "Good", year: 1966 },
    { title: "Fight", year: 1999 },
    { title: "Fellowship ", year: 2001 },
    { title: "Episode", year: 1980 },



];
export default ApparelDetail;