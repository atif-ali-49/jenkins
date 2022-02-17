import {useState,useEffect} from 'react';
import { WorldMap } from "react-svg-worldmap";
import axios from 'axios';

function DaSvgChart(props:any) {
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
    // useEffect(()=>{
    //   console.log('',data)
    // },[data])
    return (  
      <WorldMap color="green"  value-suffix="people" size="xl" data={data} />
    );
}

export default DaSvgChart;