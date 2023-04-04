import React, { useState }  from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { Control, LocalForm, Errors, actions} from 'react-redux-form';
import { Row, Col, Card, FormGroup, Label, Input, CardBody, CardText, Button, CardImg } from "reactstrap";
import updateAction from "./updateAction";
import Header from "./HeaderComponent";
import { baseUrl } from "../shared/baseUrl";

const Step4 = props => {
    const { actions, state } = useStateMachine({ updateAction });
    const [property, setProperty] = useState([{
        effectCategory: 'Technical Property',
        effectCategorySpecification: 'default',
        step4AdressedLifeCyclePhase: 'default'
    }]);

    const [effects, setEffects] = useState({
        step4Effects: []
    });
    const { handleSubmit, register, errors } = useForm({
        defaultValues: state.heuristicDetails
    });

    const effectCategorySpecificationCheck= React.useRef();
    const step4AdressedLifeCyclePhaseCheck= React.useRef();

    const { push } = useHistory();
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

    let handleOnChange = (i,e) => {
        var newPropertyValues = [...property];
        newPropertyValues[i][e.target.name] = e.target.value;
        setProperty(newPropertyValues);
        setEffects({...effects, step4Effects: property})
    }

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
    let removeFormFields = (i) => {
        let newPropertyValues = [...property];
        newPropertyValues.splice(i, 1);
        setProperty(newPropertyValues)
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
                                    {(element.effectCategory=== "Technical Property") ?
                                    <Col md={4}>
                                    <Input type="select" name="effectCategorySpecification"
                                            onChange={e=>handleOnChange(index, e)}
                                            defaultValue={element.effectCategorySpecification}>
                                        <option value="default" disabled hidden>
                                            Select Effect Category Specification
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
                                    <Label className='align-items-center'> <h6 className="requiredStyle" ref={effectCategorySpecificationCheck} style={{display:"none"}}> You may have missed some information to share! </h6></Label>
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
                                                                <option>Design</option>
                                                                <option>Raw material acquisition</option>
                                                                <option>Production</option>
                                                                <option>Assembly</option>
                                                                <option>Distribution</option>
                                                                <option>Usage</option>
                                                                <option>After use</option>
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
                        <Row>
                            <Col md={2}>
                                <Button className="fa fa-plus" type="button" onClick={() => addFormFields()}></Button>
                            </Col>

                        </Row>
                        <Row className='col-md' style={{alignItems:'center', marginTop:'50px'}}>
                            <Col md={4} className='col-md offset-2'>
                                <Link className='text-decoration-none card-block' style={{color:"black"}} to="/step3">
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
                                Step <strong>4</strong> of 5
                            </Col>
                        </Row>

                    </form>
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