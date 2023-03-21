import React, { useState }  from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { Control, LocalForm, Errors, actions} from 'react-redux-form';
import { Row, Col, Card, FormGroup, Label, Input, CardBody, CardText, Button } from "reactstrap";
import updateAction from "./updateAction";
import Header from "./HeaderComponent";
import {baseUrl} from '../shared/baseUrl';
import axios from 'axios';


const Step5 = props => {
    const { actions, state } = useStateMachine({ updateAction });
    const [property, setProperty] = useState([{
        effectCategory: 'Technical Property',
        effectCategorySpecification: 'default',
        step5AdressedLifeCyclePhase: 'default'
    }]);
    const [effects, setEffects] = useState({
        negativeEffects: []
    });

    const [file, setFile] = useState({
        selectedFile: null,
        selectedFile2: null,
        selectedFile3: null
    })

    const [industry, setIndustry] = useState([]);

    const [extraInfo, setExtraInfo] = useState('');

    const [source, setSource] = useState('');

    const { handleSubmit, register, errors } = useForm({
        defaultValues: state.heuristicDetails
    });
    const { push } = useHistory();
    const onSubmit = data => {
        actions.updateAction(effects.negativeEffects);
        push('/step5')
    };
  
    let handleOnChange = (i,e) => {
        let newPropertyValues = [...property];
        newPropertyValues[i][e.target.name] = e.target.value;
        setProperty(newPropertyValues);
        setEffects({...effects, negativeEffects: property})
    }

    let addFormFields = () => {
        setProperty([...property, { 
            effectCategory: 'Technical Property',
            effectCategorySpecification: 'default',
            step5AdressedLifeCyclePhase: 'default' }
        ])
    }
    let removeFormFields = (i) => {
        let newPropertyValues = [...property];
        newPropertyValues.splice(i, 1);
        setProperty(newPropertyValues)
    }

    let handleCheckChange = e =>{
        var value = e.target.id.slice(4)
        if (e.target.checked){
            setIndustry([...industry, value])
        }
        var array= [...industry]
        var index = industry.indexOf(value)
        if (index !== -1) {
            array.splice(index, 1);
            setIndustry(array);
        }
    }

    let handleExtraInfoChange = e =>{
        var value = e.target.value
        setExtraInfo(value)
    }
    let handleSourceChange = e =>{
        var value = e.target.value
        setSource(value)
    }


    // ************** FILE UPLOAD **************
    let handleFileUpload = e => {
        const { name, value } = e.target;
    
        setFile({
          [name]: value
        });
    };


    let onFileChange= event => {
    var uploadFile= {...file};
    uploadFile.selectedFile= event.target.files[0];
    setFile({...file, selectedFile: event.target.files[0]});
    }

    let onFileChange2= event => {
    var uploadFile= {...file};
    uploadFile.selectedFile2= event.target.files[0];
    setFile({uploadFile});
    }

    let onFileChange3= event => {
    var uploadFile= {...file};
    uploadFile.selectedFile3= event.target.files[0];
    setFile({uploadFile});
    }

    let onFileUpload = () => {
        const url = `${baseUrl}imageUpload`;

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        var requestArray= []
        console.log("files: ", file)
        for ( const[key, value] of Object.entries(file)){

            if (key!== null){
                var formData = new FormData();
                formData.append(
                    "imageFile",
                    value,
                    value.name
                //this.state.flexRadioDefault + ".jpg"
                );
                const request = axios.post(url, formData, config);
                requestArray.push(request)
            }
        }
        axios.all(requestArray).then((...responses) => {
            console.log(responses[0])
            console.log(responses[1]) 
        }).catch(errors => {
        })
    };



    return (
        <div>
            {console.log("systemlevel: ", source)}
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
                                <h2>Step 5</h2>
                            </Col>
                            <Col md={5}>
                                <h4>Additional Information (optional)</h4>
                            </Col>

                        </Row>
                        <Col md={9} style={{marginBottom:"40px"}}>
                            <h7> You nearly made it! In our research we found out that majority of professional designers as well as students are
                                more likely to understand and use a design advice, when some additional information is given.
                                {<br/>}{<br/>}
                                We hope you find the time to add some of the following information aspects. You can also just add the single ones and upload them.
                                {<br/>}{<br/>}
                                Nonetheless, please make sure to click on <strong>hand in</strong> at the end of the page.
                                {<br/>}{<br/>}
                                In case you want to refresh your memory regarding the different possible effects, scroll down to the info box!
                            </h7>
                        </Col>
                        <Row className='form-group align-items-center' style={{marginBottom:"40px"}}>
                            <Col md={3}>
                                <h4>Negative Effects</h4>
                            </Col>
                            <Col md={7}>
                                <h7>Are there any possible trade offs? You can choose more than one but also none.
                                    <br/>
                                    Please contact us if you cannot find the effect you are looking for!
                                </h7>
                            </Col>

                        </Row>
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
                                                <Label htmlFor="step5AdressedLifeCyclePhase" ></Label>
                                                <Col md={6}>
                                                    <Row>
                                                        <h5>During</h5>
                                                    </Row>
                                                    <Input type="select" name="step5AdressedLifeCyclePhase"
                                                            defaultValue={element.step5AdressedLifeCyclePhase}
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
                        <Row className='form-group' style={{marginBottom:"60px"}}>
                                <Col md={3}>
                                    <h4>In which industry can your heuristic be used?</h4>
                                </Col>
                                <Col md={9}>
                                    <h7>Please define the industry! You can choose more than one. If you do not chose the industry, we assume that it works in every industry.</h7>
                                </Col>
                                <Row className="col-12 d-flex justify-content-between" onChange={e=> handleCheckChange(e)} md={3} style={{marginTop:"20px"}}>
                                    
                                    <input type="checkbox" class="btn-check" id="ind_all" autocomplete="off"/>
                                    <label class="btn btn-outline-secondary" style={{color: 'black'}} for="ind_all">all</label>                                    

                                    <input type="checkbox" class="btn-check" id="ind_metal production and processing" autocomplete="off"/>
                                    <label class="btn btn-outline-secondary" style={{color: 'black'}} for="ind_metal production and processing">metal production and processing</label>

                                    <input type="checkbox" class="btn-check" id="ind_manufacture of metal products" autocomplete="off"/>
                                    <label class="btn btn-outline-secondary" style={{color: 'black'}} for="ind_manufacture of metal products">manufacture of metal products</label>
                                    
                                    <input type="checkbox" class="btn-check" id="ind_production of data processing equipment" autocomplete="off"/>
                                    <label class="btn btn-outline-secondary" style={{color: 'black'}} for="ind_production of data processing equipment">production of data processing equipment</label>
                                    
                                    <input type="checkbox" class="btn-check" id="ind_production of electrical equipment" autocomplete="off"/>
                                    <label class="btn btn-outline-secondary" style={{color: 'black'}} for="ind_production of electrical equipment">production of electrical equipment</label>
                                    
                                    <input type="checkbox" class="btn-check" id="ind electric motors" autocomplete="off"/>
                                    <label class="btn btn-outline-secondary" style={{color: 'black'}} for="ind electric motors">electric motors</label>
                                    
                                    <input type="checkbox" class="btn-check" id="ind_mechanical engineering" autocomplete="off"/>
                                    <label class="btn btn-outline-secondary" style={{color: 'black'}} for="ind_mechanical engineering">mechanical engineering</label>

                                    {/* <Control.checkbox model=".ind_vehicle construction" name="vehicle construction" id="vehicle construction"
                                            className= "btn-check"/>
                                     <Label className="btn btn-outline-light" style={{color: 'black'}} for="vehicle construction">vehicle construction</Label>

                                    <Control.checkbox model=".ind_ship and boat building" name="ship and boat building" id="ship and boat building"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="ship and boat building">ship and boat building</Label>

                                    <Control.checkbox model=".ind_rail vehicles" name="rail vehicles" id="rail vehicles"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="rail vehicles">rail vehicles</Label>

                                    <Control.checkbox model=".ind_clothing" name="clothing" id="clothing"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="clothing">clothing</Label>

                                    <Control.checkbox model=".ind_aircraft" name="aircraft" id="aircraft"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="aircraft">aircraft</Label>

                                    <Control.checkbox model=".ind_furniture" name="furniture" id="furniture"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="furniture">furniture</Label>
                                    
                                    <Control.checkbox model=".ind_household" name="household" id="household"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="household">household</Label>

                                    <Control.checkbox model=".ind_automotive" name="automotive" id="automotive"
                                            className= "btn-check"/>
                                    <Label className="btn btn-outline-light" style={{color: 'black'}} for="automotive">automotive</Label> */}
                                </Row>
                                <Row className='form-group' style={{marginBottom:"20px"}}>
                                <Col md={3}>
                                    <h4>Do you want to add pictures?</h4>
                                </Col>
                                <Col md={9}>
                                    <h7>Here you can optionally add pictures to describe your heuristic. This can be a draft or photo. 
                                        It proved to be helpful to use positive and negative examples, but you can use others too.</h7>
                                </Col>
                                <Row className='form-group' style={{marginBottom:"20px"}} >
                                    <Col md={2} style={{marginTop:'70px'}}>
                                        <Input type="file" onChange={onFileChange} />
                                    </Col>
                                    <Col md={4}>
                                        <Col >
                                            <h7> What kind of example is this?</h7>
                                        </Col>
                                        <Col className='d-flex justify-content-between' style={{marginBottom: '20px'}}>
                                            <span>positive</span>
                                            <span>negative</span>
                                            <span>different</span>
                                        </Col>
                                        <Col className='d-flex justify-content-between'  onChange={handleFileUpload} >
                                            <Control.radio model=".positive1" name="flexRadioDefault" style={{ marginLeft: '.5rem' }} id="positive1"
                                                className= "btn-check" value="positive"/>
                                            <Label className="btn btn-outline-success" for="positive1">&nbsp; &nbsp;</Label>
                                            <Control.radio model=".negative1" name="flexRadioDefault" id="negative1"
                                                className= "btn-check" value="negative"/>
                                            <Label className="btn btn-outline-danger" for="negative1">&nbsp; &nbsp;</Label>
                                            <Control.radio model=".different1" name="flexRadioDefault" id="different1"
                                                className= "btn-check" value="different"/>
                                            <Label className="btn btn-outline-secondary" for="different1">&nbsp; &nbsp;</Label>                                            
                                        </Col>
                                    
                                    </Col>
                                    <Col md={4} >
                                        <Col>
                                            <h7> Add a copyright </h7>
                                            <span> (optional)</span> 
                                        </Col>  
                                        <Control.text model='.copyright' id="copyright1" style={{marginTop:'45px'}} name="copyright"  
                                            className= "form-control"/>
                                    </Col>
                                    <Col md={2} style={{marginTop:'70px'}}>
                                        
                                        <Button onClick={onFileUpload}> 
                                            Upload! 
                                        </Button>
                                    </Col>
                                </Row>
                                <Row style={{marginBottom:"20px"}}>
                                    <Col md={2} >
                                        <Input type="file" onChange={onFileChange2} />
                                    </Col>
                                    <Col md={4}>
                                        <Col className='d-flex justify-content-between' onChange={handleFileUpload} >
                                            <Control.radio model=".positive2" name="flexRadioDefault2" id="positive2"
                                                className= "btn-check" value="positive"/>
                                            <Label className="btn btn-outline-success" for="positive2">&nbsp; &nbsp;</Label>
                                            <Control.radio model=".negative2" name="flexRadioDefault2" id="negative2"
                                                className= "btn-check" value="negative"/>
                                            <Label className="btn btn-outline-danger" for="negative2">&nbsp; &nbsp;</Label>
                                            <Control.radio model=".different2" name="flexRadioDefault2" id="different2"
                                                className= "btn-check" value="different"/>
                                            <Label className="btn btn-outline-secondary" for="different2">&nbsp; &nbsp;</Label>                                            
                                            
                                        </Col>
                                    
                                    </Col>
                                    <Col md={4} > 
                                        <Control.text model='.copyright' id="copyright2" name="copyright"  
                                            className= "form-control"/>
                                    </Col>
                                    <Col md={2} >
                                        
                                        <Button onClick={onFileUpload}> 
                                            Upload! 
                                        </Button>
                                    </Col>
                                </Row>
                                <Row style={{marginBottom:"20px"}}>
                                    <Col md={2} >
                                        <Input type="file" onChange={onFileChange3} />
                                    </Col>
                                    <Col md={4}>
                                        <Col className='d-flex justify-content-between' onChange={handleFileUpload} >
                                            <Control.radio model=".positive3" name="flexRadioDefault3" id="positive3"
                                                className= "btn-check" value="positive"/>
                                            <Label className="btn btn-outline-success" for="positive3">&nbsp; &nbsp;</Label>
                                            <Control.radio model=".negative3" name="flexRadioDefault3" id="negative3"
                                                className= "btn-check" value="negative"/>
                                            <Label className="btn btn-outline-danger" for="negative3">&nbsp; &nbsp;</Label>
                                            <Control.radio model=".different3" name="flexRadioDefault3" id="different3"
                                                className= "btn-check" value="different"/>
                                            <Label className="btn btn-outline-secondary" for="different3">&nbsp; &nbsp;</Label>                                            
                                            
                                        </Col>
                                    
                                    </Col>
                                    <Col md={4} > 
                                        <Control.text model='.copyright' id="copyright3" name="copyright"  
                                            className= "form-control"/>
                                    </Col>
                                    <Col md={2} >
                                        
                                        <Button onClick={onFileUpload}> 
                                            Upload! 
                                        </Button>
                                    </Col>
                                </Row>
                            </Row>
                            <Row className='form-group' style={{marginBottom:"20px"}}>
                                <Col md={3}>
                                    <h4>Some more words?</h4>
                                </Col>
                                <Col md={9}>
                                    <h7>Here you can optionally describe the heuristic closer. Tell us, in which cases this heuristic helped you or give other designers helpful advices on how to use it!</h7>
                                </Col>
                                <Col style={{marginTop:'30px'}} onChange={e=> handleExtraInfoChange(e)}>
                                    <textarea id="extraInfo" style={{height:'200px'}} name="extraInfo"  
                                        className= "form-control" rows={5}></textarea>
                                </Col>
                            </Row>
                            <Row className='form-group' style={{marginBottom:"20px"}} onChange={e=> handleSourceChange(e)}>
                                <Col md={5}>
                                    <h4>Where did you find the heuristic?</h4>
                                </Col>
                                <Col md={7}>
                                    <p>Adding the source of your heuristic makes your heuristic more trustworthy. </p>
                                </Col>
                                <Col >
                                    <textarea id="source" name="source"  
                                        className= "form-control"></textarea>
                                </Col>
                            </Row>
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

export default Step5;