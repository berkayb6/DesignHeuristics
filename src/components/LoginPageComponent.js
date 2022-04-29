import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav, NavbarToggler, Collapse, NavItem, Form, FormGroup, Input, Label, Button} from 'reactstrap';

class Login extends Component{
    constructor(props){
        super (props);
        this.state = {
            isNavOpen: false
        };
        this.handleLogin=this.handleLogin.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav(){

        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    
    handleLogin(event){
        alert("Email: " + this.email.value + " Password: " + this.password.value
        + " Remember: " + this.remember.checked);
        event.preventDefault();
    }
    render() {

        return (
            <>
                <Navbar dark expand='md'>
                    <div className='container'>
                        <NavbarToggler onClick={this.toggleNav}/>
                        
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav className='ms-auto' navbar>
                                <NavItem  >
                                    <Link outline className='btn ' style={{border:"0px"}} to='/register'  >
                                    <h5>Register</h5>
                                    </Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <div className='container'>
                    <div className='row row-content' >
                        <h1 style={{marginTop: "150px", marginBottom: "50px"}}><strong>Login</strong></h1>

                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="email"><h2><strong>Email</strong></h2></Label>
                                <Input type="text" id="email" name="email" style={{width:"400px"}} innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password"><h2><strong>Password</strong></h2></Label>
                                <Input type="password" id="password" name="password" style={{width:"400px"}} innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <FormGroup >
                                <Button type="submit" value="submit" color="light"> Login</Button>
                                <Link style={{marginLeft:'20px',color:"grey"}} to="/forgot-your-password">
                                    <Label htmlFor='link'>
                                        Forgot your password?
                                    </Label>
                                </Link>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </>
        );

    }
}

export default Login;