import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Form, FormGroup, Input, Label, Button, FormFeedback} from 'reactstrap'

class ForgotPassword extends Component{
    constructor(props){
        super (props);
        this.state = {
            email: '',
            touched: {
                email: false
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSendLink=this.handleSendLink.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate(email) {
        const errors = {
            email: ''
        };

        if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
            errors.email = 'Email should contain a @';

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

        const errors = this.validate(this.state.email);
        return(
            <div className='container'>
                <div className='row row-content' >
                    <h1 style={{marginTop: "150px", marginBottom: "50px"}}><strong>Send a link</strong></h1>

                    <Form onSubmit={this.handleSendLink}>
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
                        <FormGroup >
                            <Button type="submit" value="submit" color="light"> Send a link</Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }

}
export default ForgotPassword