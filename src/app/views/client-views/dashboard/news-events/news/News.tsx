import React, {	useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { MBox, MTypography } from 'src/app/components/mui';
import {NavLink, useHistory} from 'react-router-dom'
import useStyles from './NewsStyle'


function News(props:any){
	const history = useHistory();
	const classes = useStyles(); 


	function pushToDetail(category,id){
		history.push(`/client/${category}/detail/${id}`)
	}

	return(
     <>
		<MBox className={classes.mainContainer}>
			<Carousel  autoPlay={true} showThumbs={false} interval={3000} infiniteLoop>
				{(props.data && props.data.length>0)? props.data.map((item)=>{	
				return(		
					<div onClick={()=>pushToDetail(item.category, item.id)} className={`img-hover ${classes.ImageContainer}`}><img src={item.thumbnail}></img></div>
				) 
				}): <h3>No Data</h3>}
			</Carousel>
	 </MBox>
    </>
	)
	}
export default News
