import './Roadmap.scss'
import {Row,Col} from 'react-bootstrap'

function Roadmap() {
    return (
        <section className="ps-timeline-sec section bgLight">
        <div className="container">
            <Row>
                <Col lg={12} className="text-center">
                    <h1 className="noncrypto-heading">Peacecoin Roadmap</h1>
                    <h4 className="subheading">Destination Path</h4>
                </Col>
            </Row>
            <ol className="ps-timeline">
                <li className="one">
                    <div className="img-handler-top">
                        <img src={'/img/softlaunch.png'} width="150px" alt=""/>
                    </div>
                    <div className="ps-bot">
                        <p>Peacecoin 1.0 Soft Launch January 12, 2021</p>
                    </div>
                    <span className="ps-sp-top">01</span>
                </li>
                <li className="two">
                    <div className="img-handler-bot">
                         <img src={'/img/global.png'} width="150px" alt=""/>
                    </div>
                    <div className="ps-top">
                        <p>Aug 1, 2021 Global Business Launch. Peacecoin Achieves $1,000,000 Sales.</p>
                    </div>
                    <span className="ps-sp-bot">02</span>
                </li>
                <li className="three">
                    <div className="img-handler-top">
                         <img src={'/img/tradeschool.png'} width="150px" alt=""/>
                    </div>
                    <div className="ps-bot">
                        <p>2022 Peacecoin Aims To Construct First Trade School</p>
                    </div>
                    <span className="ps-sp-top">03</span>
                </li>
                <li className="four">
                    <div className="img-handler-bot">
                         <img src={'/img/membersglobal.png'} width="150px" alt=""/>
                    </div>
                    <div className="ps-top">
                        <p>2024 1,000,000 Peace Members Globally</p>
                    </div>
                    <span className="ps-sp-bot">04</span>
                </li>
            </ol>
        </div>
    </section>
    )
}

export default Roadmap;
