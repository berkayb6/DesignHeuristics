import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, CardText, CardImg, CardTitle, Container } from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import TutorialHeader from "./TutorialHeader";
import { amplitude } from '../utilities/amplitude';

const Tutorial = props => {

    function logClick () {
        amplitude.getInstance().logEvent('addYourOwnHeuristicClicked')
    }
    
    return (
        <>
            <TutorialHeader auth={props.auth}
                    logoutUser={props.logoutUser}/>
            <div className='container' >
                
                <div className='row row-content align-items-start'>
                    
                    <div className='col-12 ' >
                        <h1><strong>Teaching Treats</strong></h1>
                        <Row style={{marginTop:'20px'}}>
                            <p>
                                <h7>
                                    Check out our teaching materials and use whatever suits you and your teaching goals for free. 
                                </h7>
                            </p>
                        </Row>
                   
                        <Row style={{marginLeft:'10px'}}>
                            <Col md={4}>
                                <Link  className='text-decoration-none card-block' style={{color:"black"}} to="/quickly-explained">
                                    <CardImg style={{width:'360px'}} src= {`${baseUrl}assets/QuicklyExplained.png`}  alt= "Tutorials"/>
                                </Link>
                            </Col>
                            <Col md={4}>
                                <Link  className='text-decoration-none card-block' style={{color:"black"}} to="/slides">
                                    <CardImg style={{width:'360px'}} src= {`${baseUrl}assets/ExcitingSlides.png`}  alt= "Tutorials"/>
                                </Link>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'20px', marginLeft:'10px'}}>
                            <Col md={4}>
                                <Link  className='text-decoration-none card-block' style={{color:"black"}} to="/infographic">
                                    <CardImg style={{width:'360px'}} src= {`${baseUrl}assets/Info&Graphics.png`}  alt= "Tutorials"/>
                                </Link>
                            </Col>
                            <Col md={4}>
                                <Link  className='text-decoration-none card-block' style={{color:"black"}} to="/lesson-design">
                                    <CardImg style={{width:'360px'}} src= {`${baseUrl}assets/LessonDesign.png`}  alt= "Tutorials"/>
                                </Link>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'20px', marginLeft:'10px'}}>
                            <Col md={4}>
                                <Link  className='text-decoration-none card-block' style={{color:"black"}} to="/videos">
                                    <CardImg style={{width:'360px'}} src= {`${baseUrl}assets/VideoTutorials.png`}  alt= "Tutorials"/>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Tutorial;