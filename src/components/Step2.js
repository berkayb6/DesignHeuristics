import React, { useState }  from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { Control, LocalForm, Errors, actions} from 'react-redux-form';
import { Row, Col, Card, FormGroup, Label, Input } from "reactstrap";
import updateAction from "./updateAction";
import Header from "./HeaderComponent";

const Step2 = props => {
    const { actions, state } = useStateMachine({ updateAction });
    const [property, setProperty] = useState({
        adressedSystemLevel: 'Product/ System',
        artefactCategorization: 'default'
    });
    const { handleSubmit, register, errors } = useForm({
      defaultValues: state.heuristicDetails
    });
    const { push } = useHistory();
    const onSubmit = data => {
      actions.updateAction(property);
      push('/step3')
    };

    function handleFirstDrowdownChange (){
        setProperty({...property, artefactCategorization: 'Assembly Identification and Classification'})
    }

    const handleOnChange = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        setProperty({...property, [name]: value})
        
    }
    const location= useLocation();
    let secondDropdown;

    if (property.adressedSystemLevel=== 'Product/ System'){
        secondDropdown= 
        <Col md={6}>
            <Label htmlFor="artefactCategorization" ><h4>2. Categorization of the Artefact</h4></Label>
            <Col md={6}>
                <Input type="select" name="artefactCategorization"
                        defaultValue={property.artefactCategorization}
                        onChange={handleOnChange}>
                    <option value="default" disabled hidden>
                        Select Categorization of the Artefact
                    </option>
                    <option>Product Identification and Classification</option>
                    <option>Overall Product Architecture</option>
                    <option>Software/Intelligence</option>
                    <option>Technology</option>
                    <option>Tolerances</option>
                    <option>Packaging</option>
                    <option>Interfaces</option>
                    <option>Sense</option>
                    <option>Control</option>
                    <option>Functions</option>
                    <option>Design Process</option>
                    <option>Production Process</option>
                    <option>Business Model</option>
                    <option>Logistics</option>
                    <option>Services</option>
                    <option>Others</option>
                </Input>
            </Col>
        </Col>
    } else if (property.adressedSystemLevel=== '(Sub-)Assembly'){
        secondDropdown= 
        <Col md={6}>
            <Label htmlFor="artefactCategorization" ><h4>2. Categorization of the Artefact</h4></Label>
            <Col md={6}>
                <Input type="select" name="artefactCategorization"
                        defaultValue={property.artefactCategorization}
                        onChange={handleOnChange}>
                    <option value="default" disabled hidden>
                        Select Categorization of the Artefact
                    </option>
                    <option>Assembly Identification and Classification</option>
                    <option>Assembly Position and Orientation</option>
                    <option>Fasteners</option>
                    <option>Others</option>
                </Input>
            </Col>
        </Col>
    } else if (property.adressedSystemLevel=== 'Part'){
        secondDropdown=
        <Col md={6}>
            <Label htmlFor="artefactCategorization" ><h4>2. Categorization of the Artefact</h4></Label>
            <Col md={6}>
                <Input type="select" name="artefactCategorization"
                        defaultValue={property.artefactCategorization}
                        onChange={handleOnChange}>
                    <option value="default" disabled hidden>
                        Select Categorization of the Artefact
                    </option>
                    <option>Part Identification and Classification</option>
                    <option>Part Position and Orientation</option>
                    <option>Surface Characteristics</option>
                    <option>Geometry</option>
                    <option>Material Characteristics</option>
                    <option>Others</option>
                </Input>
            </Col>
        </Col>
    }
    return (
        <div>
            {console.log("systemlevel: ", state)}
            <Header auth={props.auth}
                logoutUser={props.logoutUser}/>
            <div className='container'>
                <div className='row row-content'>
                    <Row  className='form-group' style={{marginBottom:"40px"}}>
                        <Col md={3}>
                            <h5>Your guideline</h5>
                        </Col>
                        <Col md={9}>
                            <p>
                                {state.heuristicDetails.orderVerb + " " + state.heuristicDetails.artifact + " " + state.heuristicDetails.artifactRestriction + " " + state.heuristicDetails.orderAdverb}
                            </p>
                        </Col>
                    </Row>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Col md={2}>
                            <h2>Step 2</h2>
                        </Col>
                        <Col md={4}>
                            <h3>Categorize the adressed artifact</h3>
                        </Col>
                        <Col md={9}>
                            <h7>Please categorize the artifact you are adressing with your guideline and which system level you talk about!
                                In case you need help with the categorization, scroll down to the info box!
                            </h7>
                        </Col>

                        <FormGroup row>
                            <Col md={6}>
                                <Label htmlFor="adressedSystemLevel" ><h4>1. Adressed System level</h4></Label>
                                <Col md={6}>
                                    <Input type="select" name="adressedSystemLevel"
                                            onChange={handleOnChange}
                                            defaultValue={property.adressedSystemLevel}>
                                        <option value="default" disabled hidden>
                                            Select System Level
                                        </option>
                                        <option>Product/ System</option>
                                        <option>(Sub-)Assembly</option>
                                        <option>Part</option>
                                    </Input>
                                </Col>
                            </Col>
                            {secondDropdown}
                            
                        </FormGroup>
                        <Link className='text-decoration-none card-block' style={{color:"black"}} to="/add-your-own-heuristic">
                            <Card style={{width:"170px", float: "left",marginTop:"20px", borderRadius:"10px"}}>
                                <h3 style={{padding:"2px 20px 2px"}}><strong>Previous</strong></h3>
                            </Card>
                                
                        </Link>
                                
                        <input type="submit" />
                    </form>
                </div>
            </div>
        </div>
        
    );
    
    if (property.adressedSystemLevel=== '(Sub-)Assembly'){
        return (
            <div>
                {console.log("systemlevel: ", property)}
                <Header auth={props.auth}
                    logoutUser={props.logoutUser}/>
                <div className='container'>
                    <div className='row row-content'>
                        <Row  className='form-group' style={{marginBottom:"40px"}}>
                            <Col md={3}>
                                <h5>Your guideline</h5>
                            </Col>
                            <Col md={9}>
                                <p>
                                    {state.heuristicDetails.orderVerb + " " + state.heuristicDetails.artifact + " " + state.heuristicDetails.artifactRestriction + " " + state.heuristicDetails.orderAdverb}
                                </p>
                            </Col>
                        </Row>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Col md={2}>
                                <h2>Step 2</h2>
                            </Col>
                            <Col md={4}>
                                <h3>Categorize the adressed artifact</h3>
                            </Col>
                            <Col md={9}>
                                <h7>Please categorize the artifact you are adressing with your guideline and which system level you talk about!
                                    In case you need help with the categorization, scroll down to the info box!
                                </h7>
                            </Col>
    
                            <FormGroup row>
                                <Col md={6}>
                                    <Label htmlFor="adressedSystemLevel" ><h4>1. Adressed System level</h4></Label>
                                    <Col md={6}>
                                        <Input type="select" name="adressedSystemLevel"
                                                onChange={handleOnChange}
                                                defaultValue={property.adressedSystemLevel}>
                                            <option value="default" disabled hidden>
                                                Select System Level
                                            </option>
                                            <option>Product/ System</option>
                                            <option>(Sub-)Assembly</option>
                                            <option>Part</option>
                                        </Input>
                                    </Col>
                                </Col>
                                <Col md={6}>
                                    <Label htmlFor="artefactCategorization" ><h4>2. Categorization of the Artefact</h4></Label>
                                    <Col md={6}>
                                        <Input type="select" name="artefactCategorization"
                                                defaultValue={property.artefactCategorization}
                                                onChange={handleOnChange}>
                                            <option value="default" disabled hidden>
                                                Select Categorization of the Artefact
                                            </option>
                                            <option>Assembly Identification and Classification</option>
                                            <option>Assembly Position and Orientation</option>
                                            <option>Fasteners</option>
                                            <option>Others</option>
                                        </Input>
                                    </Col>
                                </Col>
                            </FormGroup>
                            <Link className='text-decoration-none card-block' style={{color:"black"}} to="/add-your-own-heuristic">
                                <Card style={{width:"170px", float: "left",marginTop:"20px", borderRadius:"10px"}}>
                                    <h3 style={{padding:"2px 20px 2px"}}><strong>Previous</strong></h3>
                                </Card>
                                    
                            </Link>
                                    
                            <input type="submit" />
                        </form>
                    </div>
                </div>
            </div>
          
        );
    }
    if (property.adressedSystemLevel==='Part'){
        return (
            <div>
                {console.log("systemlevel: ", state)}
                <Header auth={props.auth}
                    logoutUser={props.logoutUser}/>
                <div className='container'>
                    <div className='row row-content'>
                        <Row  className='form-group' style={{marginBottom:"40px"}}>
                            <Col md={3}>
                                <h5>Your guideline</h5>
                            </Col>
                            <Col md={9}>
                                <p>
                                    {state.heuristicDetails.orderVerb + " " + state.heuristicDetails.artifact + " " + state.heuristicDetails.artifactRestriction + " " + state.heuristicDetails.orderAdverb}
                                </p>
                            </Col>
                        </Row>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Col md={2}>
                                <h2>Step 2</h2>
                            </Col>
                            <Col md={4}>
                                <h3>Categorize the adressed artifact</h3>
                            </Col>
                            <Col md={9}>
                                <h7>Please categorize the artifact you are adressing with your guideline and which system level you talk about!
                                    In case you need help with the categorization, scroll down to the info box!
                                </h7>
                            </Col>
    
                            <FormGroup row>
                                <Col md={6}>
                                    <Label htmlFor="adressedSystemLevel" ><h4>1. Adressed System level</h4></Label>
                                    <Col md={6}>
                                        <Input type="select" name="adressedSystemLevel"
                                                onChange={handleOnChange}
                                                defaultValue={property.adressedSystemLevel}>
                                            <option default>Product/ System</option>
                                            <option>(Sub-)Assembly</option>
                                            <option>Part</option>
                                        </Input>
                                    </Col>
                                </Col>
                                <Col md={6}>
                                    <Label htmlFor="artefactCategorization" ><h4>2. Categorization of the Artefact</h4></Label>
                                    <Col md={6}>
                                        <Input type="select" name="artefactCategorization"
                                                defaultValue={property.artefactCategorization}
                                                onChange={handleOnChange}>
                                            <option value="default" disabled hidden>
                                                Select Categorization of the Artefact
                                            </option>
                                            <option>Part Identification and Classification</option>
                                            <option>Part Position and Orientation</option>
                                            <option>Surface Characteristics</option>
                                            <option>Geometry</option>
                                            <option>Material Characteristics</option>
                                            <option>Others</option>
                                        </Input>
                                    </Col>
                                </Col>
                            </FormGroup>
                            <Link className='text-decoration-none card-block' style={{color:"black"}} to="/add-your-own-heuristic">
                                <Card style={{width:"170px", float: "left",marginTop:"20px", borderRadius:"10px"}}>
                                    <h3 style={{padding:"2px 20px 2px"}}><strong>Previous</strong></h3>
                                </Card>
                                    
                            </Link>
                                    
                            <input type="submit" />
                        </form>
                    </div>
                </div>
            </div>
          
        );
    }
    
};

export default Step2;