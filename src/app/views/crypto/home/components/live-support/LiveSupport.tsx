import React from 'react';
import './LiveSupport.scss'
function LiveSupport(props:any) {
    return (
        <section id="livesupport">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 text-center">
                        <h1 className="heading">Live Support</h1>
                    </div>
                    <div className="col-lg-6">
                        <img src="https://media.peacecoin.io/support.png" className="img-fluid mt-3"></img>
                    </div>
                    <div className="col-lg-6">
                        <div className="support-cover mt-5">
                            <h1>24/7 Customer Support</h1>
                            <p className="py-4">Live Customer Service around the clock & around the globe 24/7
                                Representatives on Standby to
                                assist you with any account and order questions. Simply dial (424) PEACECOIN or (424)
                                732-2326.</p>
                            <button className="btn btn-primary mx-auto d-block">LIVE CHAT</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LiveSupport;