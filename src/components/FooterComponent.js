import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import {Row, Col} from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';

function Footer(props) {
    return(
        <div style={{backgroundColor:'#001F4D'}}>
            <Container style={{ marginTop:'5vw'}}>
                <Row >
                    <Col className='text-decoration-none card-block' style={{fontSize:'20px',color:'white',fontFamily:'sans-serif',marginTop:'5vw', marginLeft:'5vw' }}>
                        <ul className="list-unstyled">
                            <li><Link style={{color:'white'}} to="/start">The Application</Link></li>
                            <br/>
                            <li><Link style={{color:'white'}} to="/impressum">Imprint</Link></li>
                            <br/>
                            <li><Link style={{color:'white'}} to="/datenschutz">Data Protection</Link></li>
                            <br/>
                            <li>Contact:</li>
                            <br/> IIT TU Berlin
                            <br/> Gerald Kremer
                            <br/> Pascalstraße 8-9
                            <br/> 10587 Berlin
                            <br/> kremer@tu-berlin.de
                        </ul>
                    </Col>
                    <Col style={{ marginTop:'5vw', marginBottom:'3vw'}}>
                        <Row>
                            <Col>
                                <h1 style={{fontSize:'20px', textAlign:'justify', color:'white'}}>
                                    Funded by
                                </h1>
                                <img style={{height:'auto', width:'70%'}} src= {`${baseUrl}assets/DFG.png`}/>
                            </Col>
                        </Row>
                        <Row>
                            <img style={{width: '20vw', marginTop:'15vw', height:'auto'}} src= {`${baseUrl}assets/landingPageLogo.png`}/>
                        </Row>

                    </Col>
                </Row>
               
            </Container>
        </div>
    );
}

export default Footer;