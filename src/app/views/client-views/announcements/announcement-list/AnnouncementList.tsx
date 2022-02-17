import { useEffect, useState } from 'react';
import { MBox, MButtonBase, MAvatar, MTypography, MCircularProgress } from 'src/app/components/mui';
import AnnouncementDetailDrawer from '../announcement-detail-drawer/AnnouncementDetailDrawer';
import ScheduleIcon from '@material-ui/icons/Schedule';
import useStyles from './AnnouncementListStyles';
import { NoData } from 'src/app/components'

function AnnouncementList(props: any) {

	const classes = useStyles();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [currentDataId, setCurrentDataId] = useState(1);
	const openDetailDrawer = (id)=> {
		setCurrentDataId(id);
		setIsDrawerOpen(true);
	}


	return (
		<MBox>
			{
				props.loading ?
					<MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
						<MCircularProgress />
					</MBox>
					:
					props.data.length ? props.data.map((item: any) => (
						<MBox mb={1} borderRadius={'4px'} key={item.id}>
							<MButtonBase key={item.id} className={classes.listWrapper} onClick={()=>openDetailDrawer(item.id)}>
								<MBox p={2} display="flex" alignItems="center" justifyContent="space-between">
									<MBox pr={2}>
										<MAvatar variant="circle" className={`${classes.avatar}`}>{item.title.charAt(0) + '' + item.title.charAt(1)}</MAvatar>
									</MBox>
									<MBox pr={2} flexGrow={1} textAlign="left" minWidth="100px">
										<MTypography className={classes.paragraphWidth} noWrap>{item.title}</MTypography>
									</MBox>
									<MBox textAlign="center">
										<MBox className={classes.label} pb={"2px"}>
											<ScheduleIcon className="fa fa-plus-circle" fontSize="inherit" /> Created Date
										</MBox>
										<MBox>
											{item.created_at && item.created_at.substring(0, 10)}
										</MBox>
									</MBox>
								</MBox>
							</MButtonBase>
						</MBox>
					))
					:
					<MBox mb={1}>
						<NoData />
					</MBox>
			}
			<AnnouncementDetailDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} currentId={currentDataId} />
		</MBox>
	);
}

export default AnnouncementList;
