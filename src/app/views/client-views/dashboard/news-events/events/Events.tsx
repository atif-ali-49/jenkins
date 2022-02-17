import React from 'react'
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { MBox, MTypography } from 'src/app/components/mui';
import {NavLink, useHistory } from 'react-router-dom'
import useStyles from './EventStyles'

function Events(props:any){
	const history = useHistory();
	const classes = useStyles(); 
	function pushToDetail(id){
	history.push(`/client/events/detail/${id}`)
	}
	return(
     <>
		<MBox maxHeight="500px">
			<Carousel autoPlay={true} showThumbs={false} interval={3000} infiniteLoop>
				{(props.data && props.data.length !==0) ?
				props.data.map((item)=>{	
				return(		
					<div className="img-hover" onClick={()=>{pushToDetail(item.id)}}>
						<img src={item.thumbnail}  />				
					</div>
				) 
				}): <h1>No Data</h1>}
			</Carousel>
		</MBox>
    </>
	)
	}
export default Events
