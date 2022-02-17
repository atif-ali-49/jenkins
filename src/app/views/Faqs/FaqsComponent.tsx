import React, {useState, useEffect} from 'react'
import { Container, Row,Col, Card, Image } from 'react-bootstrap'
import {NavLink} from 'react-router-dom';
import Accordian from './Accordian';
import axios from 'axios';

function FaqsComponent() {
	const[category_id, setCategory_id]=useState(1)
	const[loading,setLoading] = useState(true);
	const[faqCategoryData, setFaqCategoryData]=useState([])
	const[faqQuestionsData, setFaqQuestionsData]=useState()
	const baseurl = process.env.REACT_APP_API_END_POINT;	
	function takeCategory(id){
		return setCategory_id(id);
	}   
    function getFaqCategories() {
        setLoading(true);
        axios.get(baseurl +'/get_faq_categories')
            .then(function (res) {
                setFaqCategoryData(res.data.categories);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
              setLoading(false);
            })
    }
	function getFaqQuestions() {
        setLoading(true);
		axios.get(`${baseurl}/get_faq_questions/${category_id}`)
            .then(function (res) {
                setFaqQuestionsData(res.data.questions);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                 setLoading(false);
            })
    }
	 useEffect(() => {
		getFaqCategories();	
	 },[])	

    useEffect(() => {	
    getFaqQuestions();		
    }, [category_id]); 

	//  useEffect(()=>{
    //     takeCategory(category);
    // },[category])

  
	return (
			<Row className="my-5">
				<Col lg={3}>
					<div className="list-cover p-3">
						{/* <h4 className="mb-4 text-cente">Topic</h4> */}
						<ul className="p-0 list-unstyled m-0">
							{						
							faqCategoryData.length !==0 && faqCategoryData.map((item:any)=>{
							return(									
								<li><button type="button" onClick={()=>takeCategory(item.id)} className={`btn btn-outline-dark ${item.id===category_id ? 'active' : '' }`}>{item.name}</button></li>													
							)})}                       
						</ul>   
					</div>
				</Col>    
				<Col lg={9}>
					<div id="main">						
						<div className="accordion" id="faq">
								{ loading ?
								   <div className="spinner-border text-warning mx-auto d-block" role="status">
                        			 <span className="sr-only">Loading...</span>
                     				</div>
                        		 :		
								<Accordian data={faqQuestionsData} category={category_id} />	}																			
						</div>						
					</div>                 
				</Col>
			</Row>
	)
}

export default FaqsComponent
