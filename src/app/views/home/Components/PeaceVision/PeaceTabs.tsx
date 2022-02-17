import React from 'react'
import { Row,Col, Image } from 'react-bootstrap'

function PeaceTabs(props:any) {
    return (
       <Row className="align-items-center">
           <Col lg={6}>
               <h3 className="secondaryHeading">{props.head}</h3>
               <p className="paragraph mt-20">{props.paragraph}</p>
           </Col>
           <Col lg={6}>
           <Image src={props.image} fluid className="mx-auto d-block" />
           </Col>
       </Row>
    )
}

export default PeaceTabs
