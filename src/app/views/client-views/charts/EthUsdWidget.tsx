import React,{useEffect} from 'react';
import { AdvancedChart } from "react-tradingview-embed";
function EthUsdWidget(props:any) {
    useEffect(()=>{
        const script = document.createElement('script');
        script.src ="https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
        script.async = true;
        script.innerHTML = JSON.stringify(
            {
                "symbol":"ETHUSD",
                "width":1000,
                "locale": "en",
                "colorTheme": "light",
                "isTransparent": false
            }
        )
        document.getElementById("myContainer6")!.appendChild(script);
    })
    return (
        <div id="myContainer6">
            <div className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget">
                </div>
            </div>
        </div>
    );
}

export default EthUsdWidget;