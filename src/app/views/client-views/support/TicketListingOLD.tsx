import React from 'react'
import { MBox, MTypography,	MChip, MPaper } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import useStyles from './TicketStyles'
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';

export default function TicketListing() {
    const classes = useStyles();
    return (
        <div>
            <MBox className="pageHeader">
				<MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Tickets</MTypography>
				<RouterBreadcrumbs />
            </MBox>
            <MBox className="contentBox" component={MPaper}>
                    <Grid container className={classes.gridContainer}  justify="center" spacing={2 }>
                        <Grid item lg={2}>
                        <MTypography className={classes.leftAlign}  gutterBottom component="h6" variant="h6">Id</MTypography>
                        </Grid>
                        <Grid item lg={4}>
                        <MTypography  gutterBottom component="h6" variant="h6">Title</MTypography>
                        </Grid>
                        <Grid item lg={3}>
                        <MTypography  gutterBottom component="h6" variant="h6">Date</MTypography>
                        </Grid>
                        <Grid item lg={3}>
                        <MTypography className={classes.rightAlign}   gutterBottom component="h6" variant="h6">Status</MTypography>
                        </Grid>
                </Grid>

             
                <ButtonBase className={classes.buttonBase}>
                    <Grid container  alignItems="center"   spacing={2}>
                        <Grid item lg={2}>
                        <MTypography  gutterBottom component="h6" align="left" variant="h6">#1</MTypography>
                        </Grid>
                        <Grid item lg={4}>
                        <MTypography   gutterBottom component="h6" variant="h6">Can't Login</MTypography>
                        </Grid>
                        <Grid item lg={3}>
                        <MTypography  gutterBottom component="h6" variant="h6">June 15 <br/>5:30pm</MTypography>
                        </Grid>
                        <Grid item lg={3}>
                        <MTypography  gutterBottom component="h6"  align="right" variant="h6"><MChip className={`statusChip warning`} size="small" label="Open" /></MTypography>
                        </Grid>
                    </Grid>
                </ButtonBase>
               
                <ButtonBase className={classes.buttonBase}>
                <Grid container  alignItems="center" spacing={2}>
                        <Grid item lg={2}>
                        <MTypography  gutterBottom component="h6"  align="left" variant="h6">#2</MTypography>
                        </Grid>
                        <Grid item lg={4}>
                        <MTypography  gutterBottom component="h6" variant="h6">Can't Upgrade IBO</MTypography>
                        </Grid>
                        <Grid item lg={3}>
                        <MTypography  gutterBottom component="h6" variant="h6">Aug 3 <br/>5:30pm</MTypography>
                        </Grid>
                        <Grid item lg={3}>
                        <MTypography  gutterBottom component="h6"  align="right" variant="h6"><MChip className={`statusChip success`} size="small" label="Closed" /></MTypography>
                        </Grid>
                    </Grid>
                </ButtonBase>  
                 
                
            </MBox>
        </div>
    )
}
