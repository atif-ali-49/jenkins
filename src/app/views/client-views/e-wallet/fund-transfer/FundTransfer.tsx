import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import { MBox, MGrid,MPaper,MPagination,MCircularProgress } from 'src/app/components/mui';
import Typography from '@material-ui/core/Typography';
import { withStyles, Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { MAutoComplete } from 'src/app/components/mui';
import EveryThingData from './EvrythingData';
import YearsData from './YearsData';
import AllMonths from './AllMonths';
import Checkbox from '@material-ui/core/Checkbox';
import WitdrawalModal from './WithdrawalModal';

import React,{useEffect, useState} from 'react';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { NoData } from "src/app/components";
import Moment from 'moment';
import { useDispatch } from 'react-redux';
import CommingSoon from './CommingSoon';
import {showAlert } from "src/app/store";
function FundTransfer(props:any) {
    const [filterError, setFilterError] = useState<null | any>(false);
    const [withdraw,setWithdraw] = useState(false);
    const[search,setSearch] = useState('');
    const[resetBtnflag,setResetBtnFlag] = useState(false);
    const [loading, setLoading] = useState(false);
    const[withDrawListData,setWithDrawListData] = useState<null | any>([]);
    const[perPage, setRecordsPerPage] = useState(30);
    const[currentPage, setCurrentPage] = useState(1);
    const[totalPages, setTotalPages] = useState(0);
    const [filterCount, setFilterCount] = React.useState<null | any>(0);
    const baseurl = process.env.REACT_APP_API_END_POINT;
	const [listFundsTransactions, setListFundsTransactions]=useState([])
	const baseUrl = process.env.REACT_APP_API_END_POINT;
    const[tax, setTax]=React.useState('');
    const [coins, setCoins]=React.useState<any | null>([]);
    const [featureEnabledDisabled, setFeaturedEanbledDisabled]=React.useState<any | null>(false);
    const dispatch = useDispatch();
    const [userData, setUserData]=React.useState<any | null>({});
    const [emptyData, setEmptyData]=React.useState<any | null>(false);
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1
            },
            btn:{
                weight:"700",
                fontSize:"16px",
                borderRadius:"5%",
                width:"7.6rem",
                wordSpacing:"20px",
            },
            completedbtn:{
                backgroundColor:"#a5d6a7",
                fontSize:"14px",
                borderRadius:"8px",
                padding:"5px",
                fontWeight:"bold",
            },
            hidde_text_field:{
                visibility:'hidden'
            },
            circular:{
                position:"relative",
                top:"50%",
                left:"50%",
                padding:theme.spacing(7),
            },
            btnReset:{
                color:'red'
            },
            resetbtn:{
                color:'#ff4000',
                paddingTop:'40px',
                paddingLeft: '10px'
            },
            approvedChip:{
                backgroundColor: '#4dd39b',
                color:'#fff',
                borderRadius:'0px',
                textTransform:"uppercase",
                letterSpacing:'1px',
                cursor: 'text',
                fontWeight:'bold',
                fontSize:'smaller'
            },
            rejectedChip:{
                backgroundColor: '#e37e8c',
                color:'#fff',
                borderRadius:'0px',
                textTransform:"uppercase",
                letterSpacing:'1px',
                cursor: 'text',
                fontWeight:'bold',
                fontSize:'smaller'
            },
            pendingChip:{
                backgroundColor: '#ffa700',
                color:'#fff',
                borderRadius:'0px',
                textTransform:"uppercase",
                letterSpacing:'1px',
                cursor: 'text',
                fontWeight:'bold',
                fontSize:'smaller'
            },
            '& .makeStyles-circular-789':{
                position:'unset'
            }

        })
    );
    function listTransactions(openModalFlag=true){

        axios.get(baseUrl + '/withdraw_popup_data')

            .then(function (res) {

                if(res.status === 200){
                    if(res.data.withdraw_feature_status == 0){
                        setFeaturedEanbledDisabled(true);
                    }

                    setUserData(res.data.user);

                    setTax(res.data.withdraw_charges)

                    setCoins(res.data.coins)


                    setWithdraw(openModalFlag);
                     if(res.data.withdraw_feature_status == 1){
                         withDrawList(null)
                     }


                }

            })

            .catch(function (error) {

                console.log('error transactions', error)

            })

            .then( ()=> setLoading(false));

    }
    const setwithdraw=() =>{
        listTransactions();
    }
    const searchHandler = (e:any)=>{
        setSearch(e.target.value);
        setFilterError(false);

    }
    const withDrawList = async (pageNum:any) =>{
         setLoading(true)
        let  pageNumber =  pageNum != null ? pageNum  : currentPage;
        if(pageNum == 1){

            if(!search){
                setFilterError(true);
                return false;
            } else{
                setResetBtnFlag(true)
                await  axios.get(baseurl + `/withdraw?perPage=${perPage}&page=${pageNumber}`,
                    {
                        params:{
                            search:search

                        }

                    }
                )
                    .then(function (response) {
                        if(response.data.withdraw_request.data.length > 0){
                            setWithDrawListData(response.data.withdraw_request.data)
                        }else{
                            setEmptyData(true)
                        }

                        setTotalPages(response.data.withdraw_request.last_page);
                        setLoading(false)
                    })
                    .catch(function (error) {




                    })
                    .then(function () {
                        setLoading(false)
                    });
            }

        }
        else{
            setLoading(true)
            await axios.get(baseurl + `/withdraw?perPage=${perPage}&page=${pageNumber}`,
                {
                    params:{
                        search:search

                    }

                }
            )
                .then(function (response) {
                    if(response.data.withdraw_request.data.length > 0){
                        setWithDrawListData(response.data.withdraw_request.data)
                    }else{
                        setEmptyData(true)
                    }
                     setTotalPages(response.data.withdraw_request.last_page);
                    setSearch('')
                    setLoading(false)
                })
                .catch(function (error) {
                    if(error.response.status == 404){

                    }

                })
                .then(function () {
                    setLoading(false)
                });
        }



    }
    const resetSearch = async () =>{
        setResetBtnFlag(false)
        setCurrentPage(1)
        setSearch('');
        setLoading(true)
        await axios.get(baseurl + `/withdraw?perPage=${perPage}&page=${currentPage}`,
            {
                params:{
                    search:''

                }

            }
        )
            .then(function (response) {
                if(response.data.withdraw_request.data.length > 0){
                    setWithDrawListData(response.data.withdraw_request.data)
                }else{
                    setEmptyData(true)
                }
                setTotalPages(response.data.withdraw_request.last_page);
                setLoading(false)
            })
            .catch(function (error) {




            })
            .then(function () {
                setLoading(false)
            });
    }

    useEffect(() => {
        listTransactions(false);
    }, [currentPage]);
//  For Table
    const StyledTableCell = withStyles((theme: Theme) =>
        createStyles({
            head: {
                backgroundColor: "#e0e0e0",
                color: theme.palette.common.black,
            },
            body: {
                fontSize: 13,
                border: "1px solid black",
            },
        }),
    )(TableCell);

    const StyledTableRow = withStyles((theme: Theme) =>
        createStyles({
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.action.hover,

                },
                "& .MuiChip-label":{
                    fontWeight:"bold",
                    padding:"15px",
                },
                "& .MuiChip-root":{
                    width: "6rem",
                },
                completedChip:{
                    width: "6rem",
                }
            },
        }),
    )(TableRow);





    const classes = useStyles();
    return (
        <>

            {

                <MBox className="pageHeader">
                <Typography className="mainHeading" gutterBottom component="h1" variant="h4">WithDraw Coins</Typography>
                <RouterBreadcrumbs />
            </MBox>
            }



                <MBox className="contentBox" component={MPaper}>
                    {
                        loading  ?
                            <MBox
                                display="flex"
                                alignItems="center"

                                height="auto"
                                justifyContent="center"
                                className={classes.circular}
                                style={{position:'inherit'}}
                            >


                                    <MCircularProgress/>


                            </MBox>
                        :<>
                            {
                                featureEnabledDisabled ?
                                    <CommingSoon />

                                    :
                                    <>
                                        <div className={classes.root}>


                                            <MBox mb={3}>
                                                <MGrid container spacing={1}>
                                                    <MGrid item xs={12} sm={12} md={12} lg={2} ml={2}>
                                                        <TextField
                                                            id="outlined-error-helper-text"
                                                            label="Search"
                                                            value={search}
                                                            error={filterError}
                                                            helperText={ filterError && "Search field is required"}
                                                            variant="outlined"
                                                            size={'small'}
                                                            onChange={(e)=>{searchHandler(e)}}/>
                                                    </MGrid>

                                                    <MGrid item xs={12} sm={12} md={12} lg={2}  mt={2}>
                                                        <Button variant="contained" color="primary" className={classes.btn} size={'small'}  onClick={()=>withDrawList(1)}>
                                                            Search
                                                        </Button>

                                                        {
                                                            resetBtnflag &&
                                                            <a  href="javascript:void(0)" className={classes.resetbtn} onClick={()=>resetSearch()}>
                                                                Reset
                                                            </a>
                                                        }


                                                    </MGrid>
                                                    <MGrid item xs={12} sm={12} md={12} lg={2}  ml={2}  className={classes.hidde_text_field}>
                                                        <MAutoComplete  options={AllMonths} label={'Tx ID'} getOptionLabel={(option) => option.title} id={"months"} />
                                                    </MGrid>
                                                    <MGrid item xs={12} sm={12} md={12} lg={2}  ml={2}  className={classes.hidde_text_field}>
                                                        <MAutoComplete  options={AllMonths} label={'Tx ID'} getOptionLabel={(option) => option.title} id={"months"} />
                                                    </MGrid>
                                                    <MGrid item xs={12} sm={12} md={12} lg={4} align="right" p={1} >
                                                        <Button variant="contained" color="primary" className={classes.btn} onClick={setwithdraw} >Withdraw</Button>
                                                    </MGrid>

                                                </MGrid>

                                            </MBox>


                                            <MBox>
                                            </MBox>
                                            {

                                                    <TableContainer component={Paper}>
                                                        <Table  aria-label="customized table" >
                                                            <TableHead>
                                                                <TableRow>
                                                                    <StyledTableCell align="center">Sr#</StyledTableCell>
                                                                    <StyledTableCell align="center"> Date</StyledTableCell>
                                                                    <StyledTableCell align="center" title="PeaceCoin Wallet Address on Exchange">PeaceCoin Wallet Address</StyledTableCell>
                                                                    <StyledTableCell align="center">Amount</StyledTableCell>
                                                                    <StyledTableCell align="center">Charges</StyledTableCell>
                                                                    <StyledTableCell align="center">Transferable Amount</StyledTableCell>
                                                                    <StyledTableCell align="center">Remarks</StyledTableCell>
                                                                    <StyledTableCell align="center">Transaction ID</StyledTableCell>
                                                                    <StyledTableCell align="center">Status</StyledTableCell>


                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>

                                                                {

                                                                    withDrawListData.length > 0  &&
                                                                    withDrawListData.map((data,index) => (
                                                                        <StyledTableRow key={data.id} >
                                                                            <StyledTableCell  component="th" scope="row" align="center">{index +1}</StyledTableCell>
                                                                            <StyledTableCell  component="th" scope="row" align="center">{data?.created_at ? Moment(data?.created_at).format('DD-MM-YYYY'):'N/A'}</StyledTableCell>
                                                                            <StyledTableCell align="center">{data?.exchange_username}</StyledTableCell>
                                                                            <StyledTableCell align="center">{data?.amount}</StyledTableCell>
                                                                            <StyledTableCell component="th" align="center" scope="row">{data?.charges ? (data?.amount/100) *JSON.parse(data?.charges)?.withdraw_charges: 0}</StyledTableCell>
                                                                            <StyledTableCell component="th" align="center" scope="row">{data?.charges ? data?.amount - (data?.amount/100) *JSON.parse(data?.charges)?.withdraw_charges:0}</StyledTableCell>
                                                                            <StyledTableCell align="center">{data.remarks ?? 'N/A'} </StyledTableCell>
                                                                            <StyledTableCell align="center">{data.exchange_transaction_id ?? 'N/A'} </StyledTableCell>
                                                                            <StyledTableCell align="center">
                                                                                <Chip label={data.status} size="small"
                                                                                      className={data?.status == 'rejected' ? classes.rejectedChip : data?.status == 'pending' ?  classes.pendingChip : classes.approvedChip}/>
                                                                            </StyledTableCell>
                                                                        </StyledTableRow>
                                                                    ))




                                                                }
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                            }



                                            <>

                                                {emptyData ?
                                                    <MBox
                                                        display="flex"
                                                        alignItems="center"
                                                        height="auto"
                                                        justifyContent="center"
                                                        className={classes.circular}
                                                        style={{position:'static'}}

                                                    >

                                                        <NoData/>
                                                    </MBox>
                                                    :

                                                    <MBox
                                                        display="flex"
                                                        alignItems="center"

                                                        height="auto"
                                                        justifyContent="center"
                                                        className={classes.circular}
                                                        style={{
                                                            position: 'absolute',
                                                            top: "35%"
                                                        }}
                                                    >


                                                        <MBox>
                                                            <MCircularProgress/>
                                                        </MBox>


                                                    </MBox>}
                                            </>
                                            <MBox mt={3} display="flex" justifyContent="flex-end">
                                                <MBox><MPagination count={totalPages} page={currentPage} color="primary" setCurrentPage={setCurrentPage} /></MBox>
                                            </MBox>

                                        </div>
                                        <WitdrawalModal open={withdraw} setOpen={setWithdraw} coins={coins} userData={userData} tax={tax} withDrawList={withDrawList} />
                                    </>
                            }
                        </>
                    }

                </MBox>

        </>
    );
}

export default FundTransfer;
