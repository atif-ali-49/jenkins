import React, { useEffect, useState } from 'react';

import {
    MBox,
    MTypography,
    MGrid,
    MPaper,
    MCircularProgress
} from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import useStyles from './ExecutiveTeamStyle';
import TeamCard from './TeamCard';
import { NoData } from 'src/app/components';
import axios from 'axios';


function ExecutiveTeam(props: any) {
    const classes = useStyles();
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const [team, getTeam] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        // Make a request for a user with a given ID
        setLoading(true);
        axios.get(baseurl + '/team')
            .then(function (response) {
                if (response.status === 200) {
                    getTeam(response.data.user)
                    setLoading(false);
                }
            })
            .catch(function (error) {
                // handle error
                setLoading(false);
                console.log(error);
            })
            .then(() => {
                setLoading(false)
            });
    }, []);


    return (
        <>

            <MBox>
                <MBox className="pageHeader">
                    <MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Executive Team</MTypography>
                    <RouterBreadcrumbs />
                </MBox>
                <MBox className="contentBox" component={MPaper} >
                    <MGrid container spacing={3}>
                        {loading ?
                            <MBox
                                display="flex"
                                alignItems="center"
                                textAlign="center"
                                height="auto"
                                justifyContent="center"
                                className={classes.circular}>
                                <MCircularProgress />
                            </MBox> : <>
                                {
                                    team.length ?
                                        team.map((item: any) =>
                                        
                                            <TeamCard name={item.name} image={item.path !== '' && item.path !== null ? item.path : '/img/peacecoin-sparrow.svg'} description={item.desc} designation={item.designation} key={item.id} />
                                        )
                                        :
                                        <MBox mb={1} borderRadius={'4px'} mx={'auto'}>
                                            <NoData />
                                        </MBox>
                                }
                            </>
                        }


                    </MGrid>
                </MBox>
            </MBox>
        </>
    );
}
export default ExecutiveTeam;