import React from 'react';
import './Contact.scss';
import {FaMapMarker,FaEnvelope,FaPhone} from 'react-icons/fa'
function Contact(props:any) {
    return (
        <section id="contact">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 text-center">
                        <h1 className="heading">CONTACT US</h1>
                        <p className="py-5">Want to get in touch? We'd love to hear from you. Here's how you can reach
                            us...</p>
                    </div>
                    <div className="col-lg-6 contact-cover">
                        <h1 className="text-center text-light">CONTACT US</h1>
                        <img src="https://media.peacecoin.io/logow.png" className="img-fluid mx-auto d-block mt-3"></img>
                            <form className="mt-3">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="name" className="form-control shadow-none"
                                                   id="exampleInputname" aria-describedby=""
                                                   placeholder="Your Name"></input>
                                                <hr className="line"></hr>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 float-right">
                                        <div className="form-group">
                                            <input type="email" className="form-control shadow-none"
                                                   id="exampleInputEmail1" aria-describedby="emailHelp"
                                                   placeholder="Your Email"></input>
                                                <hr className="line"></hr>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input type="name" className="form-control shadow-none" id="subject"
                                                   aria-describedby="" placeholder="Subject"></input>
                                                <hr className="line"></hr>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-4">
                                        <div className="form-group">
                  <textarea className="form-control shadow-none" id="exampleFormControlTextarea1" rows={3}
                            placeholder="Message"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <a href="#">
                                <button className="btn btn-primary mx-auto d-block">send</button>
                            </a>
                    </div>
                    <div className="col-lg-6">
                        <div className="contact-detail d-flex align-items-center">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>


                            <h3 className="">Location:<br></br>131 N El Molino Ave Suite 310,<br /> Pasadena, CA 91101</h3>
                        </div>

                        <div className="contact-detail">
                        <i className="fa fa-envelope-open-o" aria-hidden="true"></i>
                            <h3 className="">Email:<br></br>hi@peacecoin.com</h3>
                        </div>

                        <div className="contact-detail">
                        <i className="fa fa-phone" aria-hidden="true"></i>
                            <h3 className="">Call:<br></br><span className="footnum">(424) 732-2326</span></h3>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Contact;