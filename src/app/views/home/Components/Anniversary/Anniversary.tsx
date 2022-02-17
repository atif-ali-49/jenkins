import { Container, Row,Col} from 'react-bootstrap';
import './Anniversary.scss';
import {useHistory} from 'react-router-dom';
function Anniversary(props) {
    const history = useHistory();
    return (
        <section className="bgImgAnn">
            <Container>
                <Row>
                    <Col lg={7}>

                       <div className="w-50 mb-0">
                           <h5 className="display-4 mb-0">PeaceCoin</h5>
                           <p className="text-right mb-0">12 January, 2022</p>
                           <h1 className="anniHeading"><b>Anniversary</b></h1>
                       </div>
                      <p className="text-justify">
                          Peacecoin is gleeful at the successful completion of its first advantageous year. It was a year packed with all the constructive activities; such as, One Summit Event, Peace Rallies and other events to enhance Peacecoin Movement. Peacecoin is full of gratitude to its valued members for putting in their trust in it! We wish to have more numberless exciting years in future. Cheers!
                          Peacecoin is delighted to announce:
                          <br/>
                          <strong>HARD LAUNCH 12 JANUARY, 2022</strong>
                          <br/>
                          Peacecoin 1ST Anniversary Promotion Enrollment
                          <br/>
                          At this happy occasion of Peacecoin's Anniversary, Peacecoin is offering its remodeled registration policy; for a limited time!

                          <br/>
                          <strong>REGISTRATION:</strong> <br/>

                           <strong>Was $360, Now $300</strong><br />  Join Peacecoin! Because, The world is craving for PEACE!
                      </p>

                        <p className="mt-4"><button className="btn start-btn pl-5 pr-5" onClick={()=>history.push('/referal')}>GET STARTED</button></p>
                    </Col>

                    <Col lg={5} className="pl-5">
                        <img src="https://media.peacecoin.io/promotion/an.png" className="img-fluid " />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Anniversary;