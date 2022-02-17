import React from 'react';
import './Invex.scss'
function Invex(props:any) {
    return (
            <section id="invex">
                <div className="container invex-backi">
                    <div className="row align-items-center">
                            <div className="col-lg-6 text-center">
                                <div className="invex-cover">
                                    <h1 className="primary-text section-title mt-3">INVEX EXCHANGE</h1>
                                    <p>World’s Trusted Global Cryptocurrency Exchange and Fiat to Cryptocurrency and Cryptocurrency to
                                    Cryptocurrency Accredited Platform holding major Financial Licenses. INVEX has two major platforms:
                                        <a href="https://invexcoin.com" target="_blank"> www.invexcoin.com</a> and<a href="https://exchange.invexcoin.com/" target="_blank"> exchange.invexcoin.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                        <div className="col-lg-6">
                            <img src="https://media.peacecoin.io/mob-lap.png" className="img-fluid"></img>
                        </div>
                        <div className="col-lg-6 text-center">
                            <div className="invex-cover">
                                <h1 className="primary-text section-title">WHY US?</h1>
                                <p>Invexcoin was established in November 2017 in Guadalajara, Republic of Mexico. Since 2017, we have been
                                    entrusted by the government of Mexico in good standings to practice business in the most ethical manner by
                                    obeying all of the rules and regulations in banking and Cryptocurrency related Exchanges.

                                    We specialize in Cryptocurrency transactions worldwide and fiat to cryptocurrency transactions within the
                                    Republic of Mexico.

                                    Our International Anti-Money laundering licenses are a first and we have always kept up current to date
                                    our practices as well as good standings for all of our licenses and certifications.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <video controls preload="none" loop muted  className="player" poster="https://media.peacecoin.io/invexposter.jpg">
                                <source src="https://media.peacecoin.io/videos/invex.mp4" type="video/mp4"></source>
                            </video>
                        </div>
                    </div>
                </div>
            </section>
    );
}

export default Invex;