import Badge from '@material-ui/core/Badge';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import Moment from 'moment';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MAvatar, MBox, MChip, MPaper, MTypography, MPagination, MCircularProgress } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import useStyles from './AllUsersListStyles';
import UserListComponent from './UserListComponent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { NoData } from 'src/app/components';
interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }
  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

 let currentDate  = new Date().toUTCString().slice(5,16);
   
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <MBox>
            <MTypography>{children}</MTypography>
          </MBox>
        )}
      </div>
    );
  }


function AllUsersList() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const [valueActive, setValueActive] = React.useState(0);
	const [valueInActive, setValueInActive] = React.useState(0);
  	const [loading, setLoading] = React.useState(false);
	const[activeusers,SetActiveUsers] = useState<any | null>([]);
	const[inActiveUsers,setInActiveUsers] = useState<any | null>([]);
	const[search,SetSearch] = useState<any | null>('');
	const baseurl = process.env.REACT_APP_API_END_POINT;
	const token =  useSelector((store: any) => store.auth.token);
	const [directReferal, setData] = useState([]);
	const config = { headers: { Authorization: `Bearer ${token}` } };
	const[recordsPerPage, setRecordsPerPage] = useState(15);
	
    // active users
    const[activeLeftLegTotalPages, SetActiveLeftLegTotalPages] = useState(1);
    const[activeLeftLegCurrentPage, SetActiveLeftLegCurrentPage] = useState(1);
    
    const[activeCenterLegTotalPages, SetActiveCenterLegTotalPages] = useState(1);
    const[activeCenterLegCurrentPage, SetActiveCenterLegCurrentPage] = useState(1);
    
    const[activeRightLegTotalPages, SetActiveRightLegTotalPages] = useState(1);
    const[activeRightLegCurrentPage, SetActiveRightLegCurrentPage] = useState(1);

    // inactive users
    const[inActiveLeftLegTotalPages, SetInActiveLeftLegTotalPages] = useState(1);
    const[inActiveLeftLegCurrentPage, SetInActiveLeftLegCurrentPage] = useState(1);
    
    const[inActiveCenterLegTotalPages, SetInActiveCenterLegTotalPages] = useState(1);
    const[inActiveCenterLegCurrentPage, SetInActiveCenterLegCurrentPage] = useState(1);
    
    const[inActiveRightLegTotalPages, SetInActiveRightLegTotalPages] = useState(1);
    const[inActiveRightLegCurrentPage, SetInActiveRightLegCurrentPage] = useState(1);
    // direct referrals
	const[directRefferalsTotalPages, SetDirectRefferalsTotalPages] = useState(1);
	const[directRefferalsCurrentPage, SetDirectRefferalsCurrentPage] = useState(1);

	// ACTIVE STATES
	const[leftActiveData, setLeftActiveData]=useState([])
	const[rightActiveData, setRightActiveData]=useState([])
	const[centerActiveData, setCenterActiveData]=useState([])

	// INACTIVE STATES	
	const[leftInActive, setLeftInActive]=useState([])
	const[rightInActive, setRightInActive]=useState([])
	const[centerInActive, setCenterInActive]=useState([])
	
    //Table content
    const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    
    head: {
      backgroundColor: "#bdbdbd",
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
     
    },
  }),
)(TableRow);

    // active user apis
    const getLeftActiveUsers = () => {
        setLoading(true);
        axios.get(baseurl+`/get_leftactive_list/${recordsPerPage}?page=${activeLeftLegCurrentPage}`, config)
        .then(function (res) {
            if(res.status === 200){
                setLeftActiveData(res.data.left_active_list.data);
                SetActiveLeftLegTotalPages(res['data']['left_active_list']['last_page']);
            }
        })	
        .catch(function (error) {
                console.log(error,'error')
        })
        .then(()=> setLoading(false))
    }
    useEffect(() => {
        getLeftActiveUsers();
    },[activeLeftLegCurrentPage]);

    const getCenterActiveUsers = () => {
        setLoading(true);
        axios.get(baseurl+`/get_centeractive_list/${recordsPerPage}?page=${activeCenterLegCurrentPage}`, config)
        .then(function (res) {
            if(res.status === 200){
                setCenterActiveData(res.data.center_active_list.data);
                SetActiveCenterLegTotalPages(res['data']['center_active_list']['last_page']);
            }})			
        .catch(function (error) {
            console.log(error,'error')
        })
        .then(()=> setLoading(false))
    };
    useEffect(() => {
        getCenterActiveUsers();
    },[activeCenterLegCurrentPage]);

    const getRightActiveUsers = () => {
        axios.get(baseurl+`/get_rightactive_list/${recordsPerPage}?page=${activeRightLegCurrentPage}`, config)
        .then(function (res) {
            if(res.status === 200){
                setRightActiveData(res.data.right_active_list.data);
                SetActiveRightLegTotalPages(res['data']['right_active_list']['last_page']);
            }})
        .catch(function (error) {
            console.log(error,'error')
        })				
    };
    useEffect(() => {
        getRightActiveUsers();
    },[activeRightLegCurrentPage]);

    // inactive user apis
    const getLeftInActiveUsers = () => {
        setLoading(true);
        axios.get(baseurl+`/get_leftInactive_list/${recordsPerPage}?page=${inActiveLeftLegCurrentPage}`, config)
        .then(function (res) {
            if(res.status === 200){
                setLeftInActive(res.data.left_inactive_list.data);
                SetInActiveLeftLegTotalPages(res.data.left_inactive_list.last_page)
            }
        })					
        .catch(function (error) {
            console.log(error,'error')
        })
        .then(()=> setLoading(false))
    };
    useEffect(() => {
        getLeftInActiveUsers();
    },[inActiveLeftLegCurrentPage]);

    const getCenterInActiveUsers = () => {
        setLoading(true);
        axios.get(baseurl+`/get_centerInactive_list/${recordsPerPage}?page=${inActiveCenterLegCurrentPage}`, config)
        .then(function (res) {
            if(res.status === 200){
                setCenterInActive(res.data.center_inactive_list.data);
                SetInActiveCenterLegTotalPages(res.data.center_inactive_list.last_page);
            }})						
        .catch(function (error) {
            console.log(error,'error')
        })
        .then(()=> setLoading(false))
    };
    useEffect(() => {
        getCenterInActiveUsers();
    },[inActiveCenterLegCurrentPage]);

    const getRightInActiveUsers = () => {
        setLoading(true);
        axios.get(baseurl+`/get_rightInactive_list/${recordsPerPage}?page=${inActiveRightLegCurrentPage}`, config)
        .then(function (res) {
            if(res.status === 200){
                setRightInActive(res.data.right_inactive_list.data);
                SetInActiveRightLegTotalPages(res.data.right_inactive_list.last_page);
            }})		
        .catch(function (error) {
            console.log(error,'error')
        })
        .then(()=> setLoading(false))
    };
    useEffect(() => {
        getRightInActiveUsers();
    },[inActiveRightLegCurrentPage]);

    const getDirectReferredMemebers = () => {
    setLoading(true)
        const baseUrl = process.env.REACT_APP_API_END_POINT;
        axios.get(baseUrl+`/get_direct_refferals/${recordsPerPage}?page=${directRefferalsCurrentPage}`, config)
        .then(function (res) {
            setData(res.data['directly_referred_members']['data']);
            SetDirectRefferalsTotalPages(res.data['directly_referred_members']['last_page'])
        })
        .catch(function (err) {
            console.log('error getting direct referrals', err);
        })
        .then(()=> setLoading(false));
    }
    useEffect(() => {
        getDirectReferredMemebers();
    },[directRefferalsCurrentPage]);

    // tabs
	const handleChangeMainTabs = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

    const handleChangeActivetabs = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValueActive(newValue);
    };
    const handleChangeInActivetabs = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValueInActive(newValue);
    };
    
    const handleChangeReferralSearch = (event:any) =>{
        SetSearch(event.target.value)
    }

    let keywordinactive = search.toLowerCase();
  const directReferalUser = directReferal.filter(function(user:any){
   let testuserinactive = user.username.toLowerCase();
   return testuserinactive.indexOf(keywordinactive) > -1 ; 
  });
  
	return (
		<div>
    <MBox className="pageHeader">
        <MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Users List</MTypography>
        <RouterBreadcrumbs />
    </MBox>
    <MBox className="contentBox" component={MPaper}>
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChangeMainTabs}
                indicatorColor="primary"
                textColor="primary"
                className={classes.tabbacki}     
                >
                <Tab  label={
                <Badge badgeContent={0} color="primary">Active</Badge>
                }  {...a11yProps(0)} />
                <Tab label={
                <Badge badgeContent={0} color="error">InActive</Badge>
                } {...a11yProps(1)} />
                <Tab label={
                <Badge badgeContent={0} color="secondary">Direct Referral</Badge>
                } {...a11yProps(2)} />
            </Tabs>
            <TabPanel  value={value} index={0}>
                <MBox mt={0}>
                    <Tabs
                        value={valueActive}
                        onChange={handleChangeActivetabs}
                        indicatorColor="primary"
                        textColor="primary"    
                        >
                        <Tab label={
                        <Badge badgeContent={0} color="primary">Left</Badge>
                        }  {...a11yProps(0)} />
                        <Tab label={
                        <Badge badgeContent={0} color="error">Center</Badge>
                        }   {...a11yProps(1)} />
                        <Tab label={
                        <Badge badgeContent={0} color="secondary">Right</Badge>
                        } {...a11yProps(2)} />
                    </Tabs>
                    <TabPanel  value={valueActive} index={0}>
                        {loading ?
                            <MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
                                <MCircularProgress />
                            </MBox>
                            :
                            <>
                                <UserListComponent userData={leftActiveData} />
                                {activeLeftLegTotalPages > 1 &&  
                                    <MBox py={3} px={2} display="flex" justifyContent="flex-end">
                                        <MPagination count={activeLeftLegTotalPages} page={activeLeftLegCurrentPage} color="primary" setCurrentPage={SetActiveLeftLegCurrentPage} />
                                    </MBox>
                                }
                            </>
                        }
                    </TabPanel>
                    <TabPanel value={valueActive} index={1}>
                        {loading ?
                            <MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
                                <MCircularProgress />
                            </MBox>
                            :
                            <>
                                <UserListComponent userData={centerActiveData} />
                                {activeCenterLegTotalPages > 1 &&  
                                    <MBox py={3} px={2} display="flex" justifyContent="flex-end">
                                        <MPagination count={activeCenterLegTotalPages} page={activeCenterLegCurrentPage} color="primary" setCurrentPage={SetActiveCenterLegCurrentPage} />
                                    </MBox>
                                }
                            </>
                        }
                    </TabPanel>
                    <TabPanel value={valueActive} index={2}>
                    {loading ?
                            <MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
                                <MCircularProgress />
                            </MBox>
                            :
                            <>
                                <UserListComponent userData={rightActiveData} />
                                {activeRightLegTotalPages > 1 &&  
                                    <MBox py={3} px={2} display="flex" justifyContent="flex-end">
                                        <MPagination count={activeRightLegTotalPages} page={activeRightLegCurrentPage} color="primary" setCurrentPage={SetActiveRightLegCurrentPage} />
                                    </MBox>
                                }
                            </>
                        }
                        
                    </TabPanel>
                </MBox>
            </TabPanel>
			<TabPanel value={value} index={1}>
                <MBox mt={0}>
                    <Tabs
                        value={valueInActive}
                        onChange={handleChangeInActivetabs}
                        indicatorColor="primary"
                        textColor="primary"    
                        >
                        <Tab label={
                        <Badge badgeContent={0} color="primary">Left</Badge>
                        }  {...a11yProps(0)} />
                        <Tab label={
                        <Badge badgeContent={0} color="error">Center</Badge>
                        }   {...a11yProps(1)} />
                        <Tab label={
                        <Badge badgeContent={0} color="secondary">Right</Badge>
                        } {...a11yProps(2)} />
                    </Tabs>
                    <TabPanel  value={valueInActive} index={0}>
                        {loading ?
                            <MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
                                <MCircularProgress />
                            </MBox>
                            :
                            <>
                                <UserListComponent userData={leftInActive} />
                                {inActiveLeftLegTotalPages > 1 &&  
                                    <MBox py={3} px={2} display="flex" justifyContent="flex-end">
                                        <MPagination count={inActiveLeftLegTotalPages} page={inActiveLeftLegCurrentPage} color="primary" setCurrentPage={SetInActiveLeftLegCurrentPage} />
                                    </MBox>
                                }
                            </>
                        }
                    </TabPanel>
                    <TabPanel value={valueInActive} index={1}>
                        {loading ?
                            <MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
                                <MCircularProgress />
                            </MBox>
                            :
                            <>
                                <UserListComponent userData={centerInActive} />
                                {inActiveCenterLegTotalPages > 1 &&  
                                    <MBox py={3} px={2} display="flex" justifyContent="flex-end">
                                        <MPagination count={inActiveCenterLegTotalPages} page={inActiveCenterLegCurrentPage} color="primary" setCurrentPage={SetInActiveCenterLegCurrentPage} />
                                    </MBox>
                                }
                            </>
                        }
                    </TabPanel>
                    <TabPanel value={valueInActive} index={2}>
                        {loading ?
                            <MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
                                <MCircularProgress />
                            </MBox>
                            :
                            <>
                                <UserListComponent userData={rightInActive} />
                                {inActiveRightLegTotalPages > 1 &&  
                                    <MBox py={3} px={2} display="flex" justifyContent="flex-end">
                                        <MPagination count={inActiveRightLegTotalPages} page={inActiveRightLegCurrentPage} color="primary" setCurrentPage={SetInActiveRightLegCurrentPage} />
                                    </MBox>
                                }
                            </>
                        }
                    </TabPanel>
                </MBox>
            </TabPanel>
            <TabPanel  value={value} index={2}>
                <MBox p={2}>
                    {
                    loading?
                    <MBox textAlign="center" minHeight={300} mt={3}>
                        <MCircularProgress />
                    </MBox>
                    :
                    <>
                    <MBox mb={2} borderRadius={'4px'} className={classes.listWrapper}>
                        <MBox p={2} display="flex" alignItems="center" justifyContent="space-between">
                            <MBox pr={2} display="flex" alignItems="center" textAlign="left" width="200px">
                                <TextField      
                                    id="input-with-icon-textfield"
                                    label="Search By Username"
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                    variant="outlined"
                                    value={search}
                                    size="small"
                                    onChange={handleChangeReferralSearch}
                                />
                            </MBox>
                        </MBox>
                    </MBox>
                    <MBox>
                        {
                            directReferal && directReferal.length !== 0 ?
                            <MBox mb={2} borderRadius={'4px'} className={classes.header}>
                                <TableContainer component={Paper}>
                          <Table className={classes.table} aria-label="simple table">
                              <TableHead>
                                  <TableRow >
                                      <StyledTableCell align="center">User Name</StyledTableCell>
                                      <StyledTableCell align="center">First Name</StyledTableCell>
                                      <StyledTableCell align="center">Last Name</StyledTableCell>
                                       <StyledTableCell align="center">Phone Number</StyledTableCell>
                                      <StyledTableCell align="center">Email</StyledTableCell>
                                      <StyledTableCell align="center">Status</StyledTableCell>
                                      <StyledTableCell align="center">Expiry Date</StyledTableCell>
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                {
                                    directReferalUser && directReferalUser.map((data:any)=>(
                                        <StyledTableRow key={data.id}>
                                        <StyledTableCell align="center" className={classes.borderStyle} >
                                            <MBox  display="flex" alignItems="center">
											<MAvatar variant="circle" mr={1} className={`${classes.avatar}`}>{data?.username ? data?.username.charAt(0) :""   + '' + data?.username? data?.username.charAt(1):'' } </MAvatar>
											{data.username}
											</MBox>
                                        </StyledTableCell>
                                        <StyledTableCell align="center" className={classes.borderStyle}>{data?.first_name ??  'N/A'}</StyledTableCell>
                                        <StyledTableCell align="center" className={classes.borderStyle}>{data?.last_name ? data?.last_name :"N/A"}</StyledTableCell>
                                        <StyledTableCell align="center" className={classes.borderStyle}><a href={`tel:${data?.mobile}`}>{data?.mobile ? data?.mobile :'N/A'}</a></StyledTableCell>
										<StyledTableCell align="center" className={classes.borderStyle}><a href={`mailto:${data.email}`}>{data.email}</a></StyledTableCell>
                                        <StyledTableCell align="center" className={classes.borderStyle}><MChip

                                            className={data.monthly_status  == 1 ?  classes.Resactive :  classes.Resdeactive}
                                            size="large"
                                            label={data.monthly_status  == 1 ? "Active" : "In-Active"}
                                        />
                                        </StyledTableCell>
                                        <StyledTableCell align="center" className={classes.borderStyle}>{data.monthly_expiry ? Moment(data.monthly_expiry).format('DD-MM-YYYY'):'N/A'}</StyledTableCell>
                                      </StyledTableRow>
                                    ))
                                }
                              </TableBody>
                      </Table>
                  </TableContainer>
                  {directRefferalsTotalPages > 1 &&
                        <MBox py={3} display="flex" justifyContent="flex-end"  className={classes.paginate}>
                            <MPagination count={directRefferalsTotalPages} page={directRefferalsCurrentPage} color="primary" bgcolor="secondary.main" setCurrentPage={SetDirectRefferalsCurrentPage} />
                        </MBox>
                        }
                            </MBox>
                            
                            :
                            <MBox mb={1}>
                              <NoData />
                            </MBox>

                        }
                      
                      
                    </MBox>
                    </>
                    }
                </MBox>
            </TabPanel>
        </Paper>
    </MBox>
</div>
	)
}

export default AllUsersList;
