import React, { Component } from 'react';
import {Navbar, Nav, NavbarToggler, Collapse, NavItem,
Button, Modal, ModalHeader, ModalBody, Form, Input, FormGroup, Label} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import Start from './StartComponent';

class StartHeader extends Component{
    constructor(props){
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
    }
    
    toggleNav(){
        {/**When the user clicks on the navbar,
     the state of nav should be changed to the opposite of current status */}
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event){
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value
        + " Remember: " + this.remember.checked);
        event.preventDefault();
    }

    handleLogout() {
        this.props.logoutUser();
    }

    render(){
        return(
            <>

            {/**Navbar includes the TU-Logo, titel and also links to Login and Register pages.
             * expand='md' makes the navbar static for medium screen sizes. 
             * Smaller screen sizes have a collapsed navbar
             */}

                <Navbar dark expand='md'>
                    <div className='container'>
                        <NavbarToggler onClick={this.toggleNav}/>
                        
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    {/**Since there are two pages that have similar heading being "Select Your Way" and "Select Your Mode",
                                     * the corresponding ending is sent to this component. Depending on the received selectyour-prop, heading
                                     * will be edited. 
                                     */}
                                    <h1><strong>Select Your {this.props.selectyour}</strong></h1>
                                </NavItem>
                            </Nav>
                            <Nav className='ms-auto' navbar>
                            
                                { !this.props.auth.isAuthenticated ?
                                    
                                    <Nav className='ms-auto' navbar>
                                        
                                        {this.props.auth.isFetching ?
                                            <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                            : null
                                        }
                                        <NavItem  >
                                            <NavLink className="nav-link" style={{color:"black"}} to='/register'  >
                                                <span className='fa-lg'>Register</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem  >
                                            <NavLink className="nav-link" to="/login" style={{color:"black"}}>
                                                <span className='fa-lg'>Login</span> 
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    
                                    :
                                    <div className='row align-items-center'>
                                        <div className='col-12 col-md-4'>
                                            <NavLink className="nav-link fa fa-user-circle fa-3x"  style={{color:"black"}} to='/your-profile'/>
                                            
                                            {/* <div className="navbar-text mr-3" style={{color: "black"}}>{this.props.auth.user.username}</div> */}

                                        </div>
                                        <div className='col-12 col-md-8'>
                                            <Button outline onClick={this.handleLogout}>
                                                <span className="fa fa-sign-out fa-lg"></span> Logout
                                                {this.props.auth.isFetching ?
                                                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                    : null
                                                }
                                            </Button>

                                        </div>
                                    </div>
                                }
                        
                                
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>



                {/** 
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" innerRef={(input) => this.username=input}/>
                            </FormGroup>    
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" innerRef={(input) => this.password=input}/>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                <Input type="checkbox" name="remember"
                                innerRef={(input) => this.remember=input}/>
                                Remember me</Label>
                            </FormGroup>  
                            <Button type="submit" value="submit" color="primary"> Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                */}
            </>
        );
    }
}
export default StartHeader;