import React, {useState, useEffect} from 'react'
import { MBox, MTypography,MChip, MPaper, MCircularProgress, MPagination } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import useStyles from './ReferredMembersListStyles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';

import {useDispatch} from "react-redux";
import { showAlert } from "src/app/store";
import { NoData } from 'src/app/components';
import Moment from 'moment';
import axios from 'axios'

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

function ReferredMembersList() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const[recordsPerPage, setRecordsPerPage] = useState(30);
    const[currentPage, setCurrentPage] = useState(1);
    const[totalPages, setTotalPages] = useState(0);
    const  dispatch = useDispatch();
    
    const getDirectReferredMemebers = () => {
      setLoading(true);
      const baseUrl = process.env.REACT_APP_API_END_POINT;
      axios.get(baseUrl+`/get_direct_refferals/${recordsPerPage}?page=${currentPage}`)
      .then(function (res) {
        setData(res.data['directly_referred_members']['data']);
        setTotalPages(res.data['directly_referred_members'].last_page);
      })
      .catch(function (error) {
        console.log('error getting referred memeber', error);
      })
      .then(() => {
        setLoading(false);
      });
    }
    
    useEffect(() => {
      getDirectReferredMemebers();
    },[currentPage]);

    return (
        <div>
            <MBox className="pageHeader">
              <MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Referred Members</MTypography>
              <RouterBreadcrumbs />
            </MBox>

            <MBox className="contentBox" component={MPaper}>
            {loading ?
            <MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
              <MCircularProgress />
            </MBox>
            :
            <>
              { 
                data && data.length !== 0 ?
                <>
                  <TableContainer component={Paper}>
                          <Table className={classes.table} aria-label="simple table">
                              <TableHead>
                                  <TableRow >
                                      <StyledTableCell align="center">First Name</StyledTableCell>
                                      <StyledTableCell align="center">Last Name</StyledTableCell>
                                      <StyledTableCell align="center">Email</StyledTableCell>
                                       <StyledTableCell align="center">Phone Number</StyledTableCell>
                                      <StyledTableCell align="center">Monthly Status</StyledTableCell>
                                      <StyledTableCell align="center">Monthly Expiry</StyledTableCell>
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                  {data.map(({ first_name, last_name, email, monthly_status, monthly_expiry, mobile }) => (
                                      <StyledTableRow key={email}>
                                        <StyledTableCell align="center" >{first_name}</StyledTableCell>
                                        <StyledTableCell align="center">{last_name}</StyledTableCell>
                                        <StyledTableCell align="center"><a href={`mailto:${email}`}>{email}</a></StyledTableCell>
                                         <StyledTableCell align="center"><a href={`tel:${mobile}`}>{mobile}</a></StyledTableCell>
                                        <StyledTableCell align="center">
                                        
                                          {monthly_status === 1 ?
                                            <MChip className={`statusChip success`} size="small" label="Active" />
                                            :
                                            <MChip className={`statusChip error`} size="small" label="Inactive" />
                                          }

                                        </StyledTableCell>
                                        <StyledTableCell align="center">{Moment(monthly_expiry).format('DD-MM-YYYY')}</StyledTableCell>
                                      </StyledTableRow>
                                  ))}
                              </TableBody>
                      </Table>
                  </TableContainer>
                  {
							      totalPages > 1 &&
                    <MBox mt={4} display="flex" justifyContent="flex-end">
                        <MPagination count={totalPages} page={currentPage} color="primary" setCurrentPage={setCurrentPage} />
                    </MBox>
                  }
                </>
                :
                <MBox mb={1}>
                  <NoData />
                </MBox>
                }
              </>
            }
          </MBox>
        </div>
    )
}

export default ReferredMembersList;