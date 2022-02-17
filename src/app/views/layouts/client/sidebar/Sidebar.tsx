import { useEffect } from "react";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Link from '@material-ui/core/Link';
import ListItem from "@material-ui/core/ListItem";
import PaymentIcon from '@material-ui/icons/Payment';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import EventIcon from '@material-ui/icons/Event';
import AppsSharpIcon from "@material-ui/icons/AppsSharp";
import StarRateIcon from '@material-ui/icons/StarRate';
import BusinessIcon from "@material-ui/icons/Business";
import ChatIcon from "@material-ui/icons/Chat";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import GroupIcon from "@material-ui/icons/Group";
import LocalAtmSharpIcon from "@material-ui/icons/LocalAtmSharp";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import SvgIcon from "@material-ui/core/SvgIcon";
import useStyles from "./SidebarStyles";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { useSelector } from "react-redux";
import { showComingSoonModal } from 'src/app/store';
import { MSvgIcon } from "src/app/components/mui";
import PeopleIcon from '@material-ui/icons/People';
import { type } from "jquery";
import GamesIcon from '@material-ui/icons/Games';
import axios from 'axios';
import { useHistory,withRouter } from 'react-router-dom';

function Sidebar() {
  const UserData = useSelector((store: any) => store.auth.currentUser);

  const menuIState = {
    shop: false,
    network: false,
    earnings: false,
    eWallet: false,
    ledger: false,
    support: false,
    topProducers: false,
    charts: false,
    university: false,
    autopay:false,
    coins:false,
    summitPkg:false,
	newsevents:false
  };

  const classes = useStyles();
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(menuIState);
   const history = useHistory();

const comingSoonModal = ()=> {
  dispatch(showComingSoonModal(true));
}
const userData = useSelector((store: any) => store.auth.currentUser);
      
   const[coinsDropDown, setCoinsDropDown]=useState([]);
    const[loading, setLoading] = useState(false);
   const baseurl = process.env.REACT_APP_API_END_POINT;

    const getDropdownItems = async  () => {
        setLoading(true);
        await axios.get(baseurl+'/coin_nav')
        .then(function (response) {
            // handle success
            if(response.status === 200){
                setCoinsDropDown(response.data.coins)
            }
            setLoading(false);
        })
        .catch(function (error) {
            setLoading(false);
            console.log(error);
        })
    }

    useEffect(() => {
        getDropdownItems();
    },[]);
  //   for university activation alert

     const uniActiveAlert = () =>{
       let token = localStorage.getItem('access_token');
       axios.post(baseurl + '/allow_university',
           {
             headers: {
               "Access-Control-Allow-Origin": "*",
               "Content-type": "Application/json;charset=UTF-8",
               Authorization: 'Bearer' + token  //the token is a variable which holds the token
             },

           }
       )
           .then(function (response) {
           })
           .catch(function (error) {
             console.log(error)
           })
     }

  // data of array of Allowed countries
  const countries = [
    {name:'United States of America'},
    {name:'United Kingdom'},
    {name:'France'},
    {name:'Israel'},
    {name:'Canada'},
    {name:'Philippine'},
    {name:'South Africa'},
    {name:'Mexico'},
  ]
  let countryExist = countries.find((country)=> country.name == userData.country);
  return (
    <>
      <Divider />
      {/*  Shop Section Start*/}
      <List component="nav" className={classes.listParent}>
        <ListItem button component={NavLink} to={"/client/dashboard"}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button component={NavLink} to={"/client/announcements"}>
          <ListItemIcon>
            <NotificationsActiveIcon />
          </ListItemIcon>
          <ListItemText primary="Announcements" />
        </ListItem>
{/* 
        <ListItem button component={NavLink} to={'/client/transfer-coin'}>
          <ListItemIcon>
            <FiberManualRecordIcon />
          </ListItemIcon>
          <ListItemText primary="Coins" />
        </ListItem> */}

        <ListItem
          button
          selected={menu.coins}
          onClick={() =>
            setMenu({ ...menuIState, coins: menu.coins ? false : true })
          }
        >
          <ListItemIcon>
            <FiberManualRecordIcon />
          </ListItemIcon>
          <ListItemText primary="My Coins"/>
          {menu.coins ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={menu.coins} timeout="auto" unmountOnExit>
          <List disablePadding>
            {coinsDropDown.map((item:any)=>{
             return( 
            <ListItem
            component={NavLink}
            exact
            to={`/client/coins/${item.id}/${item.name.replace(' ','-')}`}
              button
              className={classes.nested} 
              // onClick={() => handleClick(item.id)}
            >            
              <ListItemText primary={item.name.charAt(0).toUpperCase() + item.name.slice(1)} />
            </ListItem>
            )})
             }
          </List>
        </Collapse>

        <ListItem button component={NavLink} to={"/client/products/package"}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="VIP Package" />
        </ListItem>

        <ListItem button component={NavLink} to={"/client/smart-pay"}>
          <ListItemIcon>
            <AppsSharpIcon />
          </ListItemIcon>
          <ListItemText  primary="Smart Packages" />
        </ListItem>
           {/* Auto Pay */}
        {

          // <ListItem
          //     button
          //     selected={menu.summitPkg}
          //     onClick={() =>
          //         setMenu({...menuIState, summitPkg: menu.summitPkg ? false : true})
          //     }
          // >
          //   <ListItemIcon>
          //     <StarRateIcon className="colorChangeAnimation"/>
          //   </ListItemIcon>
          //   <ListItemText primary="Promotion"/>
          //   {menu.summitPkg ? <ExpandLess/> : <ExpandMore/>}
          // </ListItem>
        }
        <Collapse in={menu.summitPkg} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItem
              button
              component={NavLink}
              to={"/client/promotion/package/summit"}
              className={`${classes.nested} animatedIcon`}
            >
              <ListItemText primary="Summit Package" />
            </ListItem>
          </List>

           <List disablePadding>
            <ListItem
              button
              component={NavLink}
              to={"/client/promotion/package/summit-transactions"}
              className={classes.nested}
            >
              <ListItemText primary="Summit Transactions" />
            </ListItem>
          </List>
        </Collapse>
       

        <ListItem
          
            button
            selected={menu.autopay}
            onClick={() =>
                setMenu({
                  ...menuIState,
                  autopay: menu.autopay ? false : true,
                })
            }
        >
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText primary="Auto Pay" />
         {/* <div className="ring-container">
            <div className="ringring"></div>
            <div className="circle"></div>
        </div> */}
          {menu.autopay ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={menu.autopay} timeout="auto" unmountOnExit>
          <List disablePadding>

            <ListItem
                button
                className={classes.nested}
                component={NavLink}
                exact to={"/client/auto-pay"}
            >
              <ListItemText primary="Packages" />
            </ListItem>

            <ListItem
                button
                className={classes.nested}
                component={NavLink}
                exact to={"/client/auto-pay/transaction"}
            >
              <ListItemText primary="Auto Pay Transactions" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button selected={menu.shop} onClick={()=>setMenu({...menuIState,shop: menu.shop? false: true})}>
          <ListItemIcon>
            <AddShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Shop" />
          {menu.shop ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={menu.shop} timeout="auto" unmountOnExit>
          <List disablePadding>
           
            <ListItem
              button
              component={NavLink}
             exact to="/client/apparels"
              className={classes.nested}
            >
              <ListItemText primary="Apparels" />
            </ListItem>
            <ListItem
              button
              component={NavLink}
             exact  to={"/client/apparels/transaction"}
              className={classes.nested}
            >
              <ListItemText primary="Apparels Transactions" />
            </ListItem>
          </List>
        </Collapse>
        

	  <ListItem button selected={menu.newsevents} onClick={()=>setMenu({...menuIState,newsevents: menu.newsevents? false: true})}>
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar Events" />
          {menu.newsevents ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={menu.newsevents} timeout="auto" unmountOnExit>
          <List disablePadding>
           
            <ListItem
              button
              component={NavLink}
             exact to="/client/news/all"
              className={classes.nested}
            >
              <ListItemText primary="News" />
            </ListItem>
            <ListItem
              button
              component={NavLink}
             exact  to={"/client/events/all"}
              className={classes.nested}
            >
              <ListItemText primary="Events" />
            </ListItem>
          </List>
        </Collapse>




        {/*  NetWork Section Start*/}
          
        
        {
          userData.ibo_status == 0 ?
          
          <ListItem
          button
          selected={menu.network}
          className={classes.disabled}
        >
          <ListItemIcon>
            <DeviceHubIcon />
          </ListItemIcon>
          <ListItemText primary="Network" />
      </ListItem> :
        

        

        <ListItem
          button
          selected={menu.network}
         onClick={ () =>setMenu({ ...menuIState, network: menu.network ? false : true })}
        >
          <ListItemIcon>
            <DeviceHubIcon />
          </ListItemIcon>
          <ListItemText primary="Network" />
          {menu.network ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        
        }

        <Collapse in={menu.network} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItem
              button
              component={NavLink}
              exact to={"/client/genelogy"}
              className={classes.nested}
            >
              <ListItemText primary="My Genealogy" />
            </ListItem>
            <ListItem
              button
              component={NavLink}
            exact  to={"/client/genelogy/refer-members"}
              className={classes.nested}
            >
              <ListItemText primary="Referred Members" />
            </ListItem>
            <ListItem
              button
              component={NavLink}
             exact to={"/client/genelogy/users-list"}
              className={classes.nested}
            >
              <ListItemText primary="Users List" />
            </ListItem>
          </List>
        </Collapse>
      {/*   University tabs */}
        <ListItem
            button
            selected={menu.university}

            onClick={() =>
                setMenu({
                  ...menuIState,
                  university: menu.university ? false : true,
                })
            }
        >
          <ListItemIcon>
            <AccountBalanceIcon className="colorChangeAnimation" />
          </ListItemIcon>
          <ListItemText primary="Crypto Academy" />
          {menu.university ? <ExpandLess /> : <ExpandMore />}
        </ListItem>


        <Collapse in={menu.university} timeout="auto" unmountOnExit>
          <List>
            <ListItem

                button
                component={NavLink}
                to={"/client/university/courses"}
                className={`${classes.nested}`}
            >
              <ListItemText primary="Courses" />
            </ListItem>
          </List>
          <List>
            <ListItem
                button
                component={NavLink}
                to={"/client/university/area-coordinate"}
                className={`${classes.nested}  ${(UserData.id ==56) ? "" : `${classes.disabled}`}`}
            >
              <ListItemText primary="Area Coordinator" />
            </ListItem>
          </List>
        </Collapse>
      {/* smart packages start from here*/}
 
        <ListItem button component={NavLink} to={"/client/upgrade/ibo"}>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Upgrade To IBO" />
        </ListItem>




       {
         userData.ibo_status == 0 ?
      <ListItem
          button
         selected={menu.earnings}
       onClick={() =>
      setMenu({ ...menuIState, earnings: menu.earnings ? false : true })} className={classes.disabled}>





<ListItemIcon>
  <LocalAtmSharpIcon />
</ListItemIcon>
<ListItemText primary="Earnings" />
{menu.earnings ? <ExpandLess /> : <ExpandMore />}
</ListItem>
:

       <ListItem
          button
          selected={menu.earnings}
          onClick={() =>
            setMenu({ ...menuIState, earnings: menu.earnings ? false : true })
          }
        >
          <ListItemIcon>
            <LocalAtmSharpIcon />
          </ListItemIcon>
          <ListItemText primary="Earnings" />
          {menu.earnings ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        
        }

        <Collapse in={menu.earnings} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItem
              component={NavLink}
              to={"/client/peacemakers"}
              className={classes.nested}
            >
              <ListItemText primary="Trinary Commission" />
            </ListItem>
            {/* <ListItem  className={classes.nested}>
              <ListItemText primary="Peace Maker"  />
            </ListItem> */}
          </List>
        </Collapse>

        <ListItem
          button
          selected={menu.eWallet}
          onClick={() =>
            setMenu({ ...menuIState, eWallet: menu.eWallet ? false : true })
          }
        >
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary="E-Wallet" />
          {menu.eWallet ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={menu.eWallet} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItem
              button
              component={NavLink}
              to={"/client/wallet/summary"}
              className={classes.nested}
            >
              <ListItemText primary="E-Wallet Summary" />
            </ListItem>
            <ListItem
              button
              component={NavLink}
              to={"/client/deposit/fund"}
              className={classes.nested}
            >
              <ListItemText primary="Deposit Funds" />
            </ListItem>
            {/* <ListItem button className={classes.nested} onClick={()=>comingSoonModal()}>
              <ListItemText primary="Withdraw Funds" />
            </ListItem> */}
            {/* <ListItem button component={NavLink} to={'/client/wallet'} className={classes.nested}>
              <ListItemText primary="BTC Wallet Address"  />
            </ListItem> */}
            <ListItem
              button
              component={NavLink}
              to={"/client/transfer/fund"}
              className={classes.nested}
            >
              <ListItemText primary="Transfer Funds" />
            </ListItem>

                <ListItem
              button
              component={NavLink}
              to={"/client/transfer/coins"}
              className={classes.nested}
            >
              <ListItemText primary="Transfer Coins" />
            </ListItem>
            <ListItem
              button
              component={NavLink}
              to={"/client/fund/transfer"}
              className={classes.nested}
            >
              <ListItemText primary="Withdraw Coins" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem
          button
          selected={menu.ledger}
          onClick={() =>
            setMenu({ ...menuIState, ledger: menu.ledger ? false : true })
          }
        >
          <ListItemIcon>
            <EqualizerIcon />
          </ListItemIcon>
          <ListItemText primary="Ledger" />
          {menu.ledger ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={menu.ledger} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItem
              button
              component={NavLink}
              to={"/client/ledger/register-transactions"}
              className={classes.nested} 
            >
              <ListItemText primary="Registration Transactions" />
            </ListItem>

            <ListItem
              button
              component={NavLink}
              to={"/client/ledger/ibo-transactions"}
              className={classes.nested}
            >
              <ListItemText primary="IBO Transactions" />
            </ListItem>

            <ListItem
              button
              component={NavLink}
              to={"/client/ledger/package-transactions"}
              className={classes.nested}
            >
              <ListItemText primary="Smart Transactions" />
            </ListItem>
           
            <ListItem
              button
              component={NavLink}
              to={"/client/products/transaction"}
              className={classes.nested}
            >
            <ListItemText primary="VIP Transactions" />
            </ListItem>

          </List>
        </Collapse>

        <ListItem
          button
          selected={menu.support}
          onClick={() =>
            setMenu({ ...menuIState, support: menu.support ? false : true })
          }
        >
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Support" />
          {menu.support ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={menu.support} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItem
              button
              component={NavLink}
              to={"/client/support/tickets"}
              className={classes.nested}
            >
              <ListItemText primary="All Tickets" />
            </ListItem>
            <ListItem
              button
              component={NavLink}
              to={"/client/support/create-ticket"}
              className={classes.nested}
            >
              <ListItemText primary="Create Ticket" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem
          button
          selected={menu.topProducers}
          onClick={() =>
            setMenu({
              ...menuIState,
              topProducers: menu.topProducers ? false : true,
            })
          }
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Top Producers" />
          {menu.topProducers ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={menu.topProducers} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItem
              button
              className={classes.nested}
              component={NavLink}
              to={"/client/profile/success"}
            >
              <ListItemText primary="Profiles of Success" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem
          button
          selected={menu.charts}
          onClick={() =>
            setMenu({ ...menuIState, charts: menu.charts ? false : true })
          }
        >
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText primary="Charts" />
          {menu.charts ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={menu.charts} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItem button component={NavLink} to={'/client/charts'} className={classes.nested}>
              <ListItemText primary="BTC/USD" />
            </ListItem>
            <ListItem button component={NavLink} to={'/client/ethusd'} className={classes.nested}>
              <ListItemText primary="ETH/USD" />
            </ListItem>

            <ListItem
              button
              component={NavLink}
              to={"/client/geo/chart"}
              className={classes.nested}
            >
              <ListItemText primary="Geo Chart" />
            </ListItem>
            <ListItem button  className={classes.nested} onClick={()=>comingSoonModal()}>
              <ListItemText primary="Peacecoin/USD" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button component={NavLink} to={"/client/peace-wallet"}>
          <ListItemIcon>
          <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary="Crypto Wallet" />
        </ListItem>


        <ListItem button component={NavLink} to={"/client/resources"}>
          <ListItemIcon>
            <FileCopyIcon />
          </ListItemIcon>
          <ListItemText primary="Resources" />
        </ListItem>
       <ListItem button component={NavLink} to={"/client/executive-team"}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Executive Team" />
        </ListItem>


      </List>
    </>
  );
}
export default withRouter(Sidebar)