import React from 'react';
import {NavLink} from 'react-router-dom';

import './Pkg.scss';
function Pkg(props:any) {
    return (
        <section id="smartpkg">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <h1 className="section-title mb-5">Join the Peacecoin Business Opportunity!</h1>
                    </div>
                    <div className="col-lg-4 col-md-6 text-center mt-5">
                        <div className="silver-card">
                            <img src="https://media.peacecoin.io/starterpkgs.png" width="220" height="115"></img>
                                <div className="smart-priceimg">
                                    <img src="https://media.peacecoin.io/gold-line.png" className="img-fluid mt-3"></img>
                                        <p className="text-center text-light">$360</p>
                                </div>
                                <div className="smart-content">
                                    <h4 className="mt-4"><i className="fa fa-check" aria-hidden="true"></i>2 Silver Coins</h4>
                                    <h4><i className="fa fa-check" aria-hidden="true"></i>1k Crypto Coins Gift</h4>
                                    <h4><i className="fa fa-check" aria-hidden="true"></i> CryptoAcademy</h4>
                                    <h4><i className="fa fa-check" aria-hidden="true"></i> Peacecoin Buyers Club</h4>
                                    <NavLink exact to="/crypto/register" className="btn btn-primary">Join Us</NavLink>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Pkg;