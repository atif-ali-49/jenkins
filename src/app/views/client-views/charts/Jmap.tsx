import React from 'react';
import axios from 'axios';
import {useEffect,useState} from 'react';
import { VectorMap } from "react-jvectormap"
function Jmap(props:any) {
    const mapData = {
        CN: 100000,
        IN: 9900,
        SA: 86,
        EG: 70,
        SE: 0,
        FI: 0,
        FR: 0,
        US: 20
      }

      const baseurl = process.env.REACT_APP_API_END_POINT;
      const[chartdata,getChartData]=useState<any | null>([]);
      const handleClick = (e, countryCode) => {
        console.log(countryCode);
      };


    //   chartdata.map((items:any)=>{
    //     data.push([items.country_name,items.value])
    //    })
    useEffect(()=>{
        axios.get(baseurl+'/get_map_general_user', {
         
          })
          .then(function (response) {
           
            if(response.status === 200){
                getChartData(response.data.user)
            }

            console.log(response,'response of chart')
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });  
        
    },[])
    return (
        <div>
                <VectorMap
        map={"world_mill"}
        backgroundColor="transparent" //change it to ocean blue: #0077be
        zoomOnScroll={false}
        containerStyle={{
          width: "100%",
          height: "520px"
        }}
        onRegionClick={handleClick} //gets the country code
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer"
          },
          selected: {
            fill: "#2938bc" //color for the clicked country
          },
          selectedHover: {}
        }}
        regionsSelectable={true}
        series={{
          regions: [
            {
              values: mapData, //this is your data
              scale: ["#146804", "#ff0000"], //your color game's here
              normalizeFunction: "polynomial"
            }
          ]
        }}
      />
        </div>
    );
}

export default Jmap;