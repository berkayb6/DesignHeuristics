import React from 'react';
import { Link } from 'react-router-dom';
import {Card, CardImg,Button, CardText, CardBody, CardTitle, CardSubtitle, Fade} from 'reactstrap'



function Start (props) {

    return (
        <div className='container align-middle' >
            <div className='row row-header home-page-header'>
                <div className='col-12 col-sm-12'>
                    <h5><strong>Department of Industrial Information Technology</strong></h5>
                </div>
            </div>
            <div className='row row-content align-items-center'>
                <div className='col-12 col-md-6 '>
                    <div className='col-12'>
                        <h1> Design</h1>
                        <h1> <strong>Heuristics</strong></h1>
                    </div>
                    <div className='col-12 justify-content-around'>
                        <Link active className='col-md-3 btn btn-light' to='/selectyourway'>
                            Start App
                        </Link>
                        <Link className='col-md-3 offset-md-1 btn btn-light' to='/moreinfo' >
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