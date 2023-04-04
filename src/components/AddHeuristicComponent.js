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

    const artifactCheck=React.createRef();
    const orderVerbCheck=React.createRef();

    const { handleSubmit, errors, register } = useForm({
        defaultValues: state.heuristicDetails
    });
    const { push } = useHistory();
    const onSubmit = data => {
        if(guideline.artifact===''){
            artifactCheck.current.style={display:"visible"};
            return
        }
        if (guideline.artifact!==''){
            artifactCheck.current.style={display:"none"};
        }
        if(guideline.orderVerb===''){
            orderVerbCheck.current.style={display:"visible"};
            return
        }
        if (guideline.orderVerb!==''){
            orderVerbCheck.current.style={display:"none"};
        }
        actions.updateAction(guideline);
        push("/step2");
    };
    const guidelineChange = e => {
        const {id, value} = e.target; 
        setGuideline({...guideline, [id]: value})
    }
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
                            <Label className='align-items-center'> <h6 className="requiredStyle" ref={artifactCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>

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
                                            className= "form-control"/>
                                            
                                    </Col>
                                    <Col md={6}>
                                        <p>
                                        What should be done with the artifact? Use a verb! Should be designed a certain way? write <strong>Design.</strong> Should something be avoided? Write <strong>Avoid.</strong> In the next field you can be more precise about it.
                                        </p>
                                    </Col>
                                </Row>
                            </Row>
                            <Label className='align-items-center'> <h6 className="requiredStyle" ref={orderVerbCheck} style={{visibility:"hidden"}}> You may have missed some information to share! </h6></Label>
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
                        <Row>
                            <p>
                                This will be the guideline you share with fellow designers. Is everything correct? Then click on Next Step!
                            </p>
                        </Row>
                        <Row className='col-md offset-4' style={{marginBottom:"20px"}}>
                            <Col >
                                <Button type='submit' color='light'>Next Step!</Button>
                            </Col>
                        </Row>
                        <Row className='col-md offset-4' style={{marginBottom:"40px"}}>
                            <Col>
                                Step <strong>1</strong> of 5
                            </Col>
                        </Row>
                    </form>
                    <Col className='informationBackground'>
                        <Row >
                            <Row style={{position: 'relative'}}>
                                <Card style={{ backgroundColor:'#89CAF4'}}>
                                    <CardBody >
                                        Our application helps users to identify the knowledge they need for their specific case. To do so, the guidelines in our application are formulated in a strict modular system. It sounds more complicated than it is and we will help you with examples.
                                        <br/><br/>
                                        The core is the guideline formulation: When you have an advice about product design, it is most helpful to give <strong>short order statements,</strong> which tell fellow designers exactly what to do. Of course you want to tell others what effect your guideline has. This will be done in the <strong>next steps!</strong>
                                        <br/><br/>
                                        <strong>Example: </strong>
                                        Your department designs TVs and your company has a new policy to take back old TVs to recycle valuable parts in new TVs, to reduce the usage of materials. To make sure that other designers take into account the new policy in their designs, you formulate a design guideline for them. You tell them to locate valuable parts in the product at easily accessible places so that they can be taken out easily during the disassembly process.  
                                        <br/><br/>
                                        What are you adressing in your guideline?  <strong>parts!</strong>
                                        Is it about all kinds of parts? No! There is a specification! Just <strong>valuable</strong> parts! 
                                        What about valuable parts? They should be <strong>located at easily accessbile places!</strong>
                                        <br/><br/>
                                        You formulate your advice as: Locate valuable parts at easily accessible places!
                                        <br/><br/>
                                        Your Adressed Artifact is: parts
                                        Your Artifact Speicifiaction is: that are valuable
                                        Your Order Verb is: locate
                                        Your Order Specification is:  at easily accessible places
                                    </CardBody>
                                </Card>
                            </Row>
                        </Row>
                        <Col className='informationImage' >
                            <CardImg src= {`${baseUrl}assets/information 1.png`} />
                        </Col>
                    </Col>
                </div>
            </div>

            
        </div>
        
      );
} ;