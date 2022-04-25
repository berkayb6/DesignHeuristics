import React, { Component } from 'react';
import StartHeader from './StartHeaderComponent';
import {Link} from 'react-router-dom';
import { Card, CardImg, Button, Media } from 'reactstrap';

class YourMode extends Component{
    render(){

        return(
            <>
                <div style={{marginBottom:"50px"}}>
                    
                    <StartHeader/>
                </div>
                <div className='container' >
                
                    <div className='row row-content align-items-start'>
                        
                        <div className='col-12  col-md-6 offset-md-1' >
                            <CardImg src= "assets/SelectYourMode.png" className='selectYourWayImage' />
                        </div>

                        <div className='col-12 col-md-5  '>
                            <Media list >
                                <div className='row ' >

                                    <Card style={{marginTop:"20px", borderRadius:"10px"}}>
                                        <div className='col-12 col-md-10 m-2'  style={{padding:"10px 20px 10px"}}>
                                            <h3><strong>Design Heuristic Collection</strong></h3>
                                            <p>A state of the art DfX database with a search and filter function</p>
                                        </div>
                                    </Card>
                                    <Card style={{marginTop:"20px", borderRadius:"10px"}}>
                                        <div className='col-12 col-md-10 m-2' style={{padding:"10px 20px 10px"}} >
                                            <h3> <strong> Development Assistant</strong></h3>
                                            <p>Define your personal requirements and have them documented for your project</p>
                                        </div>
                                    </Card>
                                    <Card style={{marginTop:"20px", borderRadius:"10px"}}>
                                        <div className='col-12 col-md-10 m-2' style={{padding:"10px 20px 10px"}} >
                                        <h3> <strong>Your personal library</strong></h3>
                                            <p>Find your favorite design heuristics in one place</p>
                                        </div>
                                    </Card>
                                </div>
                            </Media>
                               
                        </div>
                    </div>
                    
                </div>
                <div className='col-12 justify-content-around'>
                    <Link className='col-md-3 offset-md-1 btn' style={{display: 'inline-block'}} to='/selectyourway' >
                        <Button className='btn-light btn-lg' style={{opacity:"0.4", width:"180px", borderRadius:"30px"}}>Go Back</Button>
                    </Link>
                </div>
            </>
            
        )
    }

}

export default YourMode;