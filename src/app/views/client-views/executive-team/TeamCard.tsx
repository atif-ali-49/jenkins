import React from 'react'
import { MBox, MTypography, MGrid } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import useStyles from './ExecutiveTeamStyle';

function TeamCard(props) {
const classes = useStyles(); 
    return (       
               <MGrid item sm={12} md={6} >
					<MBox border={1} display="flex" alignItems="center" justifyContent="center" borderColor="grey.500" className={classes.sameHeight} boxShadow={2} borderRadius={6} p={3}>
						<MGrid container alignItems="center" justifyContent="center" spacing={2}>
							<MGrid item sm={12} md={4}>
								<MBox textAlign="center" mr={2} className={classes.teamImgCover}>
									<img width="100%" src={props.image} alt="executive team" className={classes.team}></img>
								</MBox>
							</MGrid>
							<MGrid item sm={12} md={8}>
								<MBox className={"teamInfo"}>
									<MTypography variant="h5">{props.name}</MTypography>
									<MTypography variant="subtitle">{props.designation}</MTypography>
									<MTypography variant={"body1"} className={classes.textbreak}>{props.description}</MTypography>
								</MBox>
							</MGrid>
                      </MGrid>
					</MBox>
				</MGrid>	
    )
}

export default TeamCard
