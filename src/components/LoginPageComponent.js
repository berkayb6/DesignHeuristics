import React, { Component } from 'react';
import { Route, Link, withRouter, Redirect } from 'react-router-dom';
import {Navbar, Nav, NavbarToggler, Collapse, NavItem, Form, Row , Input, Label, Button, FormGroup, Col} from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';


class Login extends Component{


    constructor(props){
        super (props);
        this.state = {
            isNavOpen: false,
            loginStatus: false,
            errorMsg: ''
        };
        this.handleLogin=this.handleLogin.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.checkLogin = this.checkLogin.bind(this);

    }

    toggleNav(){

        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    
    handleLogin(values){
        this.props.loginUser({username: this.username.value, password: this.password.value});
        values.preventDefault();

        this.checkLogin();
        
        
    }
    
    checkLogin = async() => {
    
        await (this.props.auth.isAuthenticated)


        if (!this.props.auth.isAuthenticated){
            console.log("a")
            alert('Your username or password does not match!');
        }
        
        if (this.props.auth.isAuthenticated)  {
            console.log("b")
            this.props.history.push("/your-profile")
        }
        
    }

    handleLogout() {
        this.props.logoutUser();
    }
   
    render() {

        

        return (
            <>
                <Navbar dark expand='md'>
                    <div className='container'>
                        <NavbarToggler onClick={this.toggleNav}/>
                        
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            
                            <Nav className="ms-auto" navbar>
                            
                                { !this.props.auth.isAuthenticated ?
                                    
                                    <Nav className='ms-auto' navbar>
                                        
                                        {this.props.auth.isFetching ?
                                            <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                            : null
                                        }
                                        
                                        <NavItem  >
                                            <Link outline className='btn ' style={{border:"0px"}} to='/register'  >
                                            <h5>Register</h5>
                                            </Link>
                                        </NavItem>
                                    </Nav>
                                    
                                    :
                                    <div className='row'>
                                        <div className='col-12 col-md-4'>
                                            <div className="navbar-text mr-3" style={{color: "black"}}>{this.props.auth.user.username}</div>

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
                <div className='container'>
                    <div className='row row-content' >
                        <h1 style={{marginTop: "150px", marginBottom: "50px"}}><strong>Login</strong></h1>

                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" style={{width:"400px"}}
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" style={{width:"400px"}}
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup link>
                                    <Link style={{color:"grey"}} to="/forgot-your-password">
                                        <Label htmlFor='link'>
                                            Forgot your password?
                                        </Label>
                                    </Link>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>

                        {/* <LocalForm onSubmit={(values) => this.handleLogin(values)}>
                            <Row className='form-group'>
                                <Label htmlFor="username"><h2><strong>username</strong></h2></Label>
                                <Col style={{marginBottom:"20px"}}>
                                    <Control.text model=".username" id="username" name="username" style={{width:"400px"}}  />
                                </Col>
                            </Row >
                            <Row className='form-group' >
                                <Label htmlFor="password"><h2><strong>Password</strong></h2></Label>
                                <Col style={{marginBottom:"20px"}}>
                                    <Control.password model=".password" id="password" name="password" style={{width:"400px"}}/>
                                </Col>
                            </Row >
                            <Row className='form-group' >
                                <Col >
                                    <Button model=".login" type="submit" value="submit" color="light"
                                        // validator={{status:this.state.loginStatus}}
                                        >
                                     Login
                                    </Button>
                                    <Errors
                                     className='text-danger'
                                     model=".login"
                                     messages={{
                                         status: this.state.errorMsg
                                     }}/>
                                    <Link style={{marginLeft:'20px',color:"grey"}} to="/forgot-your-password">
                                        <Label htmlFor='link'>
                                            Forgot your password?
                                        </Label>
                                    </Link>
                                </Col>
                            </Row >
                        </LocalForm> */}
                    </div>
                </div>
            </>
        );

    }
}

export default withRouter(Login);