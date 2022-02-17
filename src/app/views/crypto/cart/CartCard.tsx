import React,{useEffect,useState} from 'react'
import {Col, Row, Image, Badge} from 'react-bootstrap'
import './Cart.scss'
import ClearIcon from '@material-ui/icons/Clear';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
function CartCard(props:any) {
	const history = useHistory();
	props.setShippingCharges(props.shipping_charges);
	return (
		
		<div className="card-cover my-3">	
          <Row className="align-items-center">
			<Col lg={2} sm={4}>
				{
					props.img !==  'imageNot' ?
					props.img.map((image)=>
						<Image width="100px" height="100px" src={image.image_path}></Image>
					):	<Image width="100px" height="100px" src={props.category ==='apparels'? '/img/placeholder.png': '/img/peace-coin-150-min.gif'}></Image>

				}
			</Col>

			  {
				  <Col lg={7} sm={8}>
					  <h5 className="mt-3 headingcart font-weight-lighter m-0">{props.apparels.title}</h5>
					  {/*<small className="text-muted">{props.apparels.category}</small>*/}
					  <div className="text-danger f-16 mt-2"><DeleteOutlineIcon onClick={()=> props.deleteItem(props.apparels)} /></div>
				  </Col>
			  }
			  {
                  <Col lg={3}>
					  <div className="float-right">
						  <div className="text-center mb-2">${props.apparels.price}</div>
							<div className="d-inline d-flex align-items-center">
								<div className="pf-10">
									<button type="button" className="btn btn-sm" onClick={()=>props.itemQtyDecrement(props.apparels)}> <RemoveIcon/></button>
								</div>
								<Badge className="secondary f-12"><b>{props.apparels.qty}</b></Badge>
								<div className="pf-10 text-white">
									<button type="button" className="btn btn-sm" onClick={()=>props.itemQtyIncrement(props.apparels)}><AddIcon/></button>
								</div>
							</div>
							
					  </div>
					  				     
				  </Col>

               }


		  </Row>
		  	{/* <div className="crossbtn" onClick={()=> props.deleteItem(props.apparels)}><span className="mr-2" >${props.apparels.price}</span><ClearIcon/></div> */}
		  </div>
	
	)
}

export default CartCard
