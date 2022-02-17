import React from 'react'
import {Row,Col, Image} from 'react-bootstrap'


function BlogCardSmall(props:any) {
    return (

     (props.data.length!==0) && props.data.map((card:any)=>{         
      return(
      <Row className="align-items-center mt-20" key={card.id}>
           <Col xs={5} className="smallcard">
               <Image src={card.blog_iamges && card.blog_iamges.length > 0 ? card.blog_iamges[0].image_path : 'img/blogpicone.jpg'} className="mx-auto d-block" width="100px" height="80px"/>
           </Col>
           <Col xs={7} className="smallcard">
               <div className="text-wrap word-wrap">
               <p className="paragraph word-wrap text-left">{card.title}</p>
               {/* <small className="">{card.updated_at.slice(0,10)}</small> */}
               </div>
           </Col>
       </Row>
      )
        })
    )
}

export default BlogCardSmall
