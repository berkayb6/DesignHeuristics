import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav, NavbarToggler, Collapse, NavItem, Form, FormGroup, Row, Label, Button, Col} from 'reactstrap'
import { Control, LocalForm, Errors} from 'react-redux-form';

{/**To check if the password has at least 8 characters and 1 special character,
the regularExpression is defined as below */}
const regularExpression = (val) => /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(val);
const required = (val) => val && val.length;
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const passwordMatch = (password) => (confirmPassword) => password===confirmPassword;
const isTermsChecked = (val) => val;

class Register extends Component{
    
    /**The state should contain the password, password repeat, email the status of agreement of terms and conditions,
     * also the status of agreement of subscription, and check whether any entry for email, password and password repeat has been obtained.
     */
    constructor(props){
        super (props);
        this.state={
            isNavOpen: false,
            password: '',
            password_repeat: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.handleSendLink=this.handleSendLink.bind(this);
        
    }
    
    toggleNav(){
        
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
    }

    
    /**To validate: 
     * - for email: it should contain an '@' sign.
     * - for password: it should contain at least 8 char and 1 special char
     * - for password_again: it should be same as password
     * - for agreement of terms and conditions: it should be checked.
     */
    
    
    handleSendLink(values){
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }
    render(){
        
        return(
            <>  
                <Navbar dark expand='md'>
                    <div className='container'>
                        <NavbarToggler onClick={this.toggleNav}/>
                        
                        <Collapse isOpen={this.state.isNavOpen} navbar>
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
                <div className='container'>
                    <div className='row row-content' >
                        <h1 style={{marginTop: "150px", marginBottom: "50px"}}><strong>Registration</strong></h1>

                        <LocalForm onSubmit={(values) => this.handleSendLink(values)}>
                            {/**The email Control.text:
                             * changes the value as it is given by the user
                             * checks if it is valid, if not an error message will raise
                             * onChange: changes the state of corresponding variable (email in this case)
                             * 
                             * SAME PROCESSES ARE ALSO DONE FOR OTHER VARIABLES BELOW
                             */}
                            <Row className="form-group" style={{marginBottom:"20px"}}>
                                <Label htmlFor="email"><h2><strong>Email</strong></h2></Label>
                                <Col md={12}>
                                    <Control.text model='.email' id="email" name="email" style={{width:"400px"}} 
                                        className= "form-control"
                                        validators= {{
                                            required, validEmail
                                        }} />
                                    <Errors
                                        className='text-danger'
                                        model=".email"
                                        show="touched"
                                        messages= {{
                                            required: 'Required ',
                                            validEmail: 'Invalid Email Address'
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group" style={{marginBottom:"20px"}}>
                                <Label htmlFor="password"><h2><strong>Password</strong></h2></Label>
                                <Col md={10}>
                                    <Control.password  model=".password" id="password" name="password" style={{width:"400px"}} 
                                        className= "form-control"
                                        onChange= {this.handleInputChange}
                                        validators={{
                                            required, regularExpression
                                        }} />
                                    <Errors
                                        className='text-danger'
                                        model=".password"
                                        show="touched"
                                        messages= {{
                                            required: 'Required ',
                                            regularExpression: 'Your password needs to contain at least 8 letters and one special character.'
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group" style={{marginBottom:"20px"}}>
                                <Label htmlFor="password"><h2><strong>Password Repeat</strong></h2></Label>
                                <Col>
                                    <Control.password model=".user" id="password_repeat" name="password_repeat" style={{width:"400px"}} 
                                        className= "form-control"
                                        validators={{
                                            required, passwordsMatch: passwordMatch(this.state.password)
                                        }}  />
                                    <Errors
                                        className='text-danger'
                                        model=".user"
                                        show="touched"
                                        messages= {{
                                            required: 'Required ',
                                            passwordsMatch: 'Passwords do not match!'
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 6}}>
                                    <div className="form-check">
                                        <Label check></Label>
                                        <Control.checkbox model=".terms" name="agree_terms_conditions"  
                                            className= "form-check-input" 
                                            validators= {{
                                                isTermsChecked
                                            }}/> 
                                        Accept terms & conditions & data protection agreement
                                        <Errors
                                        className='text-danger'
                                        model= ".terms"
                                        messages = {{
                                            isTermsChecked: 'You need to accept'
                                        }}/>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="form-group" style={{marginBottom:"20px"}}>
                                <Col md={{size: 6}}>
                                    <div className="form-check">
                                        <Label check></Label>
                                        <Control.checkbox model=".subscription" name="agree_subscription" 
                                            className= "form-check-input"/> 
                                            Accept to receive emails (optional)
                                    </div>
                                </Col>
                            </Row>
                            <Row className='col-md-4'  >
                                <Button type="submit" value="submit" color="light"> Register</Button>
                            </Row>
                        </LocalForm>
                    </div>
                </div>
            </>
        )
    }
}
export default Register;