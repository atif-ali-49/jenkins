import { MBox, MTypography,	MCard,
    MCardHeader,
    MCardContent,
    MIconButton,
    MTooltip,MGrid, MPaper } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import useStyles from './PeaceWalletStyles'
import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { CircularProgressProps } from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import AccountBalanceWalletRoundedIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import InfoIcon from '@material-ui/icons/Info';
import { Pie } from 'react-chartjs-2';
import Button from '@material-ui/core/Button';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { useSelector} from 'react-redux';
import { showComingSoonModal } from 'src/app/store';
import { useDispatch } from "react-redux";

const chartData = { 
    datasets: [
    {
        data: [45, 30, 20],
        backgroundColor: [
        '#ef9318',
        '#00aeef',
        '#b70606',
        ],
        borderColor: [
            '#ef9318',
            '#00aeef',
            '#b70606',
        ],
        borderWidth: 1,
    },
    ],
};

const useStylesFacebook = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
      color: '#1a90ff',
    //   animationDuration: '550ms',
      position: 'absolute',
      left: 0,
      right:0,
    marginLeft:'auto',
    marginRight:'auto'
    },
    circle: {
      strokeLinecap: 'round',
    },
  }),
);

const getTotal = (val1, val2) =>{
    return val1.parseInt() +  val1.parseInt();
}

function FacebookCircularProgress(props: CircularProgressProps) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={80}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={80}
        thickness={4}
        {...props}
      />
    </div>
  );
}

function PeaceWallet() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userData = useSelector((store: any) => store.auth.currentUser);
    let totalBalance:any = parseInt(userData.pc_balance) + parseInt(userData.meta_balance === null ? 0 : userData.meta_balance );

    return (
        <div>
            <MBox className="pageHeader">
                <MBox display="flex" alignItems="center" justifyContent="space-between">
                 <MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Peace Wallet</MTypography>
                 {/* <Button className={classes.btninvex}  variant="contained" color="primary" startIcon={<AddRoundedIcon />} >Add Wallet  </Button> */}
                </MBox>
				
				<RouterBreadcrumbs />
            </MBox>   
            <MBox className="contentBox" component={MPaper}>
                <Grid container justify="center" spacing={4}>
                    <Grid item lg={3}>
                        <MBox className={classes.bluebox}>
                            <MBox py={2} px={1} className={classes.dflex}>
                                <AccountBalanceWalletRoundedIcon fontSize="large" color="primary"/>
                                <MBox className={classes.righttext} mt={1}>Metamask Wallet Balance </MBox>
                            </MBox>
                            <MTypography align="center"  gutterBottom component="h4" variant="h4">
                                {userData && userData.meta_balance}
                            </MTypography>
                        </MBox>

                        <MBox className={classes.yellowbox} mt={3}>
                            <MBox py={2} px={1} className={classes.dflex}>
                                <PeopleAltRoundedIcon fontSize="large" color="primary"/>
                                <MBox className={classes.righttext} mt={1}>Peacecoin Wallet Academy </MBox>
                            </MBox>     
                            <MTypography align="center"  gutterBottom component="h4" variant="h4">
                                {userData && userData.pc_balance}
                            </MTypography>
                        </MBox>

                    </Grid>
                    
                    <Grid item lg={6}>
                        <MCard className={classes.commonDashboardCard} variant="outlined">
                                <MCardHeader
                                    title="Wallet Detail"
                                        action={
                                            <MTooltip title="View Rank Info" arrow placement="top-end">
                                                <div>
                                                    <MIconButton aria-label="settings"  >
                                                        <InfoIcon />
                                                    </MIconButton>
                                                </div>
                                            </MTooltip>
                                        }
                                />
                                <MCardContent className={classes.incomeBox}>
                                    <MGrid container justify="space-between" alignItems="center">
                                            <MGrid item sm={5} xs={12}>
                                                    <MBox my={2}>
                                                        <MTypography className={classes.lightColor}>Wallet Owner Name</MTypography>
                                                        <MTypography  gutterBottom component="h4" className={classes.WalletOwnerName} variant="h6">
                                                            {userData && userData.first_name} {userData && userData.last_name}
                                                        </MTypography>                                 
                                                    </MBox>

                                                    {/* <MBox my={2}>
                                                        <MTypography className={classes.lightColor}>IBO expiry</MTypography>
                                                        <MTypography  gutterBottom component="h4" className={classes.WalletOwnerName} variant="h6">
                                                            {userData && userData.ibo_expiry}    
                                                        </MTypography>                                 
                                                    </MBox> */}
                                                    
                                                    <MBox my={2}>
                                                        <MTypography className={classes.lightColor}>Peacecoins</MTypography>
                                                        <MTypography  gutterBottom component="h4" className={classes.WalletOwnerName} variant="h6">
                                                            {/* 2100  */}
                                                            {
                                                            
                                                                // (userData.meta_balance.parseInt()  )
                                                                totalBalance
                                                            
                                                            } coins
                                                        </MTypography>                                 
                                                    </MBox>
                                                
                                            </MGrid>

                                            <MGrid item sm={5} xs={12} className={classes.root}>
                                                {/* <MTypography align="center"  className={classes.lightColor}>Monthly Limits</MTypography>
                                                <MBox className={classes.boxparent} align="center" mt={2}>
                                                <FacebookCircularProgress />
                                                <span className={classes.childdata}>50%</span>
                                                </MBox> */}
                                                {/* <MBox mt={3} align="center">
                                                <MTypography className={classes.WalletOwnerName} >IBO left</MTypography>
                                                <MTypography  className={classes.lightColor}>15 Days</MTypography>
                                                </MBox> */}
                                            </MGrid>
                                    </MGrid>
                                </MCardContent>
                            </MCard>
                            <MBox align="center" my={2}>
                                <MTypography align="center" className={classes.lightColor}>You can start your online trading through Invex Exchange</MTypography>
                                <Button onClick={()=>dispatch(showComingSoonModal(true))} className={classes.btninvex}  variant="contained" color="secondary" startIcon={<AttachMoneyRoundedIcon />} >Invex Exchange  </Button>
                            </MBox>
                    </Grid>
                </Grid>   
            </MBox>
        </div>
    )
}

export default PeaceWallet
