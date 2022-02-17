import { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { ThemeConfig } from 'src/app/mui/ThemeConfig';
import { ThemeConfigDark } from 'src/app/mui/ThemeConfigDark';
import Header from './header/Header';
import Footer from './footer/Footer';
import Sidebar from './sidebar/Sidebar';
import Routing from 'src/app/routing/index';
import useStyles from './styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useDispatch, useSelector } from "react-redux";
import { updateCart, setTheme } from "src/app/store";
import Hidden from "@material-ui/core/Hidden";
import { ReactCustomScrollbars } from 'src/app/components'
import { MBox } from 'src/app/components/mui';
import CssBaseline from '@material-ui/core/CssBaseline';
import { setCurrentUserData ,setLanguages} from '../../../store';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function ClientLayout() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
    const [isPaidStatus, setIsPaidStatus] = useState<null | number>(2);
    const theme = useSelector((store: any) => store.general.theme);
    const token = localStorage.getItem("access_token");


    const getPaidStatus = async () => {
        try {
            const paidStatus = await localStorage.getItem('paid_status');
            return paidStatus;
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPaidStatus().then((res) => {
            setIsPaidStatus(parseInt(res!));
        });
    }, [isPaidStatus])

    // user Profile Setter
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const getUserProfileData = async () => {
        await axios.get(baseurl + '/profile_show')
            .then(function (response) {
                // handle success
                if (response.status === 200 && response.data.message)
                    dispatch(setCurrentUserData(response.data.user))
                    dispatch(setLanguages(response.data.languages))
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    
    useEffect(() => {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    }, []);
    
    // theme code start
    useEffect(() => {
        const localStorageTheme = localStorage.getItem('theme');
        if (localStorageTheme === null) {
            localStorage.setItem('theme', 'light');
        } else {
            dispatch(setTheme(localStorageTheme));
        }
        // console.log(theme);
    }, []);

    const updateThemeState = ((type) => {
        dispatch(setTheme(type))
        localStorage.setItem('theme', type)
    });

    const handleThemeSwitch = () => {
        (theme === 'dark') ? updateThemeState('light') : updateThemeState('dark');
    };// theme code last

    useEffect(() => {
        if((token !== '' && token !== undefined && token !== null)){
            getUserProfileData();
        }

        let cartItems = JSON.parse(localStorage.getItem('cart') || '{}');
        if (cartItems.length) {
            dispatch(updateCart(cartItems));
        }
    }, []);

  

    return (
        <ThemeProvider theme={theme === 'dark' ? ThemeConfigDark : ThemeConfig}>
            <CssBaseline />
            <MBox className={classes.clientLayout}>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: isDrawerOpen,
                    })}
                >
                    {
                        isPaidStatus === 1 &&
                        <Toolbar className={classes.toolbar}>
                            <Header isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} setIsMobileDrawerOpen={setIsMobileDrawerOpen} handleThemeSwitch={handleThemeSwitch} themeType={theme} />
                        </Toolbar>
                    }
                </AppBar>
                <Hidden smDown>
                    {isPaidStatus === 1 &&
                        <Drawer
                            variant={'permanent'}
                            className={clsx(classes.drawer, {
                                [classes.drawerOpen]: isDrawerOpen,
                                [classes.drawerClose]: !isDrawerOpen,
                            })}
                            classes={{
                                paper: clsx({
                                    [classes.drawerOpen]: isDrawerOpen,
                                    [classes.drawerClose]: !isDrawerOpen,
                                }),
                            }}
                        >
                            <MBox className={classes.logoBox} px={2}>
                                <Link to="/client/dashboard">
                                    {isDrawerOpen ?
                                        <img className={classes.logo}
                                            src={theme === 'dark' ? "/img/client-dashboard/logo-dark.png" : "/img/client-dashboard/logo.png"} alt="peace coin" /> :
                                        <img className={classes.logoSmall} width="41px" height="45px" src="/img/client-dashboard/logo-small.png" alt="peace coin" />
                                    }
                                </Link>
                            </MBox>
                            <ReactCustomScrollbars>
                                <Sidebar />
                            </ReactCustomScrollbars>
                        </Drawer>
                    }
                </Hidden>

                <Hidden mdUp>
                    {
                        isPaidStatus === 1 &&
                        <Drawer
                            variant="temporary"
                            className={clsx(classes.drawer, {
                                [classes.drawerOpen]: isDrawerOpen,
                                [classes.drawerClose]: !isDrawerOpen,
                            })}
                            open={isMobileDrawerOpen}
                            onClose={() => setIsMobileDrawerOpen(false)}
                        >
                            <MBox className={classes.logoBox} px={2}>
                                <Link to="/client/dashboard">
                                    {isDrawerOpen ?
                                        <img className={classes.logo}
                                            src={theme === 'dark' ? "/img/client-dashboard/logo-dark.png" : "/img/client-dashboard/logo.png"} alt="peace coin" />
                                        :
                                        <img className={classes.logoSmall} width="41px" height="45px" src="/img/client-dashboard/logo-small.png" alt="peace coin" />
                                    }
                                </Link>
                            </MBox>
                            <ReactCustomScrollbars>
                                {isPaidStatus === 1 && <Sidebar />}
                            </ReactCustomScrollbars>
                        </Drawer>
                    }
                </Hidden>
                <MBox className={classes.content} component="main">
                    <Routing />
                </MBox>
            </MBox>
            <Footer />
        </ThemeProvider>
    )
}
