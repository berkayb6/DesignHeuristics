import React from 'react';
import { Link } from 'react-router-dom';
import {Card, CardImg,Button, CardText, CardBody, CardTitle, CardSubtitle, Fade} from 'reactstrap'



function Start (props) {

    return (
        
        /** The box container has a div which is set to be row-wise. */
        <div className='container align-middle' >
            
            {/**Header part includes the TU-logo and the name of the department */}
            <div className='row row-header home-page-header'>
                <div className='col-12 col-sm-12'>
                    <h5><strong>Department of Industrial Information Technology</strong></h5>
                </div>
            </div>
            <div className='row row-content align-items-center'>

                {/**Content part includes the picture of a pedelec on the right hand of side and
                 * "Design Heuristics" and the buttons on the left hand side that lead us 
                 * to corresponding sites: starting the app or seeking more info.
                 * Both sides take place of 12-columns for extra-small to small screen sizes, and side-by-side otherwise.
                */}

                <div className='col-12 col-md-6 '>
                    <div className='col-12' style={{marginBottom:"50px"}}>
                        <h1> Design</h1>
                        <h1> <strong>Heuristics</strong></h1>
                    </div>
                    <div className='col-12 justify-content-around'>

                        {/**Links will lead us to pages under the paths that have been given under "to".
                         * Corresponding paths are generated and linked to corresponding component in the MainComponent
                        */}
                        <Link active className='col-md-3 btn btn-light btn-lg' style={{borderRadius:"30px"}} to='/selectyourway'>
                            Start App
                        </Link>
                        <Link className='col-md-3 offset-md-1 btn btn-light btn-lg' style={{opacity:"0.3",borderRadius:"30px"}} to='/moreinfo' >
                        More Info
                        </Link>

                    </div>
                   
                    
                </div>

                <div className='col-12 col-md-5'>
                    
                    <Card>
                        <CardImg src= "assets/bycle.jpg" width={100} height={250}/>
                    </Card>

                
                </div>
                

            </div>
        </div>
    )
}
export default Start;