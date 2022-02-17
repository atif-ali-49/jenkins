import { useEffect, useState } from 'react';
import { MBox, MButtonBase, MAvatar, MTypography, MCircularProgress } from 'src/app/components/mui';
import ScheduleIcon from '@material-ui/icons/Schedule';
import useStyles from './CoinStyles';
import { NoData } from 'src/app/components'

import Hidden from '@material-ui/core/Hidden';

function CoinList(props: any) {

	const classes = useStyles();
	let currentDate = new Date()

	return (
		<MBox>
			{props.loading ?
				<MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
					<MCircularProgress />
				</MBox>
				:
				props.data.length ? props.data.map((item: any) => (
					
					<MBox mb={1} borderRadius={'4px'} key={item.id}>
						<MBox key={item.coin.id} className={classes.listWrapper}>
							<MBox p={2} display="flex" alignItems="center" className={classes.mediaQuery}  textAlign="center" justifyContent="space-between">
								<MBox display="flex" alignItems="center" >
									<MAvatar className={`${classes.avatar}`} src="https://s3.us-east-2.amazonaws.com/b.peacecoin.io/frontend/images/ppc.png" />
									<MBox pl={2} minWidth="80px">
										<MBox className={classes.label}>Coin Name</MBox>
										<MTypography noWrap >{item.coin.name}</MTypography>
									</MBox>
								</MBox>
								<MBox minWidth="100px" >
									<MBox className={classes.label}>Total Coins</MBox>
									<MTypography>{item.number_of_coins}</MTypography>
								</MBox>

							
									<MBox  className={classes.noteswidth}>
										<MBox className={classes.label}>Notes</MBox>
										<MBox ><MTypography className={classes.noteSize}  noWrap>{item.notes}</MTypography></MBox>
									</MBox>
								

								
									<MBox minWidth="10px">
										<MBox className={classes.label} pb={"2px"}>
											<ScheduleIcon className="fa fa-plus-circle" fontSize="inherit" /> Created Date
										</MBox>
										<MBox>
											{
												item.created_at ? item.created_at.substring(0, 10)
													: "N/A"
											}
										</MBox>

									</MBox>
								
							</MBox>
						</MBox>
					</MBox>
					
				))
				:
				<MBox mb={1} borderRadius={'4px'}>
					<NoData />
				</MBox>

			}
		</MBox>
	);
}

export default CoinList;
