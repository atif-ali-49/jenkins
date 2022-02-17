import React from 'react'
import { MBox, MTypography, MPaper } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import useStyles from './DesourcesStyles'

function Desources() {
    const classes = useStyles(); 
    return (
        <div>
            <MBox className="pageHeader">
				<MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Ledgers</MTypography>
				<RouterBreadcrumbs />
            </MBox>   
            <MBox className="contentBox" component={MPaper}>

            </MBox>
        </div>
    )
}

export default Desources
