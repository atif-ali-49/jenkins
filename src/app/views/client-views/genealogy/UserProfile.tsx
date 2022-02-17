import React from 'react';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import { MBox, MGrid } from '../../../../app/components/mui';
import Typography from '@material-ui/core/Typography';
function UserProfile(props:any) {
    return (
        <>
        <MBox className="pageHeader">
            <Typography className="mainHeading" gutterBottom component="h1" variant="h4">Profile</Typography>
            <RouterBreadcrumbs />
       </MBox>
        </>
    );
}

export default UserProfile;