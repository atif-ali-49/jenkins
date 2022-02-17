import React, {useEffect, useState} from 'react';
import { Pie } from 'react-chartjs-2';
import axios  from "axios";
function CurrentRank(props:any) {
    const [chartData, setChartData] = useState({});
    const PieChart  = async ()=>{
        let empSal:any = [];
        let empAge:any = [];
        await  axios.get  ('http://dummy.restapiexample.com/api/v1/employees')
            .then(function (response) {
                // handle success
                if(response.data){
                    for (const dataObj of response.data.data) {
                        empSal.push(parseInt(dataObj.employee_salary));
                        empAge.push(parseInt(dataObj.employee_age));
                    }

                    setChartData(
                        {
                            labels: empAge,
                            datasets: [
                                {
                                    label: 'Current Rank',
                                    data: empSal,
                                    backgroundColor: [
                                        'rgba(239,147,24,1)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        });

                }
                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
   useEffect(()=>{
       PieChart();
   },[])

    return (
        <div style={{width:"700px"}} >
            {/* <Pie data={chartData} type="pie"/> */}
        </div>
    );
}

export default CurrentRank;