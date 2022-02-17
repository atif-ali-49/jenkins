import React,{useState,useEffect} from 'react';
import { Container, Image, Row,Col } from 'react-bootstrap';
import './LinkViewStyles.scss';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
function LinkView(props:any) {
    const history = useHistory();
    const id = props.match.params.id;
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const[attachements,SetAttachements] = useState<any | null>([]);
    useEffect(()=>{
      if(id){
        getAttcachements();
      }else{
          history.push('/');
      }
   
       
    },[id])
    const getAttcachements = async() =>{
       await axios.get(baseurl+'/view_attachment/'+id)
  .then(function (response) {
    // handle success
    console.log(response.data.attachment);
    if(response.status === 200 && response.data.message){
        SetAttachements(response.data.attachment)
    }
   
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
    }

    // console.log(attachements,'attachements')
    return (
         <section id="cards" className="section">
          <Container>
            <Row>

                {


                    attachements.length !== 0 ? attachements.map((attac:any)=>

                    <Col sm={6} className="text-center" key={attac.id}>
                    
                      <a target="_blank" href={attac.image_path ? attac.image_path : "/img/Dummy.png"}>
                      <Image src={attac.image_path ? attac.image_path : "/img/Dummy.png"} fluid />
                      </a>
                    
                   </Col>
                    ):

                    ''
             
                
                }
            </Row>
        </Container>
    </section>
    )
}
export default LinkView
