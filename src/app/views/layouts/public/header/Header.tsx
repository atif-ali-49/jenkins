import {useState,useEffect, useLayoutEffect} from 'react';
import { Navbar,
    Nav,
    NavDropdown,
    Image
} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom'
import AddShoppingCartSharpIcon from '@material-ui/icons/AddShoppingCartSharp';
import {AiOutlineStar} from 'react-icons/ai';
import "./HeaderStyles.scss";
import { useSelector } from "react-redux";
function Header(props:any) {
    const [ scrolled, setScrolled ] = useState(false)
    const token = localStorage.getItem("access_token");
    let currentUrl =  window.location.pathname

    useLayoutEffect(() => {
        const handleScroll = e => {
            if(window.scrollY > 100){
                setScrolled(true)
            }
            else{
                setScrolled(false)
            }
        }
        window.addEventListener("scroll", handleScroll)

        return () => {
        window.removeEventListener("scroll", handleScroll)
        }
    }, [])
    // const userData = useSelector((store: any) => store.auth.currentUser.paid_status);
    const frontcartObject = useSelector((store: any) => store.frontCart.cart_items);

 const getClose = () =>{
     // @ts-ignore
     let parent = document.getElementById('basic-nav-dropdown').nextSibling;

     // @ts-ignore
     if(parent.className === 'dropdown-menu show'){
         // @ts-ignore
         parent.className = 'dropdown-menu';
         // @ts-ignore
         // console.log(parent.className,'children');
     }else{
         // @ts-ignore
         parent.className = 'dropdown-menu';
     }
     // @ts-ignore
     let checkShow = document.getElementById("basic-navbar-nav").classList.contains("show");
     if(checkShow){
         // @ts-ignore
         document.getElementById("basic-navbar-nav").classList.remove("show");
     }else{
         // @ts-ignore
         document.getElementById("basic-navbar-nav").classList.add("show");
     }

 }
    const navBarHandleOnMobile = () =>{
        // @ts-ignore
        let checkShow = document.getElementById("basic-navbar-nav").classList.contains("show");
         if(checkShow){
             // @ts-ignore
             document.getElementById("basic-navbar-nav").classList.remove("show");
             
           
         }


    }
    // function for getclose navber on mobile view
    // basic-navbar-nav
    return (
        <> 
             <Navbar style={{backgroundColor: (currentUrl==="/" && !scrolled) ? 'transparent':'rgba(239, 147, 24, 1)', marginTop:(currentUrl==="/" && !scrolled) ?'20px': ''}}  id="noncrypto-nav"  expand="lg" fixed="top" >
               <div className="container">
                    <Navbar.Brand>
                        <NavLink exact to="/"><Image src={(!scrolled && currentUrl ==="/") ? "https://media.peacecoin.io/logow.png": "https://media.peacecoin.io/logo.png" }></Image></NavLink>
                    </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                            <NavLink className="nav-link menu-item" exact  to='/' activeClassName="active" onClick={navBarHandleOnMobile}>Home</NavLink>
                            <NavLink className="nav-link" exact to="/blog" activeClassName="active" onClick={navBarHandleOnMobile}>Blog</NavLink>
                            <NavDropdown title="Shop" id="basic-nav-dropdown">
                                <Link className="nav-link" to="/product" onClick={getClose}>Products</Link>
                                <Link className="nav-link" to="/apparel" onClick={getClose}>Apparel</Link>

                            </NavDropdown>
                                {
                                (token) ?
                                    <NavLink  className={"nav-link"} exact to="/client/dashboard" activeClassName="active" onClick={navBarHandleOnMobile} >Dashboard</NavLink>
                                :
                                <>
                                    <NavLink className={"nav-link"} exact to="/exist" activeClassName="active" onClick={navBarHandleOnMobile}>Login </NavLink>
                                    <NavLink className={"nav-link"} exact to="/referal" activeClassName="active" onClick={navBarHandleOnMobile}>Register</NavLink>
                                </>
                                }


                                {
                                    frontcartObject.length !== 0 &&
                                    <NavLink className="nav-link" exact to="/cart" activeClassName="active" onClick={navBarHandleOnMobile}>
                                        <div>
                                           <AddShoppingCartSharpIcon/>
                                            <span className="badge badge-black badge-sm bg-none"> {frontcartObject.length}</span>
                                       </div>
                                        
                                    </NavLink>                                    // :
                                    //     <button className="nav-link"     onClick={()=>cartIsEmpty}><AddShoppingCartSharpIcon/>{frontcartObject.length}</button>
                                }
                        </Nav>
                    </Navbar.Collapse>
                </div> 
            </Navbar>           
        </>
    );
}
export default Header;