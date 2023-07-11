import React, { useEffect, useState } from 'react';
import { Loading } from './LoadingComponent';
import {withRouter } from 'react-router-dom';
import { Player } from 'video-react';
import { baseUrl } from '../shared/baseUrl';
import { Form, FormGroup, Col, Container, Row, Label, Input,Button, Card, CardTitle, CardBody, CardText, Modal, ModalHeader, ModalBody } from 'reactstrap';


function Landing (props){
    return(
        <Container fluid >
            <Row style={{width:'auto', display:'inline-block', textAlign:'center'}}>
                <img style={{position:'absolute', left:'80%', width: '15vw', height:'auto'}} src= {`${baseUrl}assets/landingPageLogo.png`}/>
                <video autoPlay loop muted id='video' style={{ objectFit: 'cover'}}>
                    <source src= {`${baseUrl}videos/clouds.mp4`} type='video/mp4'/>
                </video>
                <p style={{position:'absolute', width: 'auto', top:'30%', height:'auto'}}>
                    <h1 style={{fontSize:'8.5vw', letterSpacing:'5.5vw'}}>KNOWLEDGE</h1>
                    <h1 style={{fontSize:'6vw',  letterSpacing:'0.1vw'}}>For Sustainable Product Design</h1>
                </p>
                
            </Row>
            <Row className='d-flex align-items-center'>
                <Col md={2}>
                    <h3>Effect Category</h3>
                </Col>
                <Col md={1}>
                    <h3>Effect Specification</h3>
                </Col>
                <Col md={2}>
                    <h3>Adressed System Level</h3>
                </Col>
                <Col md={2}>
                    <h3>Artefact Categorization</h3>
                </Col>
                <Col md={1}>
                    <h3>Rating</h3>
                </Col>
            </Row>
        </Container>
    )
}

export default withRouter(Landing);