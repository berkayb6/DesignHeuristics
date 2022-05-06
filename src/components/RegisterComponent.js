import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav, NavbarToggler, Collapse, NavItem,Form, FormGroup, Input, Label, Button, FormFeedback, Col} from 'reactstrap'

{/**To check if the password has at least 8 characters and 1 special character,
the regularExpression is defined as below */}
var regularExpression = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

class Register extends Component{

    /**The state should contain the password, password repeat, email the status of agreement of terms and conditions,
     * also the status of agreement of subscription, and check whether any entry for email, password and password repeat has been obtained.
     */
    constructor(props){
        super (props);
        this.state = {
            isNavOpen: false,
            password: '',
            password_repeat: '',
            email: '',
            agree_terms_conditions: false,
            agree_subscription: false,
            touched: {
                email: false,
                password: false,
                password_repeat: false
            }
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSendLink=this.handleSendLink.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    toggleNav(){

        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    
    /**To check if the corresponding input field has been touched (fulfilled), If so,
     * then change the state as true
     */
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    /**To validate: 
     * - for email: it should contain an '@' sign.
     * - for password: it should contain at least 8 char and 1 special char
     * - for password_again: it should be same as password
     * - for agreement of terms and conditions: it should be checked.
     */
    validate(password, password_repeat, agree, email) {
        const errors = {
            email: '',
            password: '',
            password_repeat: '',
            agree: ''
        };
        
        if(this.state.touched.email && this.state.email.split('').filter(x => x === '@').length !== 1)
            errors.email = 'Email should contain a @';

        if(this.state.touched.password && !regularExpression.test(this.state.password))
            errors.password = 'Your password needs to contain at least 8 letters and 1 special character'
        
        if(this.state.touched.password && this.state.touched.password_repeat && this.state.password !==this.state.password_repeat )
            errors.password_repeat = 'Passwords do not match!'
        
        if(!this.state.agree_terms_conditions)
            errors.agree= 'You need to accept'

        return errors;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSendLink(event){
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }
    render(){
        {/**errors is defined as a class that will be sent to the function "validate" */}
        const errors = this.validate(this.state.password, this.state.password_repeat, this.state.email);
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

                        <Form onSubmit={this.handleSendLink}>
                            {/**The email input:
                             * changes the value as it is given by the user
                             * checks if it is valid, if not an error message will raise
                             * onChange: changes the state of corresponding variable (email in this case)
                             * 
                             * SAME PROCESSES ARE ALSO DONE FOR OTHER VARIABLES BELOW
                             */}
                            <FormGroup>
                                <Label htmlFor="email"><h2><strong>Email</strong></h2></Label>
                                <Input type="text" id="email" name="email" style={{width:"400px"}} 
                                    value={this.state.email}
                                    valid={errors.email === ''}
                                    invalid={errors.email !== ''}
                                    onBlur={this.handleBlur('email')}
                                    onChange={this.handleInputChange} />
                                <FormFeedback>{errors.email}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password"><h2><strong>Password</strong></h2></Label>
                                <Input type="password" id="password" name="password" style={{width:"400px"}} 
                                    value={this.state.password}
                                    valid={errors.password === ''}
                                    invalid={errors.password !== ''}
                                    onBlur={this.handleBlur('password')}
                                    onChange={this.handleInputChange} />
                                <FormFeedback>{errors.password}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password"><h2><strong>Password Repeat</strong></h2></Label>
                                <Input type="password" id="password_repeat" name="password_repeat" style={{width:"400px"}} 
                                    value={this.state.password_repeat}
                                    valid={errors.password_repeat === ''}
                                    invalid={errors.password_repeat !== ''}
                                    onBlur={this.handleBlur('password_repeat')}
                                    onChange={this.handleInputChange} />
                                <FormFeedback>{errors.password_repeat}</FormFeedback>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 6}}>
                                    <FormGroup check>
                                        <Label check>
                                        </Label>
                                        <Input type="checkbox" name="agree_terms_conditions"  
                                            checked= {this.state.agree}
                                            value={this.state.agree_terms_conditions}
                                            valid={errors.agree === ''}
                                            invalid={errors.agree !== ''}
                                            onChange={this.handleInputChange} /> 
                                            Accept terms & conditions & data protection agreement
                                        <FormFeedback>{errors.agree}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 6}}>
                                    <FormGroup check>
                                        <Label check>
                                        </Label>
                                        <Input type="checkbox" name="agree_subscription"  
                                            checked= {this.state.agree_subscription}
                                            value={this.state.agree_subscription}
                                            onChange={this.handleInputChange} /> 
                                            Accept to receive emails (optional)
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup >
                                <Button type="submit" value="submit" color="light"> Register</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </>
        )
    }
}
export default Register;