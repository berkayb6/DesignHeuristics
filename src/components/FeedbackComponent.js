import React from 'react';
import {Row, Col, CardImg, Card, Button, CardTitle, CardText} from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Container } from 'reactstrap';
import TutorialHeader from './TutorialHeader';
import TutorialInsideHeader from './TutorialsInsideHeader';
import Link from 'react-router-dom/Link';

function Feedback (props){
    return(
        <>
            <TutorialHeader auth={props.auth}
                    logoutUser={props.logoutUser}/>
            <TutorialInsideHeader/>
            <div className='container' >
                <div className='row row-content align-items-start' style={{fontFamily:'sans-serif'}}>
                    <div className='col-12 ' >
                        <h1><strong>You have something to add?</strong></h1>
                        <Row style={{marginTop:'20px'}}>
                            <Col >
                                <p style={{textAlign:'justify', marginRight:'10%'}}>
                                    <h7 >
                                        Let us know what’s on your mind!
                                    </h7>
                                </p>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'20px'}}>
                            <Col >
                                <p style={{textAlign:'justify', marginRight:'10%'}}>
                                    <h7 >
                                        Contact:
                                        <br/><br/>
                                        IIT TU Berlin
                                        <br/><br/>
                                        Contact:
                                        <br/><br/>
                                        Gerald Kremer
                                        <br/>
                                        Pascalstraße 8-9
                                        <br/>
                                        10587 Berlin
                                        <br/>
                                        kremer@tu-berlin.de
                                    </h7>
                                </p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feedback