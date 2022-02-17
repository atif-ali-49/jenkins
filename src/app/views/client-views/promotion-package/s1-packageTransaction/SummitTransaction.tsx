import {useEffect, useState} from 'react'
import Box from '@material-ui/core/Box';
import { withStyles,Theme,createStyles } from '@material-ui/core/styles';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import Paper from '@material-ui/core/Paper';
import useStyles from './SummitTransactionStyles'
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { MPagination, MPaper, MBox, MCircularProgress , MChip} from 'src/app/components/mui';
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

function SummitTransaction() {
    const classes = useStyles();
	const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const[recordsPerPage, setRecordsPerPage] = useState(30);
    const[currentPage, setCurrentPage] = useState(1);
    const[totalPages, setTotalPages] = useState(0);

	const getLotteryTransactions = () => {
		setLoading(true);
		const baseUrl = process.env.REACT_APP_API_END_POINT;
		axios.get(baseUrl+`/get_opportunity_info/${recordsPerPage}?page=${currentPage}`)
		.then(function (res) {
			console.log(res,'res');
			setData(res.data['opportunities']['data']);
			setTotalPages(res.data['smart_pay_packages']['last_page']);
		})
		.catch(function (err) {
			console.log('error summit package transactions', err)
		})
		.then(() => {
			setLoading(false);
		});
	}
	
	useEffect(()=>{
		getLotteryTransactions();
	},[currentPage])

    return (
        <div>
            <Box className="pageHeader">
				<Typography className="mainHeading" gutterBottom component="h1" variant="h4">One Summit Transactions</Typography>
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
										<StyledTableCell align="center">Raffle Id</StyledTableCell>
										<StyledTableCell align="center">Shipping Status</StyledTableCell>
										<StyledTableCell align="center">Price</StyledTableCell>
										<StyledTableCell align="center">Tax</StyledTableCell>
										<StyledTableCell align="center">Shipping Charges</StyledTableCell>
										<StyledTableCell align="center">Total</StyledTableCell>
										<StyledTableCell align="center">Date Created</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{data && data.map( ({order_id, ship_status, product_price, tax, shipping_charges, total, created_at}) => (
										<StyledTableRow key={order_id}>
											<StyledTableCell align="center">{order_id}</StyledTableCell>
											<StyledTableCell align="center"><MChip className={`statusChip ${ship_status ==0? "error": ship_status==2? "success":ship_status==1? 'warning': ship_status}`} size="small" label={`${ship_status ==0? "Open Order": ship_status==2? "Shipped":ship_status==1? 'manufacturing': ship_status}`}/></StyledTableCell>
											<StyledTableCell align="center" >{product_price}</StyledTableCell>
											<StyledTableCell align="center" >{tax}</StyledTableCell>
											<StyledTableCell align="center" >{shipping_charges}</StyledTableCell>
											<StyledTableCell align="center" >{total}</StyledTableCell>
											<StyledTableCell align="center">{Moment(created_at).format('DD-MM-YYYY')}</StyledTableCell>
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						{
							totalPages > 1 &&
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

export default SummitTransaction
