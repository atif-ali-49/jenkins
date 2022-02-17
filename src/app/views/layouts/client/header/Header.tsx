import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import MenuIcon from '@material-ui/icons/Menu';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import React, { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios'
import { MAvatar, MBox, MMenu, MMenuItem, MTypography } from 'src/app/components/mui';
import useStyles from './HeaderStyles';
import { NavLink, withRouter } from 'react-router-dom';
import {useToasts} from "react-toast-notifications";
import { NotificationDropdown } from './notification-dropdown/NotificationDropdown';
import { UniversityNotificationDropdown } from './university-dropdown/UniversityNotificationDropdown';
import { resetStore } from 'src/app/store';
import { showAlert } from "src/app/store";

function Header(props:any){

    let cartItems:any = [];

    const history = useHistory();
    const dispatch = useDispatch();
    const[count,setCount] = useState<null | any>([]);
    const [screenWidth, setScreenWidth] = useState(1000);
    const UserData = useSelector((store: any) => store.auth.currentUser);
    const cartObject = useSelector((store: any) => store.cart.cart_items);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
	const handleClose = () => {
	  setAnchorEl(null);
	};

  useEffect(() => {
      setScreenWidth(window.innerWidth);
  }, []);

  const handleDrawerToggle = () => {  
      props.setIsDrawerOpen( props.isDrawerOpen ? false : true);
  };

  const ShowError = () =>{
    dispatch(showAlert({
      message: "your cart is empty",
      messageType: 'info',
      showAlertMessage: true
    }));
  }

	// logOut 
	useEffect(()=>{
    cartItems = JSON.parse(localStorage.getItem('apparels') || '{}');
    setCount(cartItems)

	},[])

    const baseurl = process.env.REACT_APP_API_END_POINT;

		const logOut = () =>{
			axios.post(baseurl+'/logout')
			.then(function (response){
        if(response.status === 200){
          dispatch(resetStore());
            localStorage.removeItem('access_token');
            localStorage.removeItem('cart');
            sessionStorage.clear();
					history.push('/');
          dispatch(showAlert({
            message: "Successfully Logout",
            messageType: 'success',
            showAlertMessage: true
          }));
				}
			})
			.catch(function (error) {
        if(error.response.status === 302 || error.response.status === 401 ){
          dispatch(resetStore());
          localStorage.clear();
          sessionStorage.clear();
          history.push('/');
        }

        dispatch(showAlert({
          message: "Successfully Logout",
          messageType: 'success',
          showAlertMessage: true
        }));
        console.log(error);
			});
		}
const { addToast } = useToasts();

   return (
    <>
        {screenWidth > 959 ?

          <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              className={classes.menuButton}
          >
              <MenuIcon />
          </IconButton>
          :
          <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={()=>props.setIsMobileDrawerOpen(true)}
              edge="start"
              className={classes.menuButton}
          >
              <MenuIcon />
          </IconButton>
        }
        
          <div>
            <IconButton aria-label="change theme dark and light" color="inherit" onClick={()=>{props.handleThemeSwitch()}}>
                {
                props.themeType === 'dark' ?
                <NightsStayIcon /> :
                <WbSunnyIcon />
                }
            </IconButton>
              {   cartObject.length ?
                  <IconButton component={NavLink} to={'/client/cart'} aria-label="cart basket" color="inherit">
                      <Badge badgeContent={cartObject.length} color="secondary">
                          <ShoppingCartIcon />
                      </Badge>
                  </IconButton> :
                  <IconButton  aria-label="cart basket" color="inherit" onClick={ShowError}>
                      <Badge badgeContent={cartObject.length} color="secondary">
                          <ShoppingCartIcon />
                      </Badge>
                  </IconButton>
              }

             <NotificationDropdown />
             <UniversityNotificationDropdown />
            
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClick}
                className={classes.userAvatarBtn}
            >
                <MAvatar variant="circle" alt="Remy Sharp"  src={UserData.path ? UserData.path  :"/img/client-dashboard/avatar.jpg"} />
            </IconButton>
              <MMenu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.profileDropdownMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right'}}
              >
              <MBox p={2} pb={2} mb={1} textAlign="center" className={classes.avatarBox}>
                  <MAvatar  src={UserData.path ? UserData.path  : "/img/client-dashboard/avatar.jpg"} variant="circle" alt="Remy Sharp" />
                  <MBox mt={1}> {UserData.username ? UserData.username : ''} </MBox>
              </MBox>
            
              <MMenuItem component={NavLink} to={'/client/user/profile'} onClick={handleClose}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <MTypography variant="inherit">Profile</MTypography>
              </MMenuItem>
              <MMenuItem component={NavLink} to={'/client/user/profile'} onClick={handleClose}>
                  <ListItemIcon>
                    <LocalShippingIcon fontSize="small" />
                  </ListItemIcon>
                 {/* <NavLink exact to="/client/profile"> */}
                   <MTypography variant="inherit">Shipping Address</MTypography>
                   {/* </NavLink>  */}
              </MMenuItem>
              <MMenuItem component={NavLink} to={'/client/profile'} onClick={handleClose}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <MTypography variant="inherit">Account Setting</MTypography>
              </MMenuItem>
              <MMenuItem onClick={()=>logOut()} className={`${classes.logoutLink}`}>
                  <ListItemIcon>
                    <ExitToAppIcon fontSize="small"/>
                  </ListItemIcon>
                  <MTypography variant="inherit">Logout</MTypography>
              </MMenuItem>
          </MMenu>
        </div>    
	</>

   );
};

export default withRouter(Header);