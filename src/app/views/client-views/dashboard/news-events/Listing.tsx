import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import { MBox, MTypography, MPaper, MGrid, MButton } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import useStyles from './ListingStyles';
import {NavLink, useLocation} from 'react-router-dom'
import axios from 'axios'
import Moment from 'moment';

function Listing(props:any) {
	const classes = useStyles(); 
	let location =useLocation();
	const [listData, setListData]=React.useState([])
    let category= props.match.params.category
	// console.log(category)
			const baseUrl = process.env.REACT_APP_API_END_POINT;
	 function getNewsImages(){
		// setLoading(true);
     	axios.get(baseUrl +`/calendar_events/${category}/30`)      
		    .then(function (res) {
                setListData(res.data.success.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // setLoading(false);
            })			
	}
	useEffect(()=>{
	getNewsImages()
	},[category])
    return (
        <div>
            <MBox className="pageHeader">
				<MTypography className="mainHeading text-capitilize" gutterBottom component="h1" variant="h4">{category}</MTypography>
				<RouterBreadcrumbs />
            </MBox>   
            <MBox className="contentBox" component={MPaper}>
				<MGrid container>
					<MGrid item lg={12}>
						<MBox textAlign="center">
							{location.pathname.includes('events')?
							<img src="/img/client-dashboard/event-banner.jpg" className="img-fluid"/>:
							<img src="/img/client-dashboard/news_banner.jpg" className="img-fluid"/>													
							}
							</MBox>
					</MGrid>
				</MGrid>	

				<MBox className={classes.ListingBackground}>
					<MGrid container justify="center" spacing={3}>
						{(listData && listData.length>0)? listData.map((item:any)=>{
						return(	
						<MGrid item lg={3}>
							<MBox className={classes.cardListing}>
								<MBox mt={1} mb={3}><Typography component="h2" variant="h5">{item.title}</Typography></MBox>
								<MBox>{item.category}</MBox>
								<MBox><Typography component="p" variant="body2" dangerouslySetInnerHTML={{ __html: item.description}}></Typography></MBox>
							    <MBox mt={5} display="flex" alignItems="center" justifyContent="space-between">
									{category==='news'? 
									<MBox mt={1}>Published Date: {Moment(item.created_at).format('DD-MM-YYYY')}</MBox>:
									<MBox mt={1}>Start Date: {Moment(item.start_date).format('DD-MM-YYYY')}
										<MBox mt={1}>End Date:  {Moment(item.end_date).format('DD-MM-YYYY')}</MBox>
									</MBox>
						             }
									<MButton component={NavLink} exact to={`/client/${item.category}/detail/${item.id}`}  color="primary" variant="outlined" size="small">Learn More</MButton>
							    </MBox>
							</MBox>
						</MGrid>
						)})
						:<p>NO Data</p>}
					</MGrid>
				</MBox>
            </MBox>
        </div>
    )
}

export default Listing
