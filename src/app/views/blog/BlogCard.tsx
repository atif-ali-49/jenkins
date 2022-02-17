import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

function BlogCard(props: any) {
    const history = useHistory();
    const blogDetail = (blogId: any, title:any) => {
        history.push('/blog/' + blogId + '/' + title.replace(/ /g,"-").toLowerCase() );
    }
    return (
        (props.data.length !== 0) && props.data.map((card: any) => {
            return (
                <Row className="blogcard align-items-center mb-2" key={card.key}>
                    <Col lg={6} className="mt-20">
                        <div className="hover-img">
                            <Image src={card.blog_iamges && card.blog_iamges.length > 0 ? card.blog_iamges[0].image_path : 'img/blogpicone.jpg'} fluid className="mx-auto d-block" />
                        </div>
                    </Col>
                    <Col lg={6} className="mt-20">
                        <div className="word-wrap text-break">
                            <h3 className="secondaryHeading">{card.title}</h3>
                            <p className="paragraph" dangerouslySetInnerHTML={{ __html: card.paragraph.substring(0, 300) }}></p>
                        </div>
                        <button onClick={() => blogDetail(card.id, card.title)} className="btn primaryButton f-16">Read more</button>
                    </Col>
                </Row>
            )
        })
    )
}
export default BlogCard
