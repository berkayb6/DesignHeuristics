import React, { Component, useState } from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { useHistory } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import {Link, useLocation, Route, BrowserRouter as Router} from 'react-router-dom';
import { Control, LocalForm, Errors, actions} from 'react-redux-form';
import { Col, Label, Row, Input, Button, Card, Form, CardBody, CardImg, CardTitle, CardText, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {baseUrl} from '../shared/baseUrl';
import Header from './HeaderComponent';
import axios from 'axios';

const required = (val) => val && val.length;


export default (props) =>{
    const { actions, state } = useStateMachine({ updateAction });
    const [guideline, setGuideline] = useState({
        artifact: '',
        artifactRestriction: '',
        orderVerb: '',
        orderAdverb: ''
    });
    const { handleSubmit, errors, register } = useForm({
        defaultValues: state.heuristicDetails
    });
    const { push } = useHistory();
    const onSubmit = data => {
        actions.updateAction(guideline);
        push("/step2");
    };
    const guidelineChange = e => {
        const {id, value} = e.target; 
        setGuideline({...guideline, [id]: value})
    }
    console.log( "state: ", state)
    return (
        <div>
            <Header auth={props.auth}
                logoutUser={props.logoutUser}/>
            
            <div className='container'>
                <div className='row row-content'>
                    <form onSubmit={handleSubmit(onSubmit)}> {/** */}
                        <Row onChange={guidelineChange} className='form-group' style={{marginBottom:"60px"}}>
                            <Col md={2}>
                                <h2>Step 1</h2>
                            </Col>
                            <Col md={4}>
                                <h3>Formulate Your Knowledge</h3>
                            </Col>
                            <Col md={9}>
                                <h7>This is the core information you give others! Please use your words carefully and check before hand, if 
                                    somebody else already posted your guideline. You can easily also add more information to an already guideline.</h7>
                            </Col>
                            <Row  className='form-group' style={{marginBottom:"20px", marginTop:"20px"}}>
                                
                                <Col>
                                    <h4>1. Artifact  </h4>
                                </Col>
                                <Row>
                                    <Col md={6}>
                                        <Control.text model='.artifact' id="artifact" name="artifact"  
                                            className= "form-control"
                                            // {...register('artifact', { required: true })}
                                            // validators= {{
                                            //     required
                                            // }}
                                            />

                                        {/* <ErrorMessage errors={errors} name="firstName" as="p" /> */}
                                        {/* <Errors
                                            className='text-danger'
                                            model=".artifact"
                                            show="touched"
                                            messages= {{
                                                required: 'Required '
                                            }} /> */}
                                    </Col>
                                    <Col md={6}>
                                        <p>
                                        What do you want to give an advice for in detail? A product, a component, the material types, joints or certain processes? Please try to use one word or 2 maximum.
                                        </p>
                                    </Col>
                                </Row>
                            </Row>
                            <Row className='form-group' style={{marginBottom:"20px"}}>
                                <Col >
                                    <h4>2. Artifact Restriction/Extension (optional) </h4>
                                </Col>
                                <Row>
                                    <Col md={6}>
                                        <Control.text model='.artifactRestriction' id="artifactRestriction" name="artifactRestriction"  
                                            className= "form-control"/>
                                    </Col>
                                    <Col md={6}>
                                        <p>
                                        This part is optional. To describe the artifact we only gave you 2 words. Here you can desribe it in more detail e.g. only products <strong>that contain hazardous components</strong> or only joints <strong>with plastic parts.</strong> You get the drill!
                                        </p>
                                    </Col>
                                </Row>
                            </Row>
                            <Row className='form-group' style={{marginBottom:"20px"}}>
                                <Col>
                                    <h4>3. Order Verb  </h4>
                                </Col>
                                <Row>
                                    <Col md={6}>
                                        <Control.text model='.orderVerb' id="orderVerb" name="orderVerb"  
                                            className= "form-control"
                                            validators= {{
                                                required
                                            }}/>
                                        <Errors
                                            className='text-danger'
                                            model=".orderVerb"
                                            show="touched"
                                            messages= {{
                                                required: 'Required '
                                            }} />
                                    </Col>
                                    <Col md={6}>
                                        <p>
                                        What should be done with the artifact? Use a verb! Should be designed a certain way? write <strong>Design.</strong> Should something be avoided? Write <strong>Avoid.</strong> In the next field you can be more precise about it.
                                        </p>
                                    </Col>
                                </Row>
                            </Row>
                            <Row className='form-group' style={{marginBottom:"20px"}}>
                                <Col>
                                    <h4>4. Order Adverb (optional)</h4>
                                </Col>
                                <Row>
                                    <Col md={6}>
                                        <Control.text model='.orderAdverb' id="orderAdverb" name="orderAdverb"  
                                            className= "form-control"/>
                                    </Col>
                                    <Col md={6}>
                                        <p>
                                        This part is optional. Here you can describe what should be done with the artifact in more detail e.g. the artifact should located <strong>in easily accessible areas</strong> or your artifact should the artifacts default state should be set <strong>at minimal material consumption.</strong>
                                        </p>
                                    </Col>
                                </Row>
                            </Row>
                        </Row>
                        <Row  className='form-group' style={{marginBottom:"40px"}}>
                            <Col md={3}>
                                <h5>Check your guideline</h5>
                            </Col>
                            <Col md={9}>
                                <p>
                                    {guideline.orderVerb + " " + guideline.artifact + " " + guideline.artifactRestriction + " " + guideline.orderAdverb}
                                </p>
                            </Col>
                        </Row>
                      
                        <input type="submit" />
                    </form>
                </div>
            </div>

            
        </div>
        
      );
} ;