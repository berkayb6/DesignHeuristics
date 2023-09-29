import React, { useState }  from "react";
import { useForm} from "react-hook-form";
import { useHistory, Link} from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { Row, Col, Card, FormGroup, Label, Input, CardBody, CardText, Button, CardImg } from "reactstrap";
import updateAction from "./updateAction";
import Header from "./HeaderComponent";
import { baseUrl } from "../shared/baseUrl";

const Step3 = props => {
    /* Since the heuristic attributes will be sent to the server and database at the end of this process, the entries in each step should be passed over to the next step.
    useStateMachine serves to save and pass the entries in this step over to the next step.
    */
    const { actions, state } = useStateMachine({ updateAction });

    /** Attributes of a heuristic contains following described variables. Those will be merged afterwards to define the title of the new heuristic. Guideline variable has the following four properties and
     * those properties will be defined by the user in the app
     */
    const [property, setProperty] = useState({
        orderCategory: 'Product Characteristic',
        orderCategorySpecification: 'default',
        step3SystemLevel: 'default',
        step3AdressedLifeCyclePhase: 'default'
    });

    /** Function for passing the entries over to the next step */
    const { handleSubmit, register, errors } = useForm({
        defaultValues: state.heuristicDetails
    });

    /** Since the following properties must be defined, following reference points are created in order to guide user to that specific point when the following properties are not given.  */
    const step3SystemLevelCheck= React.useRef();
    const orderCategorySpecificationCheck= React.useRef();
    const step3AdressedLifeCyclePhaseCheck= React.useRef();
    
    /** Function for redirecting the user to the next step. */
    const { push } = useHistory();

    /** Function that checks if following properties are given or not. If not, than the error message will be visible that tells the user that they should give some information about the property to continue.
     * If all is set, then push command will redirect the user to the next step.
     */
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

    /** Function that changes the guideline variable and so the properties according to entries that the user has given */
    const handleOnChange = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setProperty({...property, [name]: value})
    }

    /** Since the second dropdown menu will look different depending on the choice in the first dropdown menu,
     *  the following if else clauses define the second dropdown menu according to the choice that is made in the first one. 
     *  Also some choices that can be made in the second dropdown menu could lead the user to choose a property in a third dropdown menu.
     *  Because of that, second and third ones will be visible depending on the choices in the first/ second dropdown menu.*/
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
                    <option>product</option>
                    <option>assembly</option>
                    <option>part</option>
                </Input>
                <Label className='align-items-center'> <h6 className="requiredStyle" ref={step3SystemLevelCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>
            </Col>
        if (property.step3SystemLevel=== 'product'){
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
        } else if (property.step3SystemLevel=== 'assembly'){
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
        } else if (property.step3SystemLevel=== 'part'){
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
                    <option>efficiency</option>
                    <option>noise Level</option>
                    <option>complexity</option>
                    <option>internal Variety</option>
                    <option>robustness</option>
                    <option>temperature</option>
                    <option>friction</option>
                    <option>volume</option>
                    <option>weight</option>
                    <option>losses</option>
                    <option>others</option>
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
                    <option>minimum risk</option>
                    <option>cost</option>
                    <option>standards</option>
                    <option>assembly</option>
                    <option>inspection</option>
                    <option>logistics</option>
                    <option>low quantity production</option>
                    <option>supply chain</option>
                    <option>modularity</option>
                    <option>user friendliness</option>
                    <option>aesthetics</option>
                    <option>serviceability</option>
                    <option>maintainability</option>
                    <option>repair</option>
                    <option>reuse</option>
                    <option>recyclability</option>
                    <option>disassembly</option>
                    <option>remanufacturing</option>
                    <option>sustainability</option>
                    <option>manufacturability</option>
                    <option>ergonomics</option>
                    <option>ease of design changes</option>
                    <option>amount of produced goods</option>
                    <option>economies of scale</option>
                    <option>economies of scope</option>
                    <option>product usage intensity</option>
                    <option>product lifetime</option>
                    <option>wear</option>
                    <option>customer value</option>
                    <option>other</option>
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
                    <option>mineral and fossil use</option>
                    <option>general material use</option>
                    <option>energy use</option>
                    <option>water use</option>
                    <option>land use</option>
                    <option>costs</option>
                    <option>landfill/Waste</option>
                    <option>impact on climate change through emissions</option>
                    <option>impact on euthrophication</option>
                    <option>impact on acidification</option>
                    <option>impact on POCP</option>
                    <option>impact on ozone depletion</option>
                    <option>particulate matter</option>
                    <option>impact on ecotoxicity</option>
                    <option>impact on human toxicity</option>
                    <option>other</option>
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
                        <option>design</option>
                        <option>raw material acquisition</option>
                        <option>production</option>
                        <option>assembly</option>
                        <option>distribution</option>
                        <option>usage</option>
                        <option>after use</option>
                    </Input>
                </Col>
                <Label className='align-items-center'> <h6 className="requiredStyle" ref={step3AdressedLifeCyclePhaseCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>
            </Col>

    }

    /** HTML part */
    return (
        <div>
            <Header auth={props.auth}
                logoutUser={props.logoutUser}/>
            <div className='container'>
                <div className='row row-content'>
                    {/** Again, the guideline that refers to the title of the heuristic and the choices from the step 2. */}
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
                    {/** When the form is submitted (clicked on the button "next step"), the entries will be saved and passed over to the next step */}
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
                            {/** As the second dropdown menu is already defined above, here it will be seen differently depending on the choice in the first one. 
                             * Also the presence of the third one depends on the choice in the second one*/}
                            <Col md={8}>
                                <Label htmlFor="orderCategorySpecification" ><h4>2. Order Category Specification</h4></Label>
                                {secondDropdown}
                                {thirdDropdown}
                            </Col>
                        </FormGroup>
                        <Row className='col-md' style={{alignItems:'center', marginTop:'50px'}}>
                            {/** Button to go to the previous step */}
                            <Col md={4} className='col-md offset-2'>
                                <Link className='text-decoration-none card-block' style={{color:"black"}} to="/step2">
                                    <Card style={{width:"auto", float: "left", borderRadius:"10px"}}>
                                        <h5 style={{padding:"2px 20px 2px"}}><strong>Previous</strong></h5>
                                    </Card>
                                </Link>
                            </Col>
                            {/** Button to submit and go to the next step */}
                            <Col md={4}>
                                <Button type='submit' style={{width:"auto", float: "left", borderRadius:"10px"}} className="btn-md" color='light'><h3 style={{padding:"2px 20px 2px"}}><strong>Next Step</strong></h3></Button>
                            </Col>
                        </Row>
                        <Row className='col-md offset-4' style={{marginBottom:"40px", marginTop:"20px"}}>
                            <Col>
                                Step <strong>3</strong> of 5
                            </Col>
                        </Row>
                    </form>

                    {/** Info part */}
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
                                                        <Row className="col-12 d-flex" style={{justifyContent:'start'}}>
                                                            <Card style={{marginRight:'20px', marginLeft:'10px'}} className='informationCardInside'>Different DfX (Design for X) Goals</Card>
                                                            <Card style={{marginRight:'30px'}} className='informationCardInside'>Ease of Design Changes</Card>
                                                            <Card style={{marginRight:'22px'}} className='informationCardInside'>Amount of Produced Goods</Card>
                                                            <Card className='informationCardInside'>Economies of Scale</Card>
                                                            <Card style={{marginRight:'20px', marginLeft:'10px'}} className='informationCardInside'>Economies of Scope</Card>
                                                            <Card style={{marginRight:'30px'}} className='informationCardInside'>Product Usage Intensity</Card>
                                                            <Card style={{marginRight:'22px'}} className='informationCardInside'>Product Lifetime</Card>
                                                            <Card className='informationCardInside'>Wear</Card>
                                                            <Card style={{marginRight:'20px', marginLeft:'10px'}} className='informationCardInside'>Customer Value</Card>
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
                                                        <Row className="col-12 d-flex" style={{justifyContent:'start'}}>
                                                            <Card style={{marginRight:'20px', marginLeft:'10px'}} className='informationCardInside'>Design</Card>
                                                            <Card style={{marginRight:'30px'}} className='informationCardInside'>Raw Material Acquisition</Card>
                                                            <Card style={{marginRight:'22px'}} className='informationCardInside'>Production</Card>
                                                            <Card className='informationCardInside'>Assembly</Card>
                                                            <Card style={{marginRight:'20px', marginLeft:'10px'}} className='informationCardInside'>Distribution</Card>
                                                            <Card style={{marginRight:'30px'}} className='informationCardInside'>Usage</Card>
                                                            <Card style={{marginRight:'30px'}} className='informationCardInside'>After Use</Card>
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
                                                        <Row className="col-12 d-flex" style={{justifyContent:'start'}}>
                                                            <Card style={{marginRight:'20px', marginLeft:'10px'}} className='informationCardInside'>Part Identification and Classification</Card>
                                                            <Card style={{marginRight:'30px'}} className='informationCardInside'>Part Position and Orientation</Card>
                                                            <Card style={{marginRight:'22px'}} className='informationCardInside'>Surface Characteristics</Card>
                                                            <Card className='informationCardInside'>Geometry</Card>
                                                            <Card style={{marginRight:'20px', marginLeft:'10px'}} className='informationCardInside'>Material Characteristics</Card>
                                                            <Card style={{marginRight:'30px'}} className='informationCardInside'>Number</Card>
                                                            <Card style={{marginRight:'30px'}} className='informationCardInside'>Others</Card>
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