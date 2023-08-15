import React, { Component, useRef } from 'react';
import Header from './HeaderComponent';

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
                            <p> {JSON.parse(localStorage.getItem('creds')).username}</p>
                        </div>
                        <div className='col-12 '> 
                            <h3><strong>Password</strong></h3>
                            <p> ******</p>
                        </div>
                    </div>
                </div>
            </div>
    
        )
    }
        

    
        
}
export default Profile;



