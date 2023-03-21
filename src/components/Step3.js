import React, { useState }  from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { Control, LocalForm, Errors, actions} from 'react-redux-form';
import { Row, Col, Card, FormGroup, Label, Input, CardBody, CardText } from "reactstrap";
import updateAction from "./updateAction";
import Header from "./HeaderComponent";

const Step3 = props => {
    const { actions, state } = useStateMachine({ updateAction });
    const [property, setProperty] = useState({
        orderCategory: 'Product Characteristic',
        orderCategorySpecification: 'default',
        step3SystemLevel: 'default',
        step3AdressedLifeCyclePhase: 'default'
    });
    const { handleSubmit, register, errors } = useForm({
        defaultValues: state.heuristicDetails
    });
    const { push } = useHistory();
    const onSubmit = data => {
    actions.updateAction(property);
    push('/step4')
    };

    const handleOnChange = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        setProperty({...property, [name]: value})
    }
    let secondDropdown, thirdDropdown;

    if(property.orderCategory==='Product Characteristic'){
        secondDropdown=
            <Col md={4}>
                <Input type="select" name="step3SystemLevel"
                        onChange={handleOnChange}
                        defaultValue={property.step3SystemLevel}>
                    <option value="default" disabled hidden>
                        Select System Level
                    </option>
                    <option>Product/ System</option>
                    <option>(Sub-)Assembly</option>
                    <option>Part</option>
                </Input>
            </Col>
        if (property.step3SystemLevel=== 'Product/ System'){
            thirdDropdown= 
                <Col md={8}>
                    <Label htmlFor="orderCategorySpecification" ></Label>
                    <Col md={6}>
                        <Input type="select" name="orderCategorySpecification"
                                defaultValue={property.orderCategorySpecification}
                                onChange={handleOnChange}>
                            <option value="default" disabled hidden>
                                Select Order Category
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
        } else if (property.step3SystemLevel=== '(Sub-)Assembly'){
            thirdDropdown= 
                <Col md={8}>
                    <Label htmlFor="orderCategorySpecification" ></Label>
                    <Col md={6}>
                        <Input type="select" name="orderCategorySpecification"
                                defaultValue={property.orderCategorySpecification}
                                onChange={handleOnChange}>
                            <option value="default" disabled hidden>
                                Select Order Category
                            </option>
                            <option>Assembly Identification and Classification</option>
                            <option>Assembly Position and Orientation</option>
                            <option>Fasteners</option>
                            <option>Others</option>
                        </Input>
                    </Col>
                </Col>
        } else if (property.step3SystemLevel=== 'Part'){
            thirdDropdown=
                <Col md={8}>
                    <Label htmlFor="orderCategorySpecification" ></Label>
                    <Col md={6}>
                        <Input type="select" name="orderCategorySpecification"
                                defaultValue={property.orderCategorySpecification}
                                onChange={handleOnChange}>
                            <option value="default" disabled hidden>
                                Select Order Category
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
    }
    if(property.orderCategory==='Technical Property'){
        secondDropdown=
            <Col md={4}>
                <Input type="select" name="orderCategorySpecification"
                        onChange={handleOnChange}
                        defaultValue={property.orderCategorySpecification}>
                    <option value="default" disabled hidden>
                        Select Order Category
                    </option>
                    <option>Efficiency</option>
                    <option>Noise Level</option>
                    <option>Complexity</option>
                    <option>Internal Variety</option>
                    <option>Robustness</option>
                    <option>Temperature</option>
                    <option>Friction</option>
                    <option>Volume</option>
                    <option>Weight</option>
                    <option>Losses</option>
                    <option>Others</option>
                </Input>
            </Col>
        
    }
    if(property.orderCategory==='Life Cycle Phase Property'){
        secondDropdown=
            <Col md={4}>
                <Input type="select" name="orderCategorySpecification"
                        onChange={handleOnChange}
                        defaultValue={property.orderCategorySpecification}>
                    <option value="default" disabled hidden>
                        Select Order Category
                    </option>
                    <option>Minimum risk</option>
                    <option>Cost</option>
                    <option>Standards</option>
                    <option>Assembly</option>
                    <option>Inspection</option>
                    <option>Logistics</option>
                    <option>Low quantity production</option>
                    <option>Supply chain</option>
                    <option>Modularity</option>
                    <option>User friendliness</option>
                    <option>Aesthetics</option>
                    <option>Serviceability</option>
                    <option>Maintainability</option>
                    <option>Repair</option>
                    <option>Reuse</option>
                    <option>Recyclability</option>
                    <option>Disassembly</option>
                    <option>Remanufacturing</option>
                    <option>Sustainability</option>
                    <option>Manufacturability</option>
                    <option>Ergonomics</option>
                    <option>Ease of design changes</option>
                    <option>Amount of produced goods</option>
                    <option>Economies of scale</option>
                    <option>Economies of scope</option>
                    <option>Product usage intensity</option>
                    <option>Product lifetime</option>
                    <option>Wear</option>
                    <option>Customer value</option>
                    <option>Other</option>
                </Input>
            </Col>
    }
    if(property.orderCategory==='Life Cycle Property'){
        secondDropdown=
            <Col md={4}>
                <Input type="select" name="orderCategorySpecification"
                        onChange={handleOnChange}
                        defaultValue={property.orderCategorySpecification}>
                    <option value="default" disabled hidden>
                        Select Order Category
                    </option>
                    <option>Mineral and fossil use</option>
                    <option>General material use</option>
                    <option>Energy use</option>
                    <option>Water use</option>
                    <option>Land use</option>
                    <option>Costs</option>
                    <option>Landfill/Waste</option>
                    <option>Impact on climate change through emissions</option>
                    <option>Impact on euthrophication</option>
                    <option>Impact on acidification</option>
                    <option>Impact on POCP</option>
                    <option>Impact on ozone depletion</option>
                    <option>Particulate matter</option>
                    <option>Impact on ecotoxicity</option>
                    <option>Impact on human toxicity</option>
                    <option>Other</option>
                </Input>
            </Col>
        thirdDropdown=
            <Col md={8}>
                <Label htmlFor="step3AdressedLifeCyclePhase" ></Label>
                <Col md={6}>
                    <Input type="select" name="step3AdressedLifeCyclePhase"
                            defaultValue={property.step3AdressedLifeCyclePhase}
                            onChange={handleOnChange}>
                        <option value="default" disabled hidden>
                            Select Adressed Life Cycle Phase
                        </option>
                        <option>Design</option>
                        <option>Raw material acquisition</option>
                        <option>Production</option>
                        <option>Assembly</option>
                        <option>Distribution</option>
                        <option>Usage</option>
                        <option>After use</option>
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
                            <h5>Your Guideline</h5>
                        </Col>
                        <Col md={10}>
                            <p>
                                {state.heuristicDetails.orderVerb + " " + state.heuristicDetails.artifact + " " + state.heuristicDetails.artifactRestriction + " " + state.heuristicDetails.orderAdverb}
                            </p>
                        </Col>
                    </Row>
                    <Row  className='form-group' style={{marginBottom:"40px"}}>
                        <Col md={9}>
                            <h5>Your Artifact Categorization</h5>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <CardBody>
                                    {state.heuristicDetails.adressedSystemLevel}
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <CardBody>
                                    <CardText>
                                        {state.heuristicDetails.artefactCategorization}
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <form onSubmit={handleSubmit(onSubmit)}>
                            <Col md={2}>
                                <h2>Step 3</h2>
                            </Col>
                            <Col md={4}>
                                <h3>Categorize your order</h3>
                            </Col>
                            <Col md={9}>
                                <h7>Please categorize the artifact you are adressing with your guideline and which system level you talk about!
                                    In case you need help with the categorization, scroll down to the info box!
                                </h7>
                            </Col>
    
                            <FormGroup row>
                                <Col md={4}>
                                    <Label htmlFor="orderCategory" ><h4>1. Order Category</h4></Label>
                                    <Col md={6}>
                                        <Input type="select" name="orderCategory"
                                            defaultValue={property.orderCategory}
                                            onChange={handleOnChange}>
                                            <option value="default" disabled hidden>
                                                Select Order Category
                                            </option>
                                            <option>Product Characteristic</option>
                                            <option>Technical Property</option>
                                            <option>Life Cycle Phase Property</option>
                                            <option>Life Cycle Property</option>
                                        </Input>
                                    </Col>
                                </Col>
                                <Col md={8}>
                                    <Label htmlFor="orderCategorySpecification" ><h4>2. Order Category Specification</h4></Label>
                                    {secondDropdown}
                                    {thirdDropdown}
                                </Col>
                            </FormGroup>
                            <Link className='text-decoration-none card-block' style={{color:"black"}} to="/step2">
                                <Card style={{width:"170px", float: "left",marginTop:"20px", borderRadius:"10px"}}>
                                    <h3 style={{padding:"2px 20px 2px"}}><strong>Previous</strong></h3>
                                </Card>
                                    
                            </Link>
                                    
                            <input type="submit" />
                        </form>
                </div>
            </div>
        </div>
    )

}

export default Step3;