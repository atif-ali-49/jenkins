import React from 'react'
import { Container, Row,Col} from 'react-bootstrap'
import './SummitVideo.scss'

function SummitVideo() {
    return (
        <section className="mb-2 bgImg">
            <Container>
                <Row className="row align-items-center">
                    <Col lg={7}>
                        <div className='cartoonParent d-flex align-items-center justify-content-center '>
                            <img className='imgCartoon' width="330px" src='img/coach_kenny.png' />
                            <div>
                                <h3 className='code_head text-center'>CODE 10 COMING SOON</h3>
                                <p className='code_text text-justify mt-2'>Almost all of us want to decode the secret
                                 of Big-growth rate formula; but trust us it's not as complex as one might think 
                                 it to be. We all want to be the winners in our relevant fields. Don't forget;
                                 Growth happens with consistency and hard work!</p>
                                 <p className='code_text text-justify mt-2'>Watch this exciting video by <b> COACH KENNY SMITH </b> and 
                                     learn the trait to master the long-term progress plan. </p>
                                     <p className='code_text text-justify mt-2'>It's as easy as that; </p>
                                     <ul id='ul_list' >
                                         <li>  Ultimately, it's you who takes the initiative! </li>
                                         <li>  Choose and Invest in the right people!</li>
                                         <li>  Enlarge your vision of growth by investing as much as you can! </li>
                                     </ul> 
                                     <p className="pl-4"><b>Get ready to experience the pleasure of progress and growth!</b></p>
                            </div>
                        </div>
                    </Col>  

                    <Col lg={5} className="video-column text-center">
                        <video className="" width="80%" controls poster="/img/tumbnail.png">
                            <source src="https://media.peacecoin.io/sizzle_videos/code10.MP4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
export default SummitVideo
