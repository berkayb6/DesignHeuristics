import React, { Component } from 'react';
import { Link, withRouter  } from 'react-router-dom';
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
    
    /** Passwords will temporarily saved into state to compare with eachother and to check,
     *  whether they both are exactly same.
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
    
    handleSendLink(values){

        /** After completing registration, the user will be directed to another page called "register completed".
         *  Before that, the input data such as user's email, password and check status of subscription should be sent
         *  to the server. 
         *  If the user doesn't check the subscription, it will be sent as false, and true otherwise.
         */
        if (values.subscription===undefined){
            this.props.register(values.email, values.password, false);
        }
        else
            this.props.register(values.email, values.password, values.subscription);
        
        this.props.history.push('/register-completed');
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
                                        <Control.checkbox model=".subscription" checked={false} name="agree_subscription" 
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
export default withRouter(Register);