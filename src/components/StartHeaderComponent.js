import React, { Component } from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
Button, Modal, ModalHeader, ModalBody, Form, Input, FormGroup, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import Start from './StartComponent';

class StartHeader extends Component{
    constructor(props){
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.handleLogin=this.handleLogin.bind(this);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };

    }
    toggleNav(){

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
                                    <h1><strong>Select Your Way</strong></h1>
                                </NavItem>
                            </Nav>
                            <Nav className='ms-auto' navbar>
                                <NavItem  >
                                    <Link outline className='btn ' style={{border:"0px"}} to='/login'  >
                                       <h5>Login</h5>
                                    </Link>
                                </NavItem>
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