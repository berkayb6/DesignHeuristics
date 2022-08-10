import React, { Component } from 'react';
import StartHeader from './StartHeaderComponent';
import {Link} from 'react-router-dom';
import { Card, CardImg, Button, Media } from 'reactstrap';
import {baseUrl} from '../shared/baseUrl';

class YourMode extends Component{
    render(){

        return(
            <>
                {/**The header will be replaced by StartHeaderComponent.
                * Since this component should have a header being "Select Your Mode", selectyour prop
                * should be defined as "Mode" and sent so to StartHeaderComponent
                */}
                <div style={{marginBottom:"50px"}}>
                    <StartHeader selectyour="Mode"
                        auth={this.props.auth}
                        logoutUser={this.props.logoutUser} />
                </div>

                {/** According to the design, a picture should stand on the left hand side, and
                 * on the right hand side, there are three card components standing on top of each other, and linking
                 * to design heuristic collection, development assistant and your personal library
                 */}

                <div className='container' >
                    <div className='row row-content align-items-start'>

                        <div className='col-12 col-md-6 offset-md-1' >
                            <CardImg src= {`${baseUrl}assets/SelectYourMode.png`} className='selectYourWayImage' />
                        </div>
                        <div className='col-12 col-md-5  '>
                            <Media list >
                                <div className='row ' >
                                    
                                    {/**Since covering the card with "Link" makes the text underlined and blue,
                                     * the className has set to text-decoration-none and card-block and also the color as black*/}

                                    <Link  className='text-decoration-none card-block' style={{color:"black"}} to="/design-heuristic-collection">
                                        <Card style={{marginTop:"20px", borderRadius:"10px"}}>
                                            <div className='col-12 col-md-10 m-2'  style={{padding:"10px 20px 10px"}}>
                                                <h3><strong>Design Heuristic Collection</strong></h3>
                                                <p>A state of the art DfX database with a search and filter function</p>
                                            </div>
                                        </Card>
                                    </Link>
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