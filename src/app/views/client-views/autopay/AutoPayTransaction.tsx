import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { useDispatch } from "react-redux";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Moment from 'moment';
import { NoData } from 'src/app/components';
import { MBox, MChip, MCircularProgress, MPaper, MPagination } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import useStyles from './AutoPayTransactionStyle';
const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
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
function AutoPayTransaction(props) {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const[recordsPerPage, setRecordsPerPage] = useState(30);
    const[currentPage, setCurrentPage] = useState(1);
    const[totalPages, setTotalPages] = useState(0);
    const  dispatch = useDispatch();
    const baseUrl = process.env.REACT_APP_API_END_POINT;
    let currntDate = new Date();
    const getAutoPayTransactions = () => {
        setLoading(true);
        axios.get(baseUrl+`/autopay_transactions/${recordsPerPage}?page=${currentPage}`)
            .then(function (res) {
                if(res.status === 200){
                    setData(res.data['transactions']['data']);
                    setTotalPages(res.data['transactions']['last_page']);
                }
            })
            .catch(function (error) {
                console.log('error getting autopay transactions', error)
            })
            .then( ()=> setLoading(false));
    }

    useEffect(()=>{
        getAutoPayTransactions();
    },[currentPage])

    return (
        <div>
            <MBox className="pageHeader">
                <Typography className="mainHeading" gutterBottom component="h1" variant="h4">Auto Pay Transactions</Typography>
                <RouterBreadcrumbs />
            </MBox>
            {loading ?
                <MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
                    <MCircularProgress />
                </MBox>
                :
                <MBox className="contentBox" component={MPaper}>
                    {
                        data && data.length !== 0 ?
                            <MBox mt={3}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow >
                                                <StyledTableCell align="center">Category</StyledTableCell>
                                                <StyledTableCell align="center">Price</StyledTableCell>
                                                <StyledTableCell align="center">Status</StyledTableCell>
                                                <StyledTableCell align="center">Merchant Message</StyledTableCell>
                                                <StyledTableCell align="center">Date</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data && data.map( ({package_category,amount_charged,id,created_at,status,merchant_message}) => (
                                                <StyledTableRow key={id}>
                                                    <StyledTableCell align="center">{package_category}</StyledTableCell>
                                                    <StyledTableCell align="center" >${amount_charged}</StyledTableCell>
                                                    <StyledTableCell align="center">{status == 2 ? <MChip size="small" className={`statusChip error`} label="Failed" /> : <MChip size="small" className={`statusChip success`} label="Success" />}</StyledTableCell>
                                                    <StyledTableCell align="center">{merchant_message}</StyledTableCell>
                                                    <StyledTableCell align="center">{created_at !== null ? Moment(created_at).format('DD-MM-YYYY') : Moment(currntDate).format('DD-MM-YYYY') }</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {totalPages > 1 &&  
                                    <MBox mt={3} display="flex" justifyContent="flex-end">
                                        <MPagination count={totalPages} page={currentPage} color="primary" setCurrentPage={setCurrentPage} />
                                    </MBox>
                                }
                            </MBox>
                            :
                            <MBox mb={1}>
                                <NoData />
                            </MBox>
                    }
                </MBox>
            }
        </div>
    );
}

export default AutoPayTransaction;