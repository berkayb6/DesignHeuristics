import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardImg } from "reactstrap";
import { baseUrl } from "../shared/baseUrl";

const YouRock = props => {
    
    return (
        <>
            <div className='container'>
                <div className="row row-header">
                    <Row >
                        <Col md={5}>
                            <h5><strong>Department of Industrial Information Technology</strong></h5>
                        </Col>
                    </Row>
                    <Row style={{marginLeft:'50px'}}>
                        <Col md={3} >
                            <Card className='logo'>
                                <CardImg src= {`${baseUrl}assets/landingPageLogo.png`} width={20} height={50}/>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div className='row row-content align-items-center'>
                    <div className='col-12 col-md-6' >
                            <h1 style={{fontSize: '100px'}}>YOU</h1>
                            <h1 style={{fontSize: '100px'}}><strong>ROCK</strong></h1>
                            <p style={{fontSize: 'large'}}className="w-75 p-3">Thank you for submitting a new heuristic! Thanks to people like you, designers across the world learn to build better products.
                                You will be redirected to your home screen in 5 seconds.</p>

                    </div>
                    

                    <div className='col-12 col-md-4'>
                        <CardImg src={`${baseUrl}assets/robot.png`} width={100} height={800}/>
                    </div>
                </div>
                
            </div>
            <div className='container'>
                <div className='row row-content'>
                    <div className='col-12 col-md-6'>

                        <Link className='col-md-3 btn btn-light btn-lg' style={{borderRadius:"30px"}} to='/design-heuristic-collection' >
                            <h5>Go</h5>
                        </Link>
                    </div>

                </div>
                

            </div>
        </>
    )

}

export default YouRock;