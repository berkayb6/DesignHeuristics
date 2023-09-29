import React, { useState }  from "react";
import { useForm} from "react-hook-form";
import { useHistory, Link} from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { Row, Col, Card, FormGroup, Label, Input, CardBody, Button, CardImg } from "reactstrap";
import updateAction from "./updateAction";
import Header from "./HeaderComponent";
import { baseUrl } from "../shared/baseUrl";

const Step4 = props => {

    /* Since the heuristic attributes will be sent to the server and database at the end of this process, the entries in each step should be passed over to the next step.
    useStateMachine serves to save and pass the entries in this step over to the next step.
    */
    const { actions, state } = useStateMachine({ updateAction });

    /** Attributes of a heuristic contains following described variables. Those will be merged afterwards to define the title of the new heuristic. Guideline variable has the following four properties and
     * those properties will be defined by the user in the app
     */
    const [property, setProperty] = useState([{
        effectCategory: 'Technical Property',
        effectCategorySpecification: 'default',
        step4AdressedLifeCyclePhase: 'default'
    }]);

    /** Since the user could add more than one effect in this step, effects contain the step4effects array to save the entries from the user. 
     * The name of the array helps to avoid confusion with the negative effects that will be added in the fifth step. */
    const [effects, setEffects] = useState({
        step4Effects: []
    });

    /** Function for passing the entries over to the next step */
    const { handleSubmit, register, errors } = useForm({
        defaultValues: state.heuristicDetails
    });

    /** Since the following properties must be defined, following reference points are created in order to guide user to that specific point when the following properties are not given.  */
    const effectCategorySpecificationCheck= React.useRef();
    const step4AdressedLifeCyclePhaseCheck= React.useRef();

    /** Function for redirecting the user to the next step. */
    const { push } = useHistory();

    /** Function that checks if following properties are given or not. If not, than the error message will be visible that tells the user that they should give some information about the property to continue.
     * If all is set, then push command will redirect the user to the next step.
     */
    const onSubmit = data => {
        if (property[property.length-1].effectCategory==='Life Cycle Property'){
            if (property[property.length-1].effectCategorySpecification==='default'){
                effectCategorySpecificationCheck.current.style={display:"visible"};
                return
            }
            if (property[property.length-1].step4AdressedLifeCyclePhase==='default'){
                step4AdressedLifeCyclePhaseCheck.current.style={display:"visible"};
                return;
            }
            var newPropertyValues = [...property];
            newPropertyValues[newPropertyValues.length-1].effectCategorySpecification= newPropertyValues[newPropertyValues.length-1].effectCategorySpecification + " during " + newPropertyValues[newPropertyValues.length-1].step4AdressedLifeCyclePhase.toLowerCase();
            setProperty(newPropertyValues);
        }
        else
            if (property[property.length-1].effectCategorySpecification==='default'){
                effectCategorySpecificationCheck.current.style={display:"visible"};
                return
            }
        actions.updateAction(effects);
        push('/step5')
    };

    /** Function that changes the guideline variable and so the properties according to entries that the user has given */
    let handleOnChange = (i,e) => {
        var newPropertyValues = [...property];
        newPropertyValues[i][e.target.name] = e.target.value;
        setProperty(newPropertyValues);
        setEffects({...effects, step4Effects: property})
    }

    /** If the user would want to add more effects, the following function adds more dropdown menu. However the user is not able to add more field, if they did not choose any property in the first field. */
    let addFormFields = () => {
        if (property[property.length-1].effectCategory==='Life Cycle Property'){

            if (property[property.length-1].effectCategorySpecification==='default'){
                effectCategorySpecificationCheck.current.style={display:"visible"};
                return
            }
            if (property[property.length-1].step4AdressedLifeCyclePhase==='default'){
                step4AdressedLifeCyclePhaseCheck.current.style={display:"visible"};
                return;
            }
            var newPropertyValues = [...property];
            newPropertyValues[newPropertyValues.length-1].effectCategorySpecification= newPropertyValues[newPropertyValues.length-1].effectCategorySpecification + " during " + newPropertyValues[newPropertyValues.length-1].step4AdressedLifeCyclePhase.toLowerCase();
            setProperty(newPropertyValues);
        }
        else
            if (property[property.length-1].effectCategorySpecification==='default'){
                effectCategorySpecificationCheck.current.style={display:"visible"};
                return
            }
        setProperty([...property, {
            effectCategory: 'Technical Property',
            effectCategorySpecification: 'default',
            step4AdressedLifeCyclePhase: 'default' }
        ])
    }

    /** If the user would want to remove the last effect, the following function removes the last dropdown menu. */
    let removeFormFields = (i) => {
        let newPropertyValues = [...property];
        newPropertyValues.splice(i, 1);
        setProperty(newPropertyValues)
    }

    /** HTML part */
    return (
        <div>
            <Header auth={props.auth}
                logoutUser={props.logoutUser}/>
            <div className='container'>
                <div className='row row-content'>
                    {/** Again, the guideline that refers to the title of the heuristic */}
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

                    {/** When the form is submitted (clicked on the button "next step"), the entries will be saved and passed over to the next step */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Row className='form-group align-items-center' style={{marginBottom:"40px"}}>
                            <Col md={2}>
                                <h2>Step 4</h2>
                            </Col>
                            <Col md={5}>
                                <h4>Name the Effects of Your Guideline</h4>
                            </Col>

                        </Row>
                        <Col md={9} style={{marginBottom:"40px"}}>
                            <h7> Please name the effects of your guideline. Please keep in mind that your guideline could have more than just one effect.
                                This is why here <strong>you can add multiple effects</strong> to your guideline. You can chosse between effects regarding
                                technical properties, properties regarding the wole lifecycle, or specific life cycle phases.
                                {<br/>}
                                In case you want to refresh your memory regarding the different possible effects, scroll down to the info box!
                            </h7>
                        </Col>

                        {/** Properties will take place here. Following code contains if/else clause in a form that react supports that is->  (condition)?, if true, then the following is the result
                         * The code after : means that if the condition is false, then the following code will be run. For example:
                         */}
                        {property.map((element,index) => (

                            <FormGroup row key={index}>
                                <Col md={4}>
                                    <Label htmlFor="effectCategory" ><h4>1. Categorization of the effect</h4></Label>
                                    <Col md={6}>
                                        <Input type="select" name="effectCategory"
                                            defaultValue={element.effectCategory}
                                            onChange={e=>handleOnChange(index, e)}>
                                            <option value="default" disabled hidden>
                                                Select Order Category
                                            </option>
                                            <option>Technical Property</option>
                                            <option>Life Cycle Phase Property</option>
                                            <option>Life Cycle Property</option>
                                        </Input>
                                    </Col>
                                </Col>
                                <Col md={8}>
                                    <Label htmlFor="effectCategorySpecification" ><h4>2. Effect Category Specification</h4></Label>
                                    {/** The line 176 is the condition */}
                                    {/** If the condition is true, then the following code (Line 177-198) will be run. */}
                                    {(element.effectCategory=== "Technical Property") ?
                                    <Col md={4}>
                                    <Input type="select" name="effectCategorySpecification"
                                            onChange={e=>handleOnChange(index, e)}
                                            defaultValue={element.effectCategorySpecification}>
                                        <option value="default" disabled hidden>
                                            Select Effect Category Specification
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
                                    <Label className='align-items-center'> <h6 className="requiredStyle" ref={effectCategorySpecificationCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>
                                    {/** If the condition is false, the code after : will be run. However, there is more than one condition. Hence, there will be different if else clauses in a react form */}
                                </Col> : 
                                <>
                                    {(element.effectCategory=== 'Life Cycle Phase Property') ?
                                        <Col md={4}>
                                        <Input type="select" name="effectCategorySpecification"
                                                onChange={e=>handleOnChange(index, e)}
                                                defaultValue={element.effectCategorySpecification}>
                                            <option value="default" disabled hidden>
                                                Select Effect Category Specification
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
                                        <Label className='align-items-center'> <h6 className="requiredStyle" ref={effectCategorySpecificationCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>
                                        </Col> :
                                        <>
                                            {(element.effectCategory=== 'Life Cycle Property') ?
                                                <>
                                                    <Col md={4}>

                                                        <Input type="select" name="effectCategorySpecification"
                                                                onChange={e=>handleOnChange(index, e)}
                                                                defaultValue={element.effectCategorySpecification}>
                                                            <option value="default" disabled hidden>
                                                                Select Effect Category Specification
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
                                                        <Label className='align-items-center'> <h6 className="requiredStyle" ref={effectCategorySpecificationCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>
                                                    </Col>
                                                    <Col md={8}>
                                                        <Label htmlFor="step4AdressedLifeCyclePhase" ></Label>
                                                        <Col md={6}>
                                                            <Row>
                                                                <h5>During</h5>
                                                            </Row>
                                                            <Input type="select" name="step4AdressedLifeCyclePhase"
                                                                    defaultValue={element.step4AdressedLifeCyclePhase}
                                                                    onChange={e=>handleOnChange(index, e)}>
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
                                                        <Label className='align-items-center'> <h6 className="requiredStyle" ref={step4AdressedLifeCyclePhaseCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>
                                                    </Col>
                                                </>:
                                                null

                                            }
                                    </>
                                    }
                                </>
                                }
                                </Col>
                                {/** Following condition represents the condition, if the user has already added a new field. If so, then the minus button will be showed to give the user the opportunity to remove the last field. */}
                                {
                                    index ?
                                    <Row style={{marginTop:'20px'}}>
                                        <Col md={2}>
                                            <Button type="button" className="fa fa-minus" onClick={() => removeFormFields(index)}></Button>
                                        </Col>
                                    </Row>
                                    : null
                                }
                            </FormGroup>
                        ))}

                        {/** Button to add more fields*/}
                        <Row>
                            <Col md={2}>
                                <Button className="fa fa-plus" type="button" onClick={() => addFormFields()}></Button>
                            </Col>

                        </Row>

                        {/** Button to go to the previous step */}
                        <Row className='col-md' style={{alignItems:'center', marginTop:'50px'}}>
                            <Col md={4} className='col-md offset-2'>
                                <Link className='text-decoration-none card-block' style={{color:"black"}} to="/step3">
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
                                Step <strong>4</strong> of 5
                            </Col>
                        </Row>
                    </form>

                    {/** Info part */}
                    <Col className='informationBackground'>
                        <Row >
                            <Row style={{position: 'relative'}}>
                                <Card style={{ backgroundColor:'#89CAF4'}}>
                                    <CardBody >
                                        Please help us in this step to categorize the effect of your advice.
                                        <br/><br/>
                                        This helps us not only with visualizing the knowledge assets on our website but also gives us the possibility to show others possible interrelational effects of your advice. Often guidelines have multiple effects on different dimensions of a product. 
                                        <br/><br/>
                                        When you think about our initial advice to locate valuable parts within the product to be easily reachable. The initial idea was to give the advice to increase the recyclability of the product. But it has more effects than that!
                                        <br/><br/>
                                        It also is beneficial regarding Design for Disassembly, mineral and fossil ressource use during raw material acquisition, water use during raw material acquisition, impact on clmate change through emissions during raw material acqusition, costs during raw material acqusition, energy use during raw material acqusition.
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
                                                            <Card style={{marginRight:'30px'}} className='informationCardInside'>Others</Card>
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
                                                            <Card style={{marginRight:'22px'}} className='informationCardInside'>After Use</Card>
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

export default Step4;