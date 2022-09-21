import React, { Component, useRef } from 'react';
import Header from './HeaderComponent';
import {Navbar, Nav, NavbarToggler, Collapse, NavItem, Form, FormGroup, Row, Label, Button, Col} from 'reactstrap'
import {Xarrow} from 'react-xarrows';
import SimpleExample from './ArrowExample';
const boxStyle = {border: "grey solid 2px", borderRadius: "10px", padding: "5px"};

class Profile extends Component {
    
    constructor(props) {
        super(props);
    }


    render(){

        return(
            <div>
                
                <Header auth={this.props.auth}
                    logoutUser={this.props.logoutUser}/>
                <div className='container'>
                    <div className='row row-content' >
                        <h1 style={{marginTop: "150px", marginBottom: "50px"}}><strong>Your Profile</strong></h1>
                        <div className='col-12 '>
                            <h3><strong>Email</strong></h3>
                            <p> Test@Test.com</p>
                        </div>
                        <div className='col-12 '> 
                            <h3><strong>Password</strong></h3>
                            <p> ******</p>
                        </div>
                        <div className='col-12'>
                            <h3><strong>Your Groups</strong></h3>
                            <p> Group1 </p>
                        </div>
                    </div>
                </div>
                {/* <div className='row row-content ' style={{justifyContent: "space-around"}}>
    
                    <div id="test2" class="square">
                        <p style={{margin:"auto"}}>Circle text</p>
                    </div>
                    <div id="test1" class="square">
                        <p style={{margin:"auto"}}>Circle text</p>
                    </div>
                    <div id="test3" class="square">
                        <p style={{margin:"auto"}}>Circasdle text</p>
                    </div>
                    <div id="test4" class="square">
                        <p style={{margin:"auto"}}>Circasdle text</p>
                    </div>
                </div>
                    <SimpleExample start="test1" end="test2" end2="test3"/> */}
            </div>
    
        )
    }
        

    
        
}
export default Profile;



