import React from 'react'
import { Image } from 'react-bootstrap'
import './Feature.scss';

function FeatureCard(props:any) {
    return (
      <div className="feature-card text-center mt-30">
        {/* <Image src={props.image} fluid></Image>   */}
        <div className="vert-move">{props.icons}</div>
        <h3 className="secondaryHeading f-24 mt-20">{props.head}</h3>
        <p className="paragraph fWeight-300 text-capitalize mt-20">{props.para}</p>
      </div>
    )
}

export default FeatureCard
