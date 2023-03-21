import React, { useState }  from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { Control, LocalForm, Errors, actions} from 'react-redux-form';
import { Row, Col, Card, FormGroup, Label, Input, CardBody, CardText, Button } from "reactstrap";
import updateAction from "./updateAction";
import Header from "./HeaderComponent";

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
    const { push } = useHistory();
    const onSubmit = data => {
        actions.updateAction(effects.step4Effects);
        push('/step5')
    };
  
    let handleOnChange = (i,e) => {
        let newPropertyValues = [...property];
        newPropertyValues[i][e.target.name] = e.target.value;
        setProperty(newPropertyValues);
        setEffects({...effects, step4Effects: property})
    }

    let addFormFields = () => {
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
            {console.log("systemlevel: ", property)}
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
                                        </Col> :
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
                                            </Col>
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
                        <Row className="align-items-center">
                            <Col md={6}>
                                <Link className='text-decoration-none card-block' style={{color:"black"}} to="/step3">
                                    <Card style={{width:"170px", float: "left",marginTop:"20px", borderRadius:"10px"}}>
                                        <h3 style={{padding:"2px 20px 2px"}}><strong>Previous</strong></h3>
                                    </Card>
                                        
                                </Link>
                            </Col>
                            <Col md={6}>
                                <input className='btn-lg  btn-outline-secondary btn-light' style={{color:"black"}} type="submit" />
                            </Col>
                        </Row>
                                
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Step4;