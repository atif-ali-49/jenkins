import React from 'react'
import { Container, Row,Col, Card, Image } from 'react-bootstrap'

function Accordian(props:any) {

	return (    	           
			    props.data && props.data.length?
				props.data.map((item:any, index:number)=>{			
					return(
						<Card>
							<Card.Header id={`faqhead${item.id}`}>
								<a href="#" className="btn btn-header-link" data-toggle="collapse"
									data-target={`#faq${item.id}`} aria-expanded="true" aria-controls={`faq${item.id}`}>
									{item.question}</a>
							</Card.Header>

							<div id={`faq${item.id}`} className={`collapse ${index==0 ? 'show': ''}`} aria-labelledby={`faqhead${item.id}`} data-parent="#faq">
								<Card.Body className="paragraph" dangerouslySetInnerHTML={{ __html:item.answer }}>
									{/* {item.answer} */}
								</Card.Body>
							</div>
						</Card>
					)})
					:
						<div>
							No data found	
						</div>														  
	)
}
export default Accordian
