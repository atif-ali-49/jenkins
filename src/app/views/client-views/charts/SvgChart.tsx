import React,{useState,useEffect} from 'react';
import { WorldMap } from "react-svg-worldmap";
import { useSelector,useDispatch} from 'react-redux';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { 
  MGrid,
  MBox,
} from 'src/app/components/mui';
function SvgChart(props:any) {
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const[chartdata,getChartData]=useState<any | null>([]);
    const data :any= []
        chartdata.length !==0 && chartdata.map((items:any)=>{
        data.push({country:items.code.toLowerCase(),value:items.value})
       })
    useEffect(()=>{
        let token = localStorage.getItem('access_token');
        axios.get(baseurl+'/get_map_general_user',
        {
          headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
          }
        })
          .then(function (response) {
           
            if(response.status === 200){
                getChartData(response.data.user)
            }
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });  
        
    },[])
    return (
        
    
        
      
            <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
            <Box p={1}>
            <WorldMap color="green"  value-suffix="people" size="xl" data={data} /> 
            </Box>
            
          </Box>
        
    );
}

export default SvgChart;