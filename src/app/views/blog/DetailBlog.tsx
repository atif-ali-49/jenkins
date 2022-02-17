import React from 'react'
import './Blog.scss'
import { Container, Row,Col, Card, Image } from 'react-bootstrap'
import {useState, useEffect} from 'react'
import axios from 'axios';
import { NoData } from 'src/app/components';

function DetailBlog(props:any) {
	    const[blogs,getBlogs] = useState<any | null>({});
    const baseurl = process.env.REACT_APP_API_END_POINT;
    useEffect(()=>{
		  let id =  props.match.params.id
		  let title= props.match.params.title
        // For Getting Blogs from Backend
        axios.get(baseurl+'/blogs/'+id)
            .then(function (response) {
                // handle succes
                if (response.status === 200){
                    getBlogs(response.data)
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    },[])
	return (
		<section id="blogdetail">
			<div className="background">
				<Container>
					<Row>
						<Col lg={12}>
							<div className="float-right my-5">
							<h2 className="text-light text-uppercase font-weight-lighter">Blog Detail</h2>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
				<Container>
					<Row className="pb-3 align-items-center justify-content-center">						
							<Col lg={8}  className="text-center">
								<Image src={blogs.blog_iamges && blogs.blog_iamges.length > 0 && blogs.blog_iamges.length > 0 ? blogs.blog_iamges[0].image_path :  '/img/placeholder.png'} className="mx-auto detailpic d-block" fluid />
								{/* <small>{blogs.updated_at.slice(0, 10)}</small> */}
								<p className="paragraph my-30"  dangerouslySetInnerHTML={{ __html: blogs.paragraph}}>                                   
								</p>								
							</Col>
					</Row>
				</Container>
		</section>
	)
}
export default DetailBlog
 