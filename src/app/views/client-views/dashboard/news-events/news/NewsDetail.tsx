import React, {	useEffect, useState} from 'react'
import { MBox, MTypography, MPaper, MGrid } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import axios from 'axios';

function NewsDetail(props:any) {
        const [newsEvents, setNewsEvents]= useState([])
        let detailid=props.match.params.id
        let category=props.match.params.category
        const baseUrl = process.env.REACT_APP_API_END_POINT;
        console.log(detailid, 'id')
    	function getNewsEvents(){
            axios.get(`${baseUrl}/calendar_events/${category}/30`)
                .then(function (res) {
                    setNewsEvents(res.data.success.data);
                })
                .catch(function (error) {
                    console.log(error);
                })            
	    }
		useEffect(()=>{
		getNewsEvents()
		},[])
    return (
        <div>
            <MBox className="pageHeader">
				<MTypography className="mainHeading text-capitilize" gutterBottom component="h1" variant="h4">{ category==='news'? category :category.substring(0, category.length - 1)} Detail</MTypography>
				<RouterBreadcrumbs />
            </MBox>   
            <MBox className="contentBox" component={MPaper}>
                <MBox>
                      {newsEvents.map((item:any)=>{
                           if(item.id == detailid)                        
                        return(     
                    <MGrid container justify="center">
                       
                                             
                         <>    
                        <MGrid item lg={12}>
                           <MBox mt={3} textAlign="center"><img className="img-fluid" src={item.banner}></img></MBox>
                           
                       </MGrid>  
                        <MGrid item lg={8}>
                             <MBox mt={3} textAlign="center"><MTypography component="h1" variant="h3">{item.title}</MTypography></MBox>                           
                            <MBox textAlign="justify" mt={3}><MTypography component="p" variant="body1" dangerouslySetInnerHTML={{ __html: item.description}}></MTypography></MBox>
                        </MGrid>
                        </>
                    </MGrid>
                     )})}
                </MBox>
            </MBox>
        </div>
    )
}

export default NewsDetail
