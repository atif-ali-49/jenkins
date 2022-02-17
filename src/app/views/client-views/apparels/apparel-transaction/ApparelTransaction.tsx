import React, {useEffect, useState} from 'react'
import Box from '@material-ui/core/Box';
import { withStyles,Theme,createStyles } from '@material-ui/core/styles';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import Paper from '@material-ui/core/Paper';
import useStyles from './ApparelTransactionStyles'
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { MPagination, MPaper, MBox, MCircularProgress } from 'src/app/components/mui';
import {useDispatch} from "react-redux";
import { showAlert } from "src/app/store";
import { NoData } from 'src/app/components';
import axios from 'axios'
import Moment from 'moment';
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

function ApparelTransaction() {
  	const classes = useStyles();
	const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
	const[recordsPerPage, setRecordsPerPage] = useState(30);
    const[currentPage, setCurrentPage] = useState(1);
    const[totalPages, setTotalPages] = useState(0);
	const  dispatch = useDispatch();
	const baseUrl = process.env.REACT_APP_API_END_POINT;

	const getRegistrationTransactions = () => {
		setLoading(true);
		axios.get(baseUrl+`/my_smart_pay_package/apparels/${recordsPerPage}?page=${currentPage}`)
		.then(function (res) {
			setData(res.data['smart_pay_packages']['data']);
			setTotalPages(res.data['smart_pay_packages']['last_page']);
		})
		.catch(function (err) {
			console.log(err)
		})
		.then(() => {
			setLoading(false);
		});
	}
	
	useEffect(()=>{
		getRegistrationTransactions();
	},[currentPage])

    return (
        <div>
            <Box className="pageHeader">
				<Typography className="mainHeading" gutterBottom component="h1" variant="h4">Apparel Transactions</Typography>
				<RouterBreadcrumbs />
			</Box>
			{loading ?
				<MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
					<MCircularProgress />
				</MBox>
				:
				<MBox className="contentBox" component={MPaper}>
					{ 
					data && data.length !== 0 ?
					<Box mt={3}>
						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow >
										<StyledTableCell align="center">Category</StyledTableCell>
										<StyledTableCell align="center">Price</StyledTableCell>
										<StyledTableCell align="center">Quantity</StyledTableCell>
										<StyledTableCell align="center">Total</StyledTableCell>
										<StyledTableCell align="center">Order ID</StyledTableCell>
										<StyledTableCell align="center">Tracking ID</StyledTableCell>
										<StyledTableCell align="center">Date</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{data && data.map( ({id, category, product_price, order_id, tracking_id ,created_at,qty,total}) => (
										<StyledTableRow key={id}>
											<StyledTableCell align="center">{category}</StyledTableCell>
											<StyledTableCell align="center" >${product_price}</StyledTableCell>
											<StyledTableCell align="center">{qty}</StyledTableCell>
											<StyledTableCell align="center">${total}</StyledTableCell>
											<StyledTableCell align="center">{order_id}</StyledTableCell>
											<StyledTableCell align="center">{tracking_id ? tracking_id :'N/A' }</StyledTableCell>
											<StyledTableCell align="center">{Moment(created_at).format('DD-MM-YYYY')}</StyledTableCell>
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
					</Box>
					:
					<MBox mb={1}>
						<NoData />
					</MBox>
					}
				</MBox>
				}
		</div>
	)
}

export default ApparelTransaction
