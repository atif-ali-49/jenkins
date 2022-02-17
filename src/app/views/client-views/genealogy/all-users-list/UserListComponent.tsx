import { useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { NoData } from 'src/app/components';
import SearchIcon from '@material-ui/icons/Search';
import Moment from 'moment';
import { MAvatar, MBox } from 'src/app/components/mui';
import useStyles from './AllUsersListStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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

function UserListComponent(props:any) {
	const classes = useStyles();
	const[search, SetSearch] = useState<any | null>('');

	let searchedKeyword = search.toLowerCase();
	const userData = props.userData && props.userData.filter(function(user:any){
		let testuserinactive = user.username.toLowerCase();
		return testuserinactive.indexOf(searchedKeyword) > -1 ; 
	});

  return (
        <div>  
			<MBox p={2}>			
				<MBox mb={3} mt={2} borderRadius={'4px'} className={classes.listWrapper}>
					<MBox p={2} display="flex" alignItems="center" justifyContent="space-between">
					<MBox pr={2} display="flex" alignItems="center" textAlign="left" width="250px">
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
								onChange={(event)=>SetSearch(event.target.value)}
						/>
						</MBox>
					</MBox>								
				</MBox>
				<MBox>
					{
						userData && userData.length !== 0 
							?

						 <TableContainer component={Paper}>
                          <Table className={classes.table} aria-label="simple table">
                              <TableHead>
                                  <TableRow>
                                      <StyledTableCell align="center">User Name</StyledTableCell>
                                      <StyledTableCell align="center">First Name</StyledTableCell>
                                      <StyledTableCell align="center">Last Name</StyledTableCell>
                                       <StyledTableCell align="center">Phone Number</StyledTableCell>
                                      <StyledTableCell align="center">Email</StyledTableCell>
                                      <StyledTableCell align="center">Expiry Date</StyledTableCell>
                                  </TableRow>
                              </TableHead>
                              <TableBody>
							  {
									userData && userData.map((data:any) => (
							  <StyledTableRow key={data.id}>
                                        <StyledTableCell align="center" className={classes.borderStyle}>
											<MBox  display="flex" alignItems="center">
											<MAvatar variant="circle" mr={1} className={`${classes.avatar}`}>{data?.username ? data?.username.charAt(0) :""   + '' + data?.username? data?.username.charAt(1):'' } </MAvatar>
											{data.username}
											</MBox>
										</StyledTableCell>
                                        <StyledTableCell align="center" className={classes.borderStyle}>{data?.first_name ? data?.first_name :'N/A'}</StyledTableCell>
                                        <StyledTableCell align="center" className={classes.borderStyle}>{data?.last_name ? data?.last_name :"N/A"}</StyledTableCell>
                                        <StyledTableCell align="center" className={classes.borderStyle}><a href={`tel:${data?.mobile}`}>{data?.mobile ? data?.mobile :'N/A'}</a></StyledTableCell>
										<StyledTableCell align="center" className={classes.borderStyle}><a href={`mailto:${data.email}`}>{data.email}</a></StyledTableCell>
										<StyledTableCell align="center" className={classes.borderStyle}>{data.monthly_expiry ? Moment(data.monthly_expiry).format('DD-MM-YYYY'):'N/A'}</StyledTableCell>
                                      </StyledTableRow>
					))
										}
                              </TableBody>
                      </Table>
                  </TableContainer>
				  :
				  <MBox mb={1}>
                  <NoData />
                </MBox>
						}
				
				</MBox>
			</MBox>
		</div>
    )
}

export default UserListComponent;
