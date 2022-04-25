import React, { Component } from 'react';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap'

class Login extends Component{
    constructor(props){
        super (props);
        this.handleLogin=this.handleLogin.bind(this);

    }

    handleLogin(event){
        alert("Email: " + this.email.value + " Password: " + this.password.value
        + " Remember: " + this.remember.checked);
        event.preventDefault();
    }
    render() {

        return (
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
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input} />
                                Remember me</Label>
                        </FormGroup>
                        <Button type="submit" value="submit" color="light"> Login</Button>
                    </Form>
                </div>
            </div>
        );

    }
}

export default Login;