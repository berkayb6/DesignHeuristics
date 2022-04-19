import React from 'react';
import {Card, CardImg,Button, CardText, CardBody, CardTitle, CardSubtitle, Fade} from 'reactstrap'



function Home (props) {

    return (
        <div className='container'>
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
                        <Button active className='col-md-3 btn btn-light' >
                            Start App
                        </Button>
                        <Button className='col-md-3 offset-md-1 btn btn-light'>
                        More Info
                        </Button>

                    </div>
                   
                    
                </div>

                <div className='col-12 col-md-5'>
                    
                    <Card>
                        <CardImg src= "../../img/bycle.jpg" width={100} height={250}/>
                    </Card>

                
                </div>
                

            </div>
        </div>
    )
}
export default Home;