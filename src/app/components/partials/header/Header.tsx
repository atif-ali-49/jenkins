import React from 'react';
import "./HeaderStyles.scss";
import {useState} from 'react';
import { Navbar,
         Nav,
         NavDropdown,
         Image
    } from 'react-bootstrap';
    import {NavLink} from 'react-router-dom'



function Header() {
    const [changeColor, newColor]=useState('transparent')
  

    return (
        <> 
                <Navbar className="containe" style={{backgroundColor: changeColor}}  expand="lg" sticky="top" >
                    <Navbar.Brand>
                    <NavLink to="/"><Image src="https://media.peacecoin.io/logo.png"></Image></NavLink>
                    </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                            <NavLink className="nav-link menu-item" exact  to='/' activeClassName="active">Home</NavLink>
                            <NavLink className="nav-link" exact to="/blog" activeClassName="active">blog</NavLink>                   
                                <NavDropdown title="Shop" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1"activeClassName="active" >Products</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2" activeClassName="active">Shops</NavDropdown.Item>
                            </NavDropdown>
                            <NavLink className="nav-link" exact to="/about" activeClassName="active">Login </NavLink>
                            <NavLink className="nav-link" to="/register" activeClassName="active">Register</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
    
           
        </>
    );
}

export default Header;