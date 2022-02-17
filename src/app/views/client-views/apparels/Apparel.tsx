import React, {useEffect, useState} from 'react';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import { MBox, MGrid, MPaper, MCircularProgress } from '../../../../app/components/mui';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import axios from "axios";
import {useDispatch} from "react-redux";
import {updateCart} from "src/app/store";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {useHistory} from 'react-router-dom';
import { showAlert } from "src/app/store";
import { NoData } from 'src/app/components';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    apparelsize:{
        marginLeft:"35px"
    },
    colorPrice:{
        color:'#EF9318',
        marginLeft: "20px"
    },
    whitespace:{
     lineBreak:'anywhere'
    },

    selectCenter:{
       textAlign:'center',
        marginTop:'20px'
    }

  });

function Apparel(props:any) {

    const baseurl = process.env.REACT_APP_API_END_POINT;
    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState<null | any>([]);
    const [apparels, setApparels] = useState<null | any>([]);
    const [temp, setTemp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [storageArray,setStorageArray] =  useState<null | any>([]);
    const classes = useStyles();
    const history = useHistory();
    // if product exist in cart then set it in existing cartItems state

    useEffect(() => {
        let get_cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        // get_cartItems.length !== 0 ?  setStorageArray(get_cartItems):setStorageArray([]);
        get_cartItems.length !== 0 ?  setCartItems(get_cartItems):setCartItems([]);
    },[]);
         // for set items in redux and local Storage
         useEffect(() => {
            if(temp) {
                // const cart = [...storageArray, ...cartItems];
                localStorage.setItem('cart', JSON.stringify(cartItems));
                dispatch(updateCart(cartItems));
                setTemp(false);
            }

        }, [cartItems]);
         //  Function for add to cart setting in local storage
    // console.log(cartItems,'cart Items');
    // console.log(storageArray,'storage Array');
         const addToCart = (apparel:any) => {

             if(apparel.hasOwnProperty('selectedColor') && apparel.hasOwnProperty('selectedSize') ) {
                 setTemp(true);
                 const exist = cartItems.find((x: any) => x.uuid == apparel.uuid);
                 if (exist) {

                     setCartItems(
                         cartItems.map((x: any) =>
                             x.uuid == apparel.uuid ? {...exist, qty: exist.qty + 1,selectedColor:exist.selectedColor} : x
                         )
                     );

                     //  let FoundItemIndex = cartItems.findIndex((obj => obj.id == exist.id));
                     // //Update object's selectedColor property.
                     //    let updated = cartItems[FoundItemIndex].selectedColor = apparel.selectedColor;
                     //    console.log(updated,'updatede');
                       dispatch(showAlert({
                         message: "Apparel added to cart successfully",
                         messageType: 'success',
                         showAlertMessage: true
                     }));
                 } else {
                     // console.log(apparel,'apparel in else');

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
         const apparelData = useEffect(() => {
          // Make a request for a user with a given ID
          setLoading(true);
          axios.get(baseurl+'/apparels')
              .then(function (response) {
                  // handle success
                  setApparels(response.data.apparels)
                  // console.log(response.data.apparels,'response.data.apparels')

              })
              .catch(function (error) {
                console.log(error)
              })
              .then(function () {
                setLoading(false);
              });
      },[]);
         const apparelDetail =(apparel_id)=>{
       history.push('/client/apparels/detail/'+apparel_id);
   }

      //  select size
    const selectSize = (event,apparel:any) =>{

       if(apparel.hasOwnProperty('selectedSize')){
           apparel.hasOwnProperty('selectedSize') && delete apparel.selectedSize;
           setApparels(
               apparels.map((x:any) =>
                   x.id == apparel.id ? {...apparel, selectedSize: apparel.selectedSize = event.target.value} : x
               )
           );
       }else{
           setApparels(
               apparels.map((x:any) =>
                   x.id == apparel.id ? {...apparel, selectedSize: apparel.selectedSize = event.target.value} : x
               )
           );
       }


    }
    //  select color
    const selectColor = (event,apparel:any) =>{
        // console.log(event.target.value)
        if(apparel.hasOwnProperty('selectedColor')){
            apparel.hasOwnProperty('selectedColor') && delete apparel.selectedColor;
            setApparels(
                apparels.map((x:any) =>
                    x.id == apparel.id ? {...apparel, selectedColor: apparel.selectedColor = event.target.value} : x
                )
            );
        }else{
            setApparels(
                apparels.map((x:any) =>
                    x.id == apparel.id ? {...apparel, selectedColor: apparel.selectedColor = event.target.value} : x
                )
            );
        }



    }


    return (

        <>
        <MBox className="pageHeader">
        <Typography className="mainHeading" gutterBottom component="h1" variant="h4">Apparels</Typography>
        <RouterBreadcrumbs />
       </MBox>

    <MBox className="contentBox" component={MPaper}>
        {loading ?
            <MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
                <MCircularProgress />
            </MBox>
            :
        <MGrid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center">
            {
                apparels.length ?

                apparels.map((apparel) => (


                    <MGrid item xs={12} sm={12} md={6} lg={3} key={apparel.uuid}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="auto"
                                    image={apparel.app_iamges[0].image_path ? apparel.app_iamges[0].image_path: 'https://peacecoin.io/app-assets/images/products/1613458630.png'}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>

                                    <MGrid
                                        container
                                        spacing={3}
                                        textAlign="center"
                                        direction="row"
                                        alignItems="center">
                                        <MGrid item xs={12} sm={12} md={12} lg={12} textAlign="center">
                                           <MBox textAlign="center">
                                               <Typography variant="subtitle2" gutterBottom>
                                                   {apparel.title}
                                                   {/*POLO SHIRTS FOR MEN YELLOW*/}
                                               </Typography>
                                           </MBox>
                                        </MGrid>


                                    </MGrid>
                                    {
                                        JSON.parse(apparel?.color).length !== 0 &&

                                        <MGrid
                                            container
                                            alignItems="center"
                                            justifyContent="center"
                                            textAlign="center"
                                        >


                                            <MGrid item xs={6} className={classes.selectCenter}>
                                                <InputLabel id="demo-simple-select-label1">Size</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label1"
                                                    id="demo-simple-select1"
                                                    onChange={(e)=>selectSize(e,apparel)}
                                                >
                                                    {
                                                        JSON.parse(apparel?.size).map((size) =>  <MenuItem key={size} value={size}>{size}</MenuItem> )
                                                    }
                                                </Select>
                                            </MGrid>
                                            <MGrid item xs={6} className={classes.selectCenter} >
                                                <InputLabel id="demo-simple-select-labe2l">Color</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label2"
                                                    id="demo-simple-select2"
                                                    onChange={(e)=>selectColor(e,apparel)}
                                                >
                                                    {
                                                        JSON.parse(apparel?.color).map((color) =>  <MenuItem key={color} value={color}>{color}</MenuItem> )
                                                    }
                                                </Select>
                                            </MGrid>

                                        </MGrid>
                                    }


                                </CardContent>
                            </CardActionArea>
                            <CardActions>



                                <MGrid
                                    container
                                    spacing={3}
                                    direction="row"
                                    textAlign="center"
                                    justify="center"
                                    alignItems="center">
                                    <MGrid item xs={4} sm={4} md={4} lg={4}>
                                        <Typography  className={classes.colorPrice}>
                                            ${apparel.price}
                                        </Typography>
                                    </MGrid>

                                    <MGrid item xs={4} sm={4} md={4} lg={4}>

                                        {
                                            apparel.available_qty > 0 ?
                                            <IconButton  aria-label="cart basket" className={classes.colorPrice} onClick={()=> addToCart(apparel)}>
                                                <Badge className={classes.colorPrice}>
                                                    <ShoppingCartIcon />
                                                </Badge>
                                            </IconButton>
                                                :
                                                <Chip

                                                    size="small"
                                                    label="Out of Stock"
                                                    color="secondary"
                                                />

                                        }
                                    </MGrid>

                                    {/*<MGrid item xs={4} sm={4} md={4} lg={4}>*/}
                                    {/*    <IconButton  aria-label="cart basket" className={classes.colorPrice} onClick={()=> apparelDetail(apparel.id)} title="view Detail">*/}
                                    {/*        <Badge className={classes.colorPrice}>*/}
                                    {/*            <VisibilityIcon />*/}
                                    {/*        </Badge>*/}
                                    {/*    </IconButton>*/}
                                    {/*</MGrid>*/}
                                </MGrid>
                            </CardActions>
                        </Card>
                    </MGrid>
            )):

                <MBox mb={1} borderRadius={'4px'}>
                    <NoData />
                </MBox>
            }
        </MGrid>
        }
        </MBox>

       </>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];

export default Apparel;