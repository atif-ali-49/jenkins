import React from 'react';
import  './CryptoHeader.scss'
import {NavLink,Link} from 'react-router-dom'
import  {FaBars} from 'react-icons/fa'
function CryptoHeader(props:any) {
    return (
        <div>
            <div className="top-bar">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <p className="text-danger text-center"><i className="fa fa-exclamation-circle"
                                                                      aria-hidden="true"></i> We do not buy or sell
                                Cryptocurrency, You can do this at <a href="https://invexcoin.com"
                                                                      target="_blank">Invex.</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <nav className="navbar navbar-expand-xl navbar-fixed-top" id="main_navbar">
                <NavLink className="navbar-brand" to="/">
                    <img src="https://media.peacecoin.io/logob.png" className="img-fluid"></img>
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon text-white">
                        <FaBars></FaBars>
                    </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/"> <i className="fa fa-home"></i> Home<span
                                className="sr-only">(current)</span></NavLink>
                        </li>


                        <li className="nav-item">
                            <a className="nav-link" target="_blank"
                               href="https://etherscan.io/token/0x09974b72e5514131ca2aa032d77a54d9e364833f"><i
                                className="fab fa-btc"></i> CryptoCurrency</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="https://invexcoin.com" target="_blank"><i
                                className="fas fa-chart-line"></i> Invex</a>
                        </li>

                      
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                               to="#"
                            >
                               
                               Resources
                            </Link>
                        </li>
                     
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown"
                               aria-haspopup="true" aria-expanded="false">
                                Shop
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><NavLink className="dropdown-item" to="/apparel">Apparels</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/product">Products</NavLink></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                               to="/metamask"
                            >
                                <img src="https://media.peacecoin.io/mm-logo.png"></img>
                                MetaMask
                            </Link>
                        </li>

                       



                    </ul>

                </div>
            </nav>
        </div>
    );
}

export default CryptoHeader;