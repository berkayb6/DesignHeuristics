import React, { useState }  from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { Control, LocalForm, Errors, actions} from 'react-redux-form';
import { Row, Col, Card, FormGroup, Label, Input, Button, CardBody, CardImg } from "reactstrap";
import updateAction from "./updateAction";
import Header from "./HeaderComponent";
import { baseUrl } from "../shared/baseUrl";

const Step2 = props => {
    const { actions, state } = useStateMachine({ updateAction });
    const [property, setProperty] = useState({
        adressedSystemLevel: 'Product/ System',
        artefactCategorization: 'default'
    });
    const { handleSubmit, register, errors } = useForm({
      defaultValues: state.heuristicDetails
    });

    const artefactCategorizationCheck= React.useRef();
    const { push } = useHistory();
    const onSubmit = data => {
        if (property.artefactCategorization==='default'){
            artefactCategorizationCheck.current.style={display:"visible"};
            return
        }
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
            <Label className='align-items-center'> <h6 className="requiredStyle" ref={artefactCategorizationCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>
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
            <Label className='align-items-center'> <h6 className="requiredStyle" ref={artefactCategorizationCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>
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
            <Label className='align-items-center'> <h6 className="requiredStyle" ref={artefactCategorizationCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>
        </Col>
    }
    return (
        <div>
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
                                    
                        <Row className='col-md' style={{alignItems:'center', marginTop:'50px'}}>
                            <Col md={4} className='col-md offset-2'>
                                <Link className='text-decoration-none card-block' style={{color:"black"}} to="/add-your-own-heuristic">
                                    <Card style={{width:"160px", float: "left", borderRadius:"10px"}}>
                                        <h3 style={{padding:"2px 20px 2px"}}><strong>Previous</strong></h3>
                                    </Card>
                                </Link>
                            </Col>
                            <Col md={4}>
                                <Button type='submit' className="btn-md" color='light'>Next Step!</Button>
                            </Col>
                            <Row className='col-md offset-4' style={{marginBottom:"40px", marginTop:"20px"}}>
                                <Col>
                                    Step <strong>2</strong> of 5
                                </Col>
                            </Row>
                        </Row>
                    </form>
                    <Col className='informationBackground'>
                        <Row >
                            <Row style={{position: 'relative'}}>
                                <Card style={{ backgroundColor:'#89CAF4'}}>
                                    <CardBody >
                                        Please help us in this step to categorize the artifact you are adressing a bit better, which helps us to better filter and visualize the knowledge assets you find in this app.
                                        <br/><br/>
                                        As you know, products can be described by their characteristics on different system levels. 
                                        <br/><br/>
                                        On the product or system level the desiger defines the technology the product uses, the tolerances which are applied for the product or other characteristics which are applied for all dimensions of the product. On the subassembly level position and orientation, the use of fasteners or other subassembly specific aspects are defined. On the part or component level material specifications, the geometry or other more specific aspects of the product are defined. 
                                        Here you find the current options to pick from in this app: 
                                        <br/><br/>
                                        <Row className="align-items-center" style={{marginBottom: '40px'}}>
                                            <Col md={2}>
                                                <CardImg src= {`${baseUrl}assets/laptop.png`} className='step2Image'/>
                                            </Col>
                                            <Col >
                                                <Card style={{height: 'auto', backgroundColor:'#4BA6E2'}}>
                                                    <CardBody>
                                                        <Row style={{textAlign:'center', marginBottom: '20px'}}>
                                                            <strong>Product/ System Level</strong>
                                                        </Row>
                                                        <Row className="col-12 d-flex" style={{justifyContent:'space-around'}}>
                                                            <Card className='informationCardInside'>Product Identification and Classification</Card>
                                                            <Card className='informationCardInside'>Overall Product Architecture</Card>
                                                            <Card className='informationCardInside'>Software/Intelligence</Card>
                                                            <Card className='informationCardInside'>Technology</Card>
                                                            <Card className='informationCardInside'>Tolerances</Card>
                                                            <Card className='informationCardInside'>Packaging</Card>
                                                            <Card className='informationCardInside'>Interfaces</Card>
                                                            <Card className='informationCardInside'>Sense</Card>
                                                            <Card className='informationCardInside'>Control</Card>
                                                            <Card className='informationCardInside'>Functions</Card>
                                                            <Card className='informationCardInside'>Design Process</Card>
                                                            <Card className='informationCardInside'>Production Process</Card>
                                                            <Card className='informationCardInside'>Business Model</Card>
                                                            <Card className='informationCardInside'>Logistics</Card>
                                                            <Card className='informationCardInside'>Services</Card>
                                                            <Card className='informationCardInside'>Others</Card>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row className="align-items-center" style={{marginBottom: '40px'}}>
                                            <Col md={2}>
                                                <CardImg src= {`${baseUrl}assets/mcu.png`} className='step2Image'/>
                                            </Col>
                                            <Col >
                                                <Card style={{height: 'auto', backgroundColor:'#4BA6E2'}}>
                                                    <CardBody>
                                                        <Row style={{textAlign:'center', marginBottom: '20px'}}>
                                                            <strong>(Sub-) Assembly Level</strong>
                                                        </Row>
                                                        <Row className="col-12 d-flex" style={{justifyContent:'space-around'}}>
                                                            <Card className='informationCardInside'>Assembly Identification and Classification</Card>
                                                            <Card className='informationCardInside'>Assembly Position and Orientation</Card>
                                                            <Card className='informationCardInside'>Fasteners</Card>
                                                            <Card className='informationCardInside'>Others</Card>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row className="align-items-center">
                                            <Col md={2}>
                                                <CardImg src= {`${baseUrl}assets/electronic parts.png`} className='step2Image'/>
                                            </Col>
                                            <Col >
                                                <Card style={{height: 'auto', backgroundColor:'#4BA6E2'}}>
                                                    <CardBody>
                                                        <Row style={{textAlign:'center', marginBottom: '20px'}}>
                                                            <strong>Part Level</strong>
                                                        </Row>
                                                        <Row className="col-12 d-flex" style={{justifyContent:'space-around'}}>
                                                            <Card className='informationCardInside'>Part Identification and Classification</Card>
                                                            <Card className='informationCardInside'>Part Position and Orientation</Card>
                                                            <Card className='informationCardInside'>Surface Characteristics</Card>
                                                            <Card className='informationCardInside'>Geometry</Card>
                                                            <Card className='informationCardInside'>Material Characteristics</Card>
                                                            <Card className='informationCardInside'>Number</Card>
                                                            <Card className='informationCardInside'>Others</Card>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row style={{marginTop: '20px'}}>
                                            When you think about the example from before, you would pick here Part Identification and Classification.
                                        </Row>
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
};

export default Step2;