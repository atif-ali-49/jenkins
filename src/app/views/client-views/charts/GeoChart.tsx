import Chart from "react-google-charts";
import axios from 'axios';
import {useEffect,useState} from 'react';
function GeoChart(props:any) {
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const[chartdata,getChartData]=useState<any | null>([]);
    const data = [
        ["Country", "Popularity"],
       ];
      chartdata.map((items:any)=>{
        data.push([items.country_name,items.value])
       })
    useEffect(()=>{
        axios.get(baseurl+'/get_map_general_user', {
         
          })
          .then(function (response) {
           
            if(response.status === 200){
                getChartData(response.data.user)
            }

            // console.log(response,'response of chart')
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });  
        
    },[])
    return (
        <Chart
            chartType="GeoChart"
            width="100%"
            height="600px"
            data={data}
            options={{

                colorAxis: { colors: ['#7f726b', 'skyblue', '#112ba7','lightgreen'] },
                backgroundColor: 'white',
                datalessRegionColor: 'light',
                defaultColor: '#f5f5f5',

            }}
        />
    );
}

export default GeoChart;