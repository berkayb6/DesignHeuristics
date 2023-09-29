import React from 'react';
import {Row, Col, CardImg, Card, Button, CardTitle, CardText} from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Container } from 'reactstrap';
import TutorialHeader from './TutorialHeader';
import TutorialInsideHeader from './TutorialsInsideHeader';
import Link from 'react-router-dom/Link';

function Videos (props){
    return(
        <>
            <TutorialHeader auth={props.auth}
                    logoutUser={props.logoutUser}/>
            <TutorialInsideHeader/>
            <div className='container' >
                <div className='row row-content align-items-start' style={{fontFamily:'sans-serif'}}>
                    <div className='col-12 ' >
                        <h1><strong>Videos</strong></h1>
                        <Row style={{marginTop:'20px'}}>
                            <Col >
                                <p style={{textAlign:'justify', marginRight:'10%'}}>
                                    <h7 >
                                        Find videos about the use of knowledge in the product development process and the use of our design heuristics app.
                                    </h7>
                                </p>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'3vw'}} className='d-flex align-items-center justify-content-center'>
                            <Col>
                            <iframe
                                width="850vw"
                                height="480"
                                src={`https://www.youtube.com/embed/MqDPd6zOGWI`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                            </Col>
                        </Row>

                        <Row style={{marginTop:'3vw'}} className='d-flex align-items-center justify-content-center'>
                            <Col>
                            <iframe
                                width="850vw"
                                height="480"
                                src={`https://www.youtube.com/embed/MqDPd6zOGWI`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                            </Col>
                        </Row>

                        <Row style={{marginTop:'3vw'}} className='d-flex align-items-center justify-content-center'>
                            <Col>
                            <iframe
                                width="850vw"
                                height="480"
                                src={`https://www.youtube.com/embed/MqDPd6zOGWI`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Videos