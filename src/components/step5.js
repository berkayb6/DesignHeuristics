import React, { useState }  from "react";
import { useForm} from "react-hook-form";
import { useHistory, Link} from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { Control} from 'react-redux-form';
import { Row, Col, Card, FormGroup, Label, Input, CardBody, Button, CardImg } from "reactstrap";
import updateAction from "./updateAction";
import Header from "./HeaderComponent";
import {baseUrl} from '../shared/baseUrl';
import axios from 'axios';


const Step5 = props => {

    /* Since the heuristic attributes will be sent to the server and database at the end of this process, the entries in each step should be passed over to the next step.
    useStateMachine serves to save and pass the entries in this step over to the next step. In this step, the entries from previous steps will be saved to new variables to submit them to the server.
    */
    const { actions, state } = useStateMachine({ updateAction });

    /** Attributes of a heuristic contains following described variables. Those will be merged afterwards to define the title of the new heuristic. Guideline variable has the following four properties and
     * those properties will be defined by the user in the app
     */
    const [property, setProperty] = useState([{
        effectCategory: 'Technical Property',
        effectCategorySpecification: 'default',
        step5AdressedLifeCyclePhase: 'default'
    }]);

     /** Since the user could add more than one effect in this step, effects contain the negativeEffects array to save the entries from the user. 
     * The name of the array helps to avoid confusion with the effects that are added in the fourth step. */
    const [effects, setEffects] = useState({
        negativeEffects: []
    });

    /** If the user wants to add some images for more information. */
    const [file, setFile] = useState({
        selectedFile: null,
        selectedFile2: null,
        selectedFile3: null
    })

    /** Properties that the user can define, if they want */
    const [imageTypes, setImageTypes] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [source, setSource] = useState('');

    /** Function for submitting all entries to the server */
    const { handleSubmit, register, errors } = useForm({
        defaultValues: state.heuristicDetails
    });

    /** Function for redirecting the user to you rock page. */
    const { push } = useHistory();

    /** Function that define new variables and their values according to all entries that are made by the user in each step. New variables will be transmitted to the function "postHeuristic" which is defined in ActionCreators.js. */
    const onSubmit = data => {
        if (property[property.length-1].effectCategory==='Life Cycle Property'){
            var newPropertyValues = [...property];
            newPropertyValues[newPropertyValues.length-1].effectCategorySpecification= newPropertyValues[newPropertyValues.length-1].effectCategorySpecification + " during " + newPropertyValues[newPropertyValues.length-1].step5AdressedLifeCyclePhase.toLowerCase();
            setProperty(newPropertyValues);
        }
        var rating= 4;
        var orderArtefact= state.heuristicDetails.orderVerb;
        var embodimentArtefact= state.heuristicDetails.artifact;
        var embodimentAtrribute= state.heuristicDetails.artifactRestriction;
        var orderAttribute= state.heuristicDetails.orderAdverb;
        var title= state.heuristicDetails.orderVerb + " " + state.heuristicDetails.artifact + " " + state.heuristicDetails.artifactRestriction + " " + state.heuristicDetails.orderAdverb;
        var adressedSystemLevel= state.heuristicDetails.adressedSystemLevel;
        var artefactCategorization= state.heuristicDetails.artefactCategorization;
        if (state.heuristicDetails.orderCategory=== "Life Cycle Property"){
            var orderCategory= state.heuristicDetails.orderCategory;
            var orderCategorySpecification= state.heuristicDetails.orderCategorySpecification + " during " + state.heuristicDetails.step3AdressedLifeCyclePhase;
        }
        else
            var orderCategory= state.heuristicDetails.orderCategory;
            var orderCategorySpecification= state.heuristicDetails.orderCategorySpecification
        var positiveEffects= state.heuristicDetails.step4Effects;
        var negativeEffects= effects.negativeEffects;
        var industry= industries;
        var description= extraInfo;
        var sources= source;
        var image= [];

        for ( const[key, value] of Object.entries(file)){
            console.log("value: ", value)
            if (value!== null){
                image.push(value.name)
            }
        }

        props.postHeuristic(
            title,
            orderArtefact,
            embodimentArtefact,
            embodimentAtrribute,
            orderAttribute,
            adressedSystemLevel, 
            artefactCategorization, 
            positiveEffects, 
            negativeEffects, 
            orderCategory, 
            orderCategorySpecification, 
            industry, 
            rating, 
            description, 
            image, 
            sources
        )

        onFileUpload();
        push('/you-rock')
    };

    /** Function that uploads the images to the server side */
    const onFileUpload = () => {
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

    /** Function that changes the guideline variable and so the properties according to entries that the user has given */
    let handleOnChange = (i,e) => {
        let newPropertyValues = [...property];
        newPropertyValues[i][e.target.name] = e.target.value;
        setProperty(newPropertyValues);
        setEffects({...effects, negativeEffects: property})
    }

    /** If the user would want to add more effects, the following function adds more dropdown menu. However the user is not able to add more field, if they did not choose any property in the first field. */
    let addFormFields = () => {
        setProperty([...property, { 
            effectCategory: 'Technical Property',
            effectCategorySpecification: 'default',
            step5AdressedLifeCyclePhase: 'default' }
        ])
    }

    /** If the user would want to remove the last effect, the following function removes the last dropdown menu. */
    let removeFormFields = (i) => {
        let newPropertyValues = [...property];
        newPropertyValues.splice(i, 1);
        setProperty(newPropertyValues)
    }

    /** To set the properties according to the user's choice, the following functions takes care the changes */
    let handleCheckChange = e =>{
        var value = e.target.id.slice(4)
        if (e.target.checked){
            setIndustries([...industries, value])
        }
        var array= [...industries]
        var index = industries.indexOf(value)
        if (index !== -1) {
            array.splice(index, 1);
            setIndustries(array);
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
    
        setImageTypes({
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

                    {/** When the form is submitted (clicked on the button "Hand in"), the entries will be saved and passed over to the server side */}
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
                                We hope you find the time to add some of the following information aspects.
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
                                    {/** The line 301 is the condition */}
                                    {/** If the condition is true, then the following code (Line 302-321) will be run. */}
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
                        <Row className='form-group' style={{marginBottom:"60px", marginTop: '60px'}}>
                            <Col>
                                <h4>In which industry can your heuristic be used?</h4>
                                <br/>
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
                                
                                <input type="checkbox" class="btn-check" id="ind_electric motors" autocomplete="off"/>
                                <label class="btn btn-outline-secondary" style={{color: 'black'}} for="ind_electric motors">electric motors</label>
                                
                                <input type="checkbox" class="btn-check" id="ind_mechanical engineering" autocomplete="off"/>
                                <label class="btn btn-outline-secondary" style={{color: 'black'}} for="ind_mechanical engineering">mechanical engineering</label>
                                
                                <input type="checkbox" class="btn-check" id="ind_vehicle construction" autocomplete="off"/>
                                <label class="btn btn-outline-secondary" style={{color: 'black'}} for="ind_vehicle construction">vehicle construction</label>
                                
                                <input type="checkbox" class="btn-check" id="ind_ship and boat building" autocomplete="off"/>
                                <label class="btn btn-outline-secondary" style={{color: 'black'}} for="ind_ship and boat building">ship and boat building</label>

                                <input type="checkbox" class="btn-check" id="ind_rail vehicles" autocomplete="off"/>
                                <label class="btn btn-outline-secondary" style={{color: 'black'}} for="ind_rail vehicles">rail vehicles</label>
                                
                                <input type="checkbox" class="btn-check" id="ind_clothing" autocomplete="off"/>
                                <label class="btn btn-outline-secondary" style={{color: 'black'}} for="ind_clothing">clothing</label>

                                <input type="checkbox" class="btn-check" id="ind_aircraft" autocomplete="off"/>
                                <label class="btn btn-outline-secondary" style={{color: 'black'}} for="ind_aircraft">aircraft</label>
                                
                                <input type="checkbox" class="btn-check" id="ind_furniture" autocomplete="off"/>
                                <label class="btn btn-outline-secondary" style={{color: 'black'}} for="ind_furniture">furniture</label>

                                <input type="checkbox" class="btn-check" id="ind_household" autocomplete="off"/>
                                <label class="btn btn-outline-secondary" style={{color: 'black'}} for="ind_household">household</label>
                                
                                <input type="checkbox" class="btn-check" id="ind_automotive" autocomplete="off"/>
                                <label class="btn btn-outline-secondary" style={{color: 'black'}} for="ind_automotive">automotive</label>
                            </Row>
                            <Row className='form-group' style={{marginBottom:"60px", marginTop: '60px'}}>
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
                        <Row className='col-md' style={{alignItems:'center', marginTop:'50px'}}>
                            <Col md={4} className='col-md offset-2'>
                                <Link className='text-decoration-none card-block' style={{color:"black"}} to="/step4">
                                    <Card style={{width:"auto", float: "left", borderRadius:"10px"}}>
                                        <h5 style={{padding:"2px 20px 2px"}}><strong>Previous</strong></h5>
                                    </Card>
                                </Link>
                            </Col>
                            <Col md={4}>
                                <Button type='submit' style={{width:"auto", float: "left", borderRadius:"10px"}} className="btn-md" color='light'><h3 style={{padding:"2px 20px 2px"}}><strong>Hand in</strong></h3></Button>
                            </Col>
                        </Row>
                        <Row className='col-md offset-4' style={{marginBottom:"40px", marginTop:"20px"}}>
                            <Col>
                                Step <strong>5</strong> of 5
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
                                                            <Card style={{marginRight:'30px'}} className='informationCardInside'>After Use</Card>
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

export default Step5;