import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { NoData } from 'src/app/components';
import { MBox, MCircularProgress, MPagination, MPaper } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import useStyles from './PeaceMakersStyles';

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

export default function StarterPage(){
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const  dispatch = useDispatch();
  const[recordsPerPage, setRecordsPerPage] = useState(30);
  const[currentPage, setCurrentPage] = useState(1);
  const[totalPages, setTotalPages] = useState(0);

  const getTrinaryCommissionEarnings = () => {
		setLoading(true);
		const baseUrl = process.env.REACT_APP_API_END_POINT;
    axios.get(baseUrl+`/trinary_comm/${recordsPerPage}?page=${currentPage}`)
		.then(function (res) {
			setData(res.data['commission_earning']['data']);
      setTotalPages(res.data['commission_earning']['last_page'])
		})
		.catch(function (error) {
			console.log('error', error);
		})
		.then(() => {
			setLoading(false);
		});
	}
	
	useEffect(()=>{
		getTrinaryCommissionEarnings();
	},[currentPage])

  return (
    <>
        <Box className="pageHeader">
            <Typography className="mainHeading" gutterBottom component="h1" variant="h4">Peace Makers</Typography>
                    <RouterBreadcrumbs />
        </Box>


        <MBox className="contentBox" component={MPaper}>
            <Typography variant="h5"  component="h2" className={classes.marginBottom}>Your Monthly Ranks</Typography>

            <Box mb={3}>
                <List className={classes.instructionsList}>
                <ListItem>
                <Box mr={1}>
                    <CheckCircleOutlineIcon className={classes.peaceicon}/>
                </Box>
                <ListItemText primary="Member must have an active Peacecoin plan." />
                </ListItem>

                <ListItem>
                <Box mr={1}>
                     <CheckCircleOutlineIcon className={classes.peaceicon} />
                    {/* <svg className="MuiSvgIcon-root makeStyles-peaceicon-102" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg> */}
                </Box>
                <ListItemText primary="Member must have paid Peacecoin monthly qualification of current month."  />
                </ListItem>

                <ListItem>
                <Box mr={1}>
                    <CheckCircleOutlineIcon className={classes.peaceicon} />
                </Box>
                <ListItemText primary="Member must be income-qualified." />
                </ListItem>

                <ListItem>
                <Box mr={1}>
                    <CheckCircleOutlineIcon  className={classes.peaceicon}/>
                </Box>
                <ListItemText  primary="Member must have balance requirements, fulfilled."  />
                </ListItem>

                <ListItem>
                <Box mr={1}>
                    <CheckCircleOutlineIcon className={classes.peaceicon} />
                    </Box>
                    <ListItemText primary="Member must be in good standing with the company."  />
                </ListItem>
            </List>
        </Box>

        {loading ?
          <MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
            <MCircularProgress />
          </MBox>
          :
          <>
          { 
            data && data.length !== 0 ?
              <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                      <TableRow >
                          <StyledTableCell>Month</StyledTableCell>
                          <StyledTableCell align="center">Rank</StyledTableCell>
                          <StyledTableCell align="center">Earn </StyledTableCell>
                          <StyledTableCell align="center">Left leg sale</StyledTableCell>
                          <StyledTableCell align="center">Center leg sale</StyledTableCell>
                          <StyledTableCell align="center">Right leg sale</StyledTableCell>
                      </TableRow>
                  </TableHead>

                  <TableBody>
                      {data.map(({ commission_month, rank, earn, left_active_users, center_active_users, right_active_users }) => (
                          <StyledTableRow key={commission_month+earn}>
                            <StyledTableCell component="th" scope="row">{commission_month}</StyledTableCell>
                            <StyledTableCell align="center" >{rank}</StyledTableCell>
                            <StyledTableCell align="center">{earn}</StyledTableCell>
                            <StyledTableCell align="center">{left_active_users}</StyledTableCell>
                            <StyledTableCell align="center">{center_active_users}</StyledTableCell>
                            <StyledTableCell align="center">{right_active_users}</StyledTableCell>
                          </StyledTableRow>
                      ))}
                  </TableBody>
              </Table>
              </TableContainer>
              :
              <MBox mb={1}>
                <NoData />
              </MBox>
            }
            {
              totalPages > 1 &&
              <MBox mt={4} display="flex" justifyContent="flex-end">
                  <MPagination count={totalPages} page={currentPage} color="primary" setCurrentPage={setCurrentPage} />
              </MBox> 
            }
          </>
        }
    </MBox>
    </>
   );
};