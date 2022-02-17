import {useEffect, useState} from 'react'
import { Row,Container,Image, Col } from 'react-bootstrap'
import './Team.scss';
import axios from 'axios';
import { NoData } from 'src/app/components'

function Team(props:any) {
    const baseUrl = process.env.REACT_APP_API_END_POINT;
    const [team, setTeam] = useState([]);

    function getTeamData(){
        axios.get(baseUrl + '/team_main')
        .then(function (res) {
            setTeam(res.data.user);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(()=>{
        getTeamData();
    },[]);
    return (
        <section id="team" className="section">
        <Container>
            <Row>
                <Col xs={12} className="text-center">
                    <h1 className="noncrypto-heading">OUR TEAM</h1>
                    <p className="mt-20 paragraph">Our Executive Team has a combined experience work of over 100 years in community
                        work, business, social networking, and jewelry manufacturing.</p>
                </Col>
                {
                    team.length !==0 ? team.map((item:any)=>(
                        
                        <Col lg={3} md={6} className="text-center" key={item.id}>
                            <div className="box">
                                <Image src={item.path !== '' && item.path !== null ? item.path : 'https://media.peacecoin.io/tony.png' }/>
                                <div className="box-content">
                                    <h3 className="title">{item.name}</h3>
                                    <span className="post">{item.designation}</span>
                                </div>
                                <ul className="icon">
                                    <li><a href={item.facebook}><i className="fa fa-facebook"></i></a></li>
                                    <li><a href={item.twitter}><i className="fa fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </Col>

                    ))
                    :
                    <div className="text-center w-100"> <NoData /></div>
                }
              
            </Row>
        </Container>
    </section>
      
    );
}

export default Team;