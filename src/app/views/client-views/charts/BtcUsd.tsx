import { useEffect, useState } from "react";
import { AdvancedChart } from "react-tradingview-embed";
import { MBox, MTypography, MCircularProgress, MPaper } from "src/app/components/mui";
import { RouterBreadcrumbs } from "src/app/mui";

function BtcUsd(props:any) {    
    const[loading, setLoading] = useState(true);
    
    useEffect(()=>{
        
        const timer = setInterval(() => {
            setLoading(false);
        }, 7000);

        return ()=> {
            clearInterval(timer);
        }

    },[]);

    return (
        <>
            {/* <MBox className="pageHeader">
                <MTypography className="mainHeading" gutterBottom component="h1" variant="h4">BTC to USD chart</MTypography>
                <RouterBreadcrumbs />
            </MBox> */}
            {/* <MBox className="contentBox" component={MPaper} minHeight={400}> */}
                {loading ?
                    <MCircularProgress />
                    :
                    <AdvancedChart widgetProps={{"theme": "light", "symbol": "BTCUSD"}} />
                }
            {/* </MBox> */}
       </>
    );
}

export default BtcUsd;