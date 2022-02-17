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
			<Col lg={2} md={12}>
				{
					props.img !==  'imageNot' ?
						<Image width="100px" className="mx-auto d-block" height="100px" src={props.img[0]?.image_path}></Image>
					:  <Image width="100px" className="mx-auto d-block" height="100px" src={props.category ==='apparels'? 'img/placeholder.png': 'img/peace-coin-150-min.gif'}></Image>

				}
			</Col>

			  {
				  <Col xs={6} sm={6} md={6} lg={7} className="d-flex">
					  <div className="headingcart font-weight-lighter m-0">{props?.apparels.title}
						  <br />
						  <div className="text-danger f-16 mt-3"><DeleteOutlineIcon onClick={()=> props.deleteItem(props?.apparels)}/></div>
					  </div>

					  {
						  props?.apparels?.selectedSize &&
						  <div className="headingcart font-weight-lighter ml-5"><b>Size</b>
							  <br />
							  <div className="f-16 mt-3">{props?.apparels?.selectedSize}</div>
						  </div>
					  }

					  {
						  props?.apparels?.selectedColor &&
						  <div className="headingcart font-weight-lighter ml-5"><b>Color</b>
							  <br />
							  <div className="f-16 mt-3">{props?.apparels?.selectedColor}</div>
						  </div>
					  }

					  {/*<h5 className="mt-3 headingcart font-weight-lighter m-0">{props?.itemQty}</h5>*/}
					  {/*<small className="text-muted">{props?.apparels?.category}</small>*/}

				  </Col>
			  }
			  {
                  <Col xs={6} sm={6} md={6}  lg={3}>
					  <div className="float-right">
						  {/*<div className="text-center mb-2">${((props?.itemTx *props?.apparels?.price)/100).toFixed(2)}</div>*/}
						  <div className=" mt-4 text-center ">${props?.apparels?.price}</div>
							<div className="d-inline d-flex align-items-center">
								<div className="pf-10">
									<button type="button" className="btn btn-sm" onClick={()=>props.itemQtyDecrement(props?.apparels)}> <RemoveIcon/></button>
								</div>
								<Badge className="secondary f-12"><b>{props?.apparels?.qty}</b></Badge>
								<div className="pf-10 text-white">
									<button type="button" className="btn btn-sm" onClick={()=>props?.itemQtyIncrement(props?.apparels)}><AddIcon/></button>
								</div>
							</div>
							
					  </div>
					  				     
				  </Col>
               }
		  </Row>
		  </div>
	
	)
}

export default CartCard
