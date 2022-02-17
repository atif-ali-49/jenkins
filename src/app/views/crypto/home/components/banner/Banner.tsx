import {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import './Banner.scss'

function Banner(props:any) {
    const rName =sessionStorage.getItem('rName');
  
    return (
        <div>
        <section id="header">

            <video autoPlay muted loop playsInline  style={{width:"100%",height:"auto",position:"absolute"}}>
                <source src="https://media.peacecoin.io/sizzle_videos/peacebannerwebm.webm" type="video/webm"></source>
                <source src="https://media.peacecoin.io/sizzle_videos/peacebanner.mp4" type="video/mp4"></source>
            </video>

            <div className="container">
                <div className="row mb-5 mt-0">
                    <div className="col-12 mx-auto">
                        <div className="text-center ">
                        <h1 className="blink mb-1 text-capitalize" style={{color:"yellow"}}><b>Welcome to {rName}'s Peacecoin</b></h1>
                            <h1 className="blink mb-1" style={{color:"yellow"}}>Notice For International
                                Customers</h1>
                            <p style={{color:"white",fontSize:"20px"}}>Please Update Your User Profile Settings with your Correct Shipping Address. Peacecoin Inc. Requires This In Order to Ship Your Silver Coins.</p>

                        </div>

                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-lg-12 text-center">
                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">

                                    <div className="para-background">
                                        <p>Peacecoin is a complete paradigm shift in cryptocurrency. Peace is not
                                            confined to
                                            slogans and speeches, peace is about equality and fairness. The future is
                                            here and it’s Peacecoin.
                                        </p>
                                    </div>
                                    <NavLink exact to="/crypto/register" className="btn btn-primary">Get Started</NavLink>
                                </div>
                                <div className="carousel-item">
                                    <h1 className="primary-text">Secure and Reliable </h1>
                                    <div className="para-background">
                                        <p>At Peacecoin, financial comfort for our members is our utmost
                                            priority. As a decentralized
                                            System,
                                            Peacecoin ensures complete transparency and clarity. There is enough
                                            Peacecoin for everyone.</p>
                                    </div>
                                    <NavLink exact to="/crypto/register" className="btn btn-primary">Get Started</NavLink>
                                </div>
                                <div className="carousel-item">
                                    <h1 className="primary-text">A Real Precious Metal &amp; Cryptocurrency Coin
                                    </h1>
                                    <div className="para-background">
                                        <p>Peacecoin publishes and produces the limited edition 1oz. solid silver coin
                                            bullions &amp;
                                            jewelry.
                                            Combined with the Digital Asset - the ERC20 backed cryptocurrency on the
                                            World’s 2nd biggest
                                            Blockchain (Ethereum).</p>
                                    </div>
                                    <NavLink exact to="/crypto/register" className="btn btn-primary">Get Started</NavLink>
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleControls" role="button"
                               data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleControls" role="button"
                               data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    <section id="header-mob">

        <video autoPlay muted loop playsInline  style={{width:"100%",height:'auto'}}>
            <source src="https://media.peacecoin.io/sizzle_videos/peacebannerwebm.webm" type="video/webm"></source>
            <source src="https://media.peacecoin.io/sizzle_videos/peacebanner.mp4" type="video/mp4"></source>
        </video>
        <div className="container">
            <div className="row mt-0">
                <div className="col-12 mx-auto">
                    <div className="text-center ">

                        <h5 className="blink mb-1"  style={{color:"yellow"}}>Notice For International
                            Customers</h5>
                        <p style={{color:"white"}}>Please Update The Correct information About Your
                            Shipping Addresses According To Your Exact Local Location to Receive Packages On time and
                            Accurate</p>

                    </div>

                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-lg-12 text-center">
                    <div id="carouselExampleControlss" className="carousel slide" data-ride="carousel">

                        <div className="carousel-inner">
                            <div className="carousel-item active">

                                <h1 className="primary-text">Welcome to <span className="capo">
                                </span> Peacecoin</h1>
                                <div className="para-background">
                                    <p>Peacecoin is a complete paradigm shift in cryptocurrency. Peace is not confined
                                        to
                                        slogans and speeches, peace is about equality and fairness. The future is here
                                        and it’s Peacecoin.
                                    </p>
                                </div>
                                <a href="/register">
                                    <button className="btn btn-primary">Get Started</button>
                                </a>
                            </div>
                            <div className="carousel-item">
                                <h1 className="primary-text">Secure and Reliable </h1>
                                <div className="para-background">
                                    <p>At Peacecoin, financial comfort for our members is our utmost
                                        priority. As a decentralized
                                        System,
                                        Peacecoin ensures complete transparency and clarity. There is enough Peacecoin
                                        for everyone.</p>
                                </div>
                                <a href="/register">
                                    <button className="btn btn-primary">Get Started</button>
                                </a>
                            </div>
                            <div className="carousel-item">
                                <h1 className="primary-text">A Real Precious Metal &amp; Cryptocurrency Coin
                                </h1>
                                <div className="para-background">
                                    <p>Peacecoin publishes and produces the limited edition 1oz. solid silver coin
                                        bullions &amp;
                                        jewelry.
                                        Combined with the Digital Asset - the ERC20 backed cryptocurrency on the World’s
                                        2nd biggest
                                        Blockchain (Ethereum).</p>
                                </div>
                                <NavLink exact to="/crypto/register">
                                    <button className="btn btn-primary">Get Started</button>
                                </NavLink>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControlss" role="button"
                           data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControlss" role="button"
                           data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </div>
);
}

export default Banner;