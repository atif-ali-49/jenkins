import React, { useEffect, useState } from 'react';
import { Row, Container, Col, Image } from 'react-bootstrap';
import './Blog.scss';
import BlogCard from './BlogCard';
import BlogCardSmall from './BlogCardSmall';
import axios from 'axios';

function Blog() {
    const [blogs, setBlogs] = useState<any | null>([]);
    const [loading, setLoading] = useState(false);
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const currentdate = new Date()


    function getBlogData() {
        setLoading(true);
        axios.get(baseurl + '/blogs')
            .then(function (res) {
                setBlogs(res.data.blogs);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                setLoading(true);
            })
    }
    useEffect(() => {
        getBlogData();
    }, []);

    return (
        <section className="section bgLigh blog">
            {loading === true &&

                <Container>
                    <Row>
                        <Col lg={9}>
                            <Row className="">
                                {
                                    (blogs.length !== 0) && blogs.slice(0, 1).map((blog: any) =>
                                        <Col lg={7} key={blog.id}>
                                            <div className="pictures-cover mb-2">

                                                <Image className="blog-img" src={blog.blog_iamges && blog.blog_iamges.length > 0 && blog.blog_iamges.length > 0 ? blog.blog_iamges[0].image_path : 'img/blogpicone.jpg'} fluid />
                                                <div className="picture-detail">
                                                    <div className="text-wrap word-wrap">
                                                        <p className="paragraph">{blog.title}</p>
                                                        <span className="">Trending</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </Col>
                                    )
                                }
                                <Col lg={5}>
                                    {
                                        (blogs.length !== 0 && blogs.length > 2) && blogs.slice(1, 3).map((blog: any) =>
                                            <div className="card mb-2" key={blog.id}>
                                                <div className="card-head">
                                                    <Image className="blog-img" alt="blog-picture" src={blog.blog_iamges && blog.blog_iamges.length > 0 && blog.blog_iamges.length > 0 ? blog.blog_iamges[0].image_path : 'img/blogpicone.jpg'} fluid />

                                                </div>
                                                <div className="card-body p-0">
                                                    <div className="pictures-cover" key={blogs.id}>
                                                        <div className="picture-detail">
                                                            <div className="text-wrap word-wrap">
                                                                <p className="paragraph word-wrap">{blog.title}</p>
                                                                <span className="">Trending</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    }
                                </Col>
                            </Row>
                            <Row className="bgDark align-items-center py-2 mt-50 blogbar mx-1">
                                <Col xs={6}>
                                    <p className="paragraph d-md-inline">Recent Posts</p>
                                </Col>
                                <Col xs={6}></Col>
                            </Row>
                            <BlogCard data={blogs} />
                        </Col>

                        <Col lg={3} className="rightblog py-30 ">
                            <Row className="btn-followers ">
                                <Col lg={12} sm={12} xs={12} className="mt-1 ">
                                    <Image alt="blog-image" className="blog-img" src='https://s3.us-east-2.amazonaws.com/b.peacecoin.io/frontend/images/blog_trend.png' fluid />
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={12}>
                                    <h3 className="latestnews bgDark mt-30 ">Latest News</h3>
                                    <h5 className="mt-30 ">Trending News</h5>
                                    <hr></hr>
                                </Col>
                            </Row>
                            <BlogCardSmall data={blogs} />
                        </Col>
                    </Row>
                </Container>
            }
        </section>
    )
}

export default Blog
