import React from 'react'
import {Image} from 'react-bootstrap'
import './GetInTouch.scss'

function GetTouchCard(props:any) {
    return (
        <div className="touchcard text-center pf-30 mt-50">
           <div>{props.image}</div> 
            <h3 className="secondaryHeading mt-30">{props.text}</h3>
        </div>
    )
}

export default GetTouchCard
