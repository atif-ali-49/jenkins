import React,{useState,useEffect} from 'react';
import  './CryptoHeader.scss'
import {NavLink,Link} from 'react-router-dom';
import  {FaBars} from 'react-icons/fa';
import {FaHome,FaFilePdf,FaFilePowerpoint} from 'react-icons/fa';
import {BiBitcoin} from 'react-icons/bi';
import AddShoppingCartSharpIcon from "@material-ui/icons/AddShoppingCartSharp";
import {useSelector} from "react-redux";

function CryptoHeader(props:any) {
    const [offset, setOffset] = useState(0);

        useEffect(() => {
            window.onscroll = () => {
                setOffset(window.pageYOffset)
            }
        }, []);
        const token = localStorage.getItem("access_token");
    const cryptoCart = useSelector((store: any) => store.cryptoCart.cart_items);
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


            <nav id="main_navbar" className={"navbar navbar-expand-xl navbar-fixed-top header_set " + (offset > 0 ?  'headerScroll' : '')}>
                <NavLink className="navbar-brand" to="/crypto/home">
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
                            <NavLink className="nav-link" to="/crypto/home"> <i
                                className="fa fa-home mr-1" style={{fontSize:"17px"}}></i> Home<span
                                className="sr-only">(current)</span></NavLink>
                        </li>


                        <li className="nav-item d-none">
                            <a className="nav-link" target="_blank"
                               href="https://etherscan.io/token/0x09974b72e5514131ca2aa032d77a54d9e364833f"> 
                                <BiBitcoin className="text-light" style={{fontSize:'20px'}}/>
                               CryptoCurrency</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="https://invexcoin.com" target="_blank">
                                <i
                                className="fa fa-line-chart mr-1" style={{fontSize:"17px"}}></i> Invex</a>
                        </li>

                        <li className="dropdown nav-item">
                            <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">Resource <b className="caret"></b></a>
                            <ul className="dropdown-menu multi-level pb-20">                                                    
                                <li className="dropdown-submenu">
                                    <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown"><FaFilePdf/> PDF</a>
                                    
                                    <ul className="dropdown-menu">
                                         <li><a href="https://media.peacecoin.io/pc2_documents/peace_pdf.pdf" target="_blank" className="nav-link"><img src="https://media.peacecoin.io/american.png" /> English</a></li>                                     
                                    </ul>
                                </li>

                                <li className="dropdown-submenu">
                                    <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown"><FaFilePowerpoint/> PowerPoint</a>
                                    
                                    <ul className="dropdown-menu">
                                        <li><a href="https://media.peacecoin.io/pc2_documents/peace_powerpoint.ppsx"  className="nav-link"><img src="https://media.peacecoin.io/american.png" /> English</a></li>                                    
                                       
                                    </ul>
                                </li>

                            </ul>
                        </li>                    
                   
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown"
                               aria-haspopup="true" aria-expanded="false">
                                Shop
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><NavLink className="dropdown-item" to="/crypto/apparel">Apparels</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/crypto/product">Products</NavLink></li>
                            </ul>
                        </li> */}
                        
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                               to="/crypto/metamask"
                            >
                                <img src="https://media.peacecoin.io/mm-logo.png" className="mr-1"></img>
                                MetaMask
                            </Link>
                        </li>

                       { 

                      ( token )?
                       <li className="nav-item">
                       <Link className="nav-link" to="/client/dashboard">
                       <button className="btn btn-secondary"><i className="fa fa-lock"></i> Dashboard</button></Link>
                     </li>:
                       <>
                        
                         

                       <li className="nav-item">
                           <Link className="nav-link" to="/crypto/login">
                          <button className="btn btn-secondary"><i className="fa fa-lock"></i> Login</button></Link>
                         </li>

                       
                        <li className="nav-item">
                        <Link className="nav-link" to="/crypto/register">
                      <button className="btn btn-secondary"><i className="fa fa-lock"></i> Get Started</button></Link>
                         </li>
                     </>
                     }

                        {/* {
                            cryptoCart.length !== 0 &&
                            <li><NavLink className="nav-link" exact to="/crypto/cart" activeClassName="active"><AddShoppingCartSharpIcon/><span className="badge bg-dark text-light badge-sm bg-none">{cryptoCart.length}</span></NavLink></li>
                            :
                                <button className="nav-link"     onClick={()=>cartIsEmpty}><AddShoppingCartSharpIcon/>{frontcartObject.length}</button>
                        } */}
                        <li className="nav-item" id="ridmargin">
                            <a className="nav-link">
                                <div id="google_translate_element"></div>
                            </a>
                        </li>
                    </ul>

                </div>
            </nav>
        </div>
    );
}

export default CryptoHeader;