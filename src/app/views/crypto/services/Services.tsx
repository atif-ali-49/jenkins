import React from 'react';
import "./Services.scss";

function Services(props:any) {
    return (

        <section className="service-details"  style={{marginTop:"100px"}}>
            <div className="container">
                <div className="section-title">
                    <h1 className="text-center">Services</h1>
                    <h5 className="text-center mb-5" style={{color:'#000'}}>Who we are</h5>
                </div>
                <div className="row">
                    <div className="col-md-6 d-flex align-items-stretch" data-aos="fade-up">
                        <div className="card mb-4">
                            <div className="card-img">
                                <img src="https://media.peacecoin.io/cryptocurrency.jpg" alt="..."
                                     className="img-fluid"></img>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title "><a className="text-dark" href="#">CryptoCurrency</a></h5>
                                <p className="card-text text-justify">Peacecoin is a cryptocurrency designed to bring
                                    everyone to a single economy. We are offering Ethereum based ERC-20 crypto coins and
                                    there will be enough for everybody.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch" data-aos="fade-up">
                        <div className="card mb-4">
                            <div className="card-img">
                                <img src="https://media.peacecoin.io/membership.jpg" alt="..." className="img-fluid"></img>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title "><a className="text-dark" href="#">Club membership</a></h5>
                                <p className="card-text text-justify">Peacecoin is not just an idea, it’s a movement.
                                    For people who want to be a part of our movement and support peace and harmony, can
                                    join our club. Join now!</p>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6 d-flex align-items-stretch" data-aos="fade-up">
                        <div className="card mb-4">
                            <div className="card-img">
                                <img src="https://media.peacecoin.io/jewelery.jpg" alt="..." className="img-fluid"></img>
                            </div>

                            <div className="card-body">
                                <h5 className="card-title "><a className="text-dark" href="#">Jewelry</a></h5>
                                <p className="card-text text-justify"> Peacecoin will soon be launching their premium
                                    jewelry store. Peacecoin Jewelry will have it all in one place. You can check out
                                    our fine 1.13oz. solid silver coin to get a glimpse.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch" data-aos="fade-up">
                        <div className="card mb-4">
                            <div className="card-img">
                                <img src="https://media.peacecoin.io/exclusive-membership.jpg" alt="..."
                                     className="img-fluid"></img>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title "><a className="text-dark" href="#">Exclusive membership</a></h5>
                                <p className="card-text text-justify">Our exclusive membership is something the peace
                                    lovers can actually benefit from. Be a part of this private club and enjoy
                                    extravagant perks.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mx-auto" data-aos="fade-up">
                        <div className="card mb-4">
                            <div className="card-img">
                                <img src="https://media.peacecoin.io/crypto-academy.jpg" alt="..."
                                     className="img-fluid"></img>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title "><a className="text-dark" href="#">CryptoAcademy</a></h5>
                                <p className="card-text text-justify">CryptoAcademy is one of our bold initiatives to
                                    enlighten our users about the latest disruptive automation. Crypto Academy will
                                    offer courses that will help our users get a complete insight of cutting edge
                                    technology in Blockchain and CryptoCurrency. Crypto Academy will be an incentivized
                                    curriculum.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;