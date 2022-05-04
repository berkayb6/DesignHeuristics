import React, { Component } from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
Button, Modal, ModalHeader, ModalBody, Form, Input, FormGroup, Label} from 'reactstrap';
import {NavLink} from 'react-router-dom';

class Header extends Component{
    
    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal=this.toggleModal.bind(this);

        this.state = {
          isNavOpen: false,
          isModalOpen: false
        };

    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
            
        });
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render(){
        return(
            <div style={{backgroundColor:"#C9E2FF"}}>
                <Navbar dark expand="md" > {/* expand makes that full screen for md */}
                    <div className="container" >
                        <NavbarToggler onClick={this.toggleNav} /> {/* Only appears on extrasmall to small screensizes
                        onClick calls the function "toggleNav" which needs to be defined */}
              
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar >
                            <NavItem >
                                <NavLink className="nav-link" to="/selectyourway" style={{color:"black"}}>
                                    <span className='fa-lg' ><strong>Home</strong></span> 
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/design-heuristic-collection" style={{color:"black"}}>
                                    <span className='fa-lg'><strong>DfX-Collection</strong></span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/menu" style={{color:"black"}}>
                                    <span className='fa-lg'><strong>Assistant</strong></span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/contactus" style={{color:"black"}}>
                                    <span className='fa-lg'><strong>Your library</strong></span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/contactus" style={{color:"black"}}>
                                    <span className='fa-lg'><strong>Search</strong></span>
                                </NavLink>
                            </NavItem>
                            </Nav>
                            <Nav className='ms-auto' navbar>
                                <NavItem>
                                    <NavLink className="nav-link" style={{color:"black"}} to='/register'  >
                                       <span className='fa-lg'>Register</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/login" style={{color:"black"}}>
                                        <span className='fa-lg'>Login</span> 
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        )
    }
}
export default Header;