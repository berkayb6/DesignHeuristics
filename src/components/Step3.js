import React, { useState }  from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { Control, LocalForm, Errors, actions} from 'react-redux-form';
import { Row, Col, Card, FormGroup, Label, Input, CardBody, CardText, Button, CardImg } from "reactstrap";
import updateAction from "./updateAction";
import Header from "./HeaderComponent";
import { baseUrl } from "../shared/baseUrl";

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

    const step3SystemLevelCheck= React.useRef();
    const orderCategorySpecificationCheck= React.useRef();
    const step3AdressedLifeCyclePhaseCheck= React.useRef();
    
    const { push } = useHistory();
    const onSubmit = data => {
        if (property.orderCategory==='Product Characteristic'){
            if (property.step3SystemLevel==='default'){
                step3SystemLevelCheck.current.style={display:"visible"};
                return
            }
            if (property.orderCategorySpecification==='default'){
                orderCategorySpecificationCheck.current.style={display:"visible"};
                return;
            }
        }
        if (property.orderCategory==='Life Cycle Property'){
            if (property.orderCategorySpecification==='default'){
                orderCategorySpecificationCheck.current.style={display:"visible"};
                return
            }
            if (property.step3AdressedLifeCyclePhase==='default'){
                step3AdressedLifeCyclePhaseCheck.current.style={display:"visible"};
                return;
            }
        }
        else
            if (property.orderCategorySpecification==='default'){
                orderCategorySpecificationCheck.current.style={display:"visible"};
                return
            }
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
                <Label className='align-items-center'> <h6 className="requiredStyle" ref={step3SystemLevelCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>
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
                    <Label className='align-items-center'> <h6 className="requiredStyle" ref={orderCategorySpecificationCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>
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
                    <Label className='align-items-center'> <h6 className="requiredStyle" ref={orderCategorySpecificationCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>
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
                    <Label className='align-items-center'> <h6 className="requiredStyle" ref={orderCategorySpecificationCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>
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
                <Label className='align-items-center'> <h6 className="requiredStyle" ref={orderCategorySpecificationCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>
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
                <Label className='align-items-center'> <h6 className="requiredStyle" ref={orderCategorySpecificationCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>
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
                <Label className='align-items-center'> <h6 className="requiredStyle" ref={orderCategorySpecificationCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>
            </Col>
        thirdDropdown=
            <Col md={8}>
                <Label htmlFor="step3AdressedLifeCyclePhase" ></Label>
                <Col md={6}>
                    <Row>
                        <h5>During</h5>
                    </Row>
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
                <Label className='align-items-center'> <h6 className="requiredStyle" ref={step3AdressedLifeCyclePhaseCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>
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
                        <Row className='col-md' style={{alignItems:'center', marginTop:'50px'}}>
                            <Col md={4} className='col-md offset-2'>
                                <Link className='text-decoration-none card-block' style={{color:"black"}} to="/step2">
                                    <Card style={{width:"160px", float: "left", borderRadius:"10px"}}>
                                        <h3 style={{padding:"2px 20px 2px"}}><strong>Previous</strong></h3>
                                    </Card>
                                </Link>
                            </Col>
                            <Col md={4}>
                                <Button type='submit' className="btn-md" color='light'>Next Step!</Button>
                            </Col>
                        </Row>
                        <Row className='col-md offset-4' style={{marginBottom:"40px", marginTop:"20px"}}>
                            <Col>
                                Step <strong>3</strong> of 5
                            </Col>
                        </Row>
                    </form>
                    <Col className='informationBackground'>
                        <Row >
                            <Row style={{position: 'relative'}}>
                                <Card style={{ backgroundColor:'#89CAF4'}}>
                                    <CardBody >
                                        Please help us in this step to categorize the advice you have regarding your adressed artifact. 
                                        <br/><br/>
                                        This helps us not only with visualizing the knowledge assets on our website but also gives us the possibility to draw conclusion on how abstract and high level or specific and concrete your advice is. Do not get us wrong we love all advices. But the level of detail of advices is important for different roles in the product development process. Whereas project managers / product owners need rather high level advices, product designers need their design advices rather specific. 
                                        <br/><br/>
                                        You can choose between the product characteristics from before and also more high level product properties.  
                                        Sounds complicated? It is not. Here are some examples: 
                                        <br/><br/>
                                        <strong>Order Category is a product property</strong>
                                        <br/><br/>
                                        Your advice can be to directly adress the property of a product. 
                                        You could for instance give the advice that you, as a designer should facilitate inspections of the engine of a product. 
                                        In this case you would have chosen Assembly Identification and Classification in the Artifact Categorization process.In the Order Categorization process you would choose Desiign for Inspection
                                        <br/><br/>
                                        You wonder what other product properties there are? We got you!
                                        <br/><br/>
                                        <Row className="align-items-center" style={{marginBottom: '40px'}}>
                                            <Col md={2}>
                                                <CardImg src= {`${baseUrl}assets/kilo.png`} className='step2Image'/>
                                            </Col>
                                            <Col >
                                                <Card style={{height: 'auto', backgroundColor:'#4BA6E2'}}>
                                                    <CardBody>
                                                        <Row style={{textAlign:'center', marginBottom: '20px'}}>
                                                            <strong>Technical Product Properties</strong>
                                                        </Row>
                                                        <Row className="col-12 d-flex " style={{justifyContent:'space-around'}}>
                                                            <Card className='informationCardInside'>Efficiency</Card>
                                                            <Card className='informationCardInside'>Noise Level</Card>
                                                            <Card className='informationCardInside'>Complexity</Card>
                                                            <Card className='informationCardInside'>Internal Variety</Card>
                                                            <Card className='informationCardInside'>Robustness</Card>
                                                            <Card className='informationCardInside'>Temperature</Card>
                                                            <Card className='informationCardInside'>Friction</Card>
                                                            <Card className='informationCardInside'>Volume</Card>
                                                            <Card className='informationCardInside'>Weight</Card>
                                                            <Card className='informationCardInside'>Functions</Card>
                                                            <Card className='informationCardInside'>Losses</Card>
                                                            <Card className='informationCardInside'>Others</Card>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row className="align-items-center" style={{marginBottom: '40px'}}>
                                            <Col md={2}>
                                                <CardImg src= {`${baseUrl}assets/recycle.png`} className='step2Image'/>
                                            </Col>
                                            <Col >
                                                <Card style={{height: 'auto', backgroundColor:'#4BA6E2'}}>
                                                    <CardBody>
                                                        <Row style={{textAlign:'center', marginBottom: '20px'}}>
                                                            <strong>Properties regarding specific life cycle phases</strong>
                                                        </Row>
                                                        <Row className="col-12 d-flex" style={{justifyContent:'space-around'}}>
                                                            <Card className='informationCardInside'>Different DfX (Design for X) Goals</Card>
                                                            <Card className='informationCardInside'>Ease of Design Changes</Card>
                                                            <Card className='informationCardInside'>Amount of Produced Goods</Card>
                                                            <Card className='informationCardInside'>Economies of Scale</Card>
                                                            <Card className='informationCardInside'>Economies of Scope</Card>
                                                            <Card className='informationCardInside'>Product Usage Intensity</Card>
                                                            <Card className='informationCardInside'>Product Lifetime</Card>
                                                            <Card className='informationCardInside'>Wear</Card>
                                                            <Card className='informationCardInside'>Customer Value</Card>
                                                            <Card className='informationCardInside'>Others</Card>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row className="align-items-center">
                                            <Col md={2}>
                                                <CardImg src= {`${baseUrl}assets/co2.png`} className='step2Image'/>
                                            </Col>
                                            <Col >
                                                <Card style={{height: 'auto', backgroundColor:'#4BA6E2'}}>
                                                    <CardBody>
                                                        <Row style={{textAlign:'center', marginBottom: '20px'}}>
                                                            <strong>Properties regarding the complete life cycle</strong>
                                                        </Row>
                                                        <Row className="col-12 d-flex" style={{justifyContent:'space-around'}}>
                                                            <Card className='informationCardInside'>Mineral and Fossil Use</Card>
                                                            <Card className='informationCardInside'>General Material Use</Card>
                                                            <Card className='informationCardInside'>Energy Use</Card>
                                                            <Card className='informationCardInside'>Water Use</Card>
                                                            <Card className='informationCardInside'>Land Use</Card>
                                                            <Card className='informationCardInside'>Costs</Card>
                                                            <Card className='informationCardInside'>Landfill/Waste</Card>
                                                            <Card className='informationCardInside'>Impact on Climate Change through Emissions</Card>
                                                            <Card className='informationCardInside'>Impact on Euthrophication</Card>
                                                            <Card className='informationCardInside'>Impact on Acidification</Card>
                                                            <Card className='informationCardInside'>Impact on POCP</Card>
                                                            <Card className='informationCardInside'>Impact on Ozone Depletion</Card>
                                                            <Card className='informationCardInside'>Particulate Matter</Card>
                                                            <Card className='informationCardInside'>Impact on Ecotoxicity</Card>
                                                            <Card className='informationCardInside'>Impact on Human Toxicity</Card>
                                                            <Card className='informationCardInside'>Others</Card>
                                                        </Row>
                                                        <Row style={{textAlign:'center', marginBottom: '20px'}}>
                                                            <strong>! Speciality here: Please also choose the adressed life cycle phase of the affected property! Possible Phases</strong>
                                                        </Row>
                                                        <Row className="col-12 d-flex" style={{justifyContent:'space-around'}}>
                                                            <Card className='informationCardInside'>Design</Card>
                                                            <Card className='informationCardInside'>Raw Material Acquisition</Card>
                                                            <Card className='informationCardInside'>Production</Card>
                                                            <Card className='informationCardInside'>Assembly</Card>
                                                            <Card className='informationCardInside'>Distribution</Card>
                                                            <Card className='informationCardInside'>Usage</Card>
                                                            <Card className='informationCardInside'>After Use</Card>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row style={{marginBottom: '20px', paddingLeft:'60px', marginTop:'20px'}}>
                                            <Col>
                                                <strong>Order Category is a product property</strong>
                                                <br/><br/>
                                                Let us think about our inital example. Your advice was: 
                                                <br/>
                                                Locate valuable parts at easily accessible places.
                                                <br/><br/>
                                                This means you chose in Step 2 that your adressed Artefact is Part Identification and Classification. 
                                                <br/>
                                                Your order category is also on the part level. More precise you have an advice regarding the Part Position and Orientation.
                                            </Col>
                                        </Row>

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
    )

}

export default Step3;