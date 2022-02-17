import React from 'react';
import './BlockChain.scss'
function BlockChain(props:any) {
    return (
        <section id="blockchain">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 text-center">
                        <h1 className="heading">BlockChain Technology</h1>
                        <h3 className="section-title my-5">Our Advanced Features</h3>
                    </div>
                    <div className="col-lg-6 my-5">
                        <video className="borderr" autoPlay muted loop style={{width:'100%'}}>

                            <source src="https://media.peacecoin.io/videos/decentralization-1.webm"
                                    className="img-fluid"></source>
                                Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="col-lg-6">
                        <h3 className="text-center mt-3">Decentralization</h3>
                        <p className="">
                            Peacecoin is a decentralized system, ensuring complete autonomy over your assets. Backed by
                            blockchain technology, it is a clear and transparent system.
                        </p>
                        <ul>
                            <li><i className="fa fa-check"></i>Decentralized system backed by blockchain technology</li>
                            <li><i className="fa fa-check"></i>Ensures transparency</li>
                        </ul>
                    </div>
                    <div className="col-lg-6 text-center my-5">
                        <img src="https://media.peacecoin.io/NoAuthorityselfGoverned.gif" className="img-fluid"></img>
                    </div>
                    <div className="col-lg-6">
                        <h3 className="text-center mt-3">No authority</h3>
                        <p className="">
                            Peacecoin is a self-governed system and has no central authority regulating it. Nobody can
                            tamper with the
                            data or compromise its integrity.
                        </p>
                        <ul>
                            <li><i className="fa fa-check"></i>Runs on a peer-to-peer self-governed system</li>
                            <li><i className="fa fa-check"></i>Nobody can meddle with the data</li>
                        </ul>
                    </div>

                    <div className="col-lg-6 text-center my-5">
                        <img src="https://media.peacecoin.io/Ethereumour.gif" className="img-fluid"></img>
                    </div>
                    <div className="col-lg-6">
                        <h3 className="text-center mt-3">Ethereum Based</h3>
                        <p className="">
                            Peacecoin will be launched on Ethereum; the largest open source public blockchain enabling
                            deployment of
                            smart contracts and cryptocurrencies.
                        </p>
                        <ul>
                            <li><i className="fa fa-check"></i>Most actively used platform for publishing crypto assets
                            </li>
                            <li><i className="fa fa-check"></i>Adapting to the needs of time</li>
                        </ul>
                    </div>

                    <div className="col-lg-6 text-center my-5">
                        <img src="https://media.peacecoin.io/100-secure.gif" className="img-fluid"></img>
                    </div>
                    <div className="col-lg-6">
                        <h3 className="text-center mt-3">100% Secure</h3>
                        <p className="">
                            Backed by blockchain that enables security by cryptography, Peacecoin is 100% secure. Each
                            transaction is
                            stored on the Blockchain and is signed by private keys.
                        </p>
                        <ul>
                            <li><i className="fa fa-check"></i>Data is technically impossible to tamper with</li>
                            <li><i className="fa fa-check"></i>Atomicity of data over the whole network</li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default BlockChain;