import React from 'react';
import { Doughnut } from 'react-chartjs-2';
function EWalletBalance(props:any) {
    const data = {
        labels: [ 'E-Wallet Balance','PeaceCoin Balance','Credit Balance', 'Commission Balance'],
        datasets: [
            {
                label: '# of Votes',
                data: [props.pc_balance, props.e_balance, 3],
                backgroundColor: [
                    '#2e3192',
                    '#b70606',
                    'orange',
                    "#01aeff"
                ],
                borderColor: [
                    '#01aeff',
                    '#b70606',
                    'orange',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
      <>
          {/* <Doughnut data={data} type="doughnut" /> */}
      </>
    );
}

export default EWalletBalance;