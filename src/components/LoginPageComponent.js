import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav, NavbarToggler, Collapse, NavItem, Form, Row , Input, Label, Button, Col} from 'reactstrap';
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
    }

    toggleNav(){

        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    
    handleLogin(values){
        this.props.users.map((user)=>{
            console.log(user.email)
            if (user.email===values.email)
                if(user.password===values.password)
                    this.setState({
                        loginStatus: true
                    })
                else
                    this.setState({
                        errorMsg: "Password is wrong!"
                })
            else
                this.setState({
                    errorMsg: "You haven't registered yet!"
                })

        })
        // console.log("login email: ", this.props.users[0].email)
        // if (values.email===this.props.users[0].email ){
        //     console.log("True")
        // }
        // else
        //     console.log("False")
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

                        <LocalForm onSubmit={(values) => this.handleLogin(values)}>
                            <Row className='form-group'>
                                <Label htmlFor="email"><h2><strong>Email</strong></h2></Label>
                                <Col style={{marginBottom:"20px"}}>
                                    <Control.text model=".email" id="email" name="email" style={{width:"400px"}}  />
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
                                        validator={{status:this.state.loginStatus}}>
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
                        </LocalForm>
                    </div>
                </div>
            </>
        );

    }
}

export default Login;